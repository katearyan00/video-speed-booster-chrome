import { Button } from "@/components/ui/button";
import { useState } from "react";

const Index = () => {
  const [status, setStatus] = useState("");

  const setVideoSpeed = (playbackRate: number) => {
    try {
      const video = document.querySelector('video') as HTMLVideoElement;
      if (!video) {
        setStatus('No video found on this page');
        setTimeout(() => setStatus(''), 2000);
        return;
      }
      
      video.playbackRate = playbackRate;
      setStatus(`Video speed set to ${playbackRate}x`);
      setTimeout(() => setStatus(''), 2000);
    } catch (error) {
      setStatus('Error setting video speed');
      setTimeout(() => setStatus(''), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold mb-4">Video Speed Controller</h1>
        <p className="text-xl text-muted-foreground mb-8">Control video playback speed on this page</p>
        
        <div className="flex gap-4 justify-center">
          <Button 
            onClick={() => setVideoSpeed(16)}
            size="lg"
            className="bg-primary hover:bg-primary/90"
          >
            ⚡ Speed Up (16x)
          </Button>
          
          <Button 
            onClick={() => setVideoSpeed(1)}
            variant="outline"
            size="lg"
          >
            🎯 Normal Speed (1x)
          </Button>
        </div>
        
        {status && (
          <p className="text-sm text-muted-foreground mt-4">{status}</p>
        )}
      </div>
    </div>
  );
};

export default Index;
