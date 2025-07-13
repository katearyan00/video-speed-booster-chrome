// Content script that runs on all pages
// This allows the extension to interact with page content

// Optional: Add keyboard shortcuts for quick access
document.addEventListener('keydown', function(event) {
  // Ctrl+Shift+F for fast speed (16x)
  if (event.ctrlKey && event.shiftKey && event.key === 'F') {
    event.preventDefault();
    const video = document.querySelector('video');
    if (video) {
      video.playbackRate = 16;
      showVideoSpeedNotification('16x speed activated');
    }
  }
  
  // Ctrl+Shift+N for normal speed (1x)
  if (event.ctrlKey && event.shiftKey && event.key === 'N') {
    event.preventDefault();
    const video = document.querySelector('video');
    if (video) {
      video.playbackRate = 1;
      showVideoSpeedNotification('Normal speed activated');
    }
  }
});

// Show a temporary notification when speed changes via keyboard
function showVideoSpeedNotification(message) {
  // Remove any existing notification
  const existingNotification = document.getElementById('video-speed-notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.id = 'video-speed-notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(102, 126, 234, 0.95);
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10000;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  `;
  
  document.body.appendChild(notification);
  
  // Remove notification after 2 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.opacity = '0';
      notification.style.transform = 'translateY(-10px)';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }
  }, 2000);
}