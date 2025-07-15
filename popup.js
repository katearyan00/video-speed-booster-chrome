document.addEventListener('DOMContentLoaded', function() {
  const speedUpBtn = document.getElementById('speedUp');
  const normalSpeedBtn = document.getElementById('normalSpeed');
  const status = document.getElementById('status');

  function showStatus(message, isError = false) {
    status.textContent = message;
    status.style.color = isError ? '#ffccd5' : '#e0e7ff';
    setTimeout(() => {
      status.textContent = '';
    }, 2000);
  }

  function executeScript(playbackRate) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        function: setVideoSpeed,
        args: [playbackRate]
      }, function(results) {
        if (chrome.runtime.lastError) {
          showStatus('Error: ' + chrome.runtime.lastError.message, true);
          return;
        }
        
        if (results && results[0] && results[0].result) {
          const result = results[0].result;
          if (result.success) {
            showStatus(`Speed set to ${playbackRate}x`);
          } else {
            showStatus(result.message, true);
          }
        }
      });
    });
  }

  speedUpBtn.addEventListener('click', function() {
    executeScript(16);
  });

  normalSpeedBtn.addEventListener('click', function() {
    executeScript(1);
  });
});

// This function will be injected into the web page
function setVideoSpeed(playbackRate) {
  try {
    let video = document.querySelector('video');
    if (!video || isNaN(video.duration) || video.readyState === 0) {
      const videos = document.querySelectorAll('video');
      for (const v of videos) {
        if (!isNaN(v.duration) && v.readyState > 0) {
          video = v;
          break;
        }
      }
    }

    if (!video) {
      return {
        success: false,
        message: 'No usable video element found on this page'
      };
    }

    video.playbackRate = playbackRate;
    return {
      success: true,
      message: `Video speed set to ${playbackRate}x`
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error setting video speed: ' + error.message
    };
  }
}
