import React, { useState, useEffect } from "react";

const AudioPlayer = ({ currentEpisode }) => {
  const [audio] = useState(new Audio(currentEpisode?.file || ""));
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showLeaveWarning, setShowLeaveWarning] = useState(false);

  useEffect(() => {
    if (currentEpisode) {
      audio.src = currentEpisode.file;
      audio.load();
    }
  }, [currentEpisode, audio]);

  useEffect(() => {
    const handleTimeUpdate = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleBeforeUnload = (event) => {
      if (isPlaying) {
        event.preventDefault();
        setShowLeaveWarning(true); // Show custom confirmation dialog
      }
    };

    if (isPlaying) {
      audio.play();
      audio.addEventListener("timeupdate", handleTimeUpdate);
      window.addEventListener("beforeunload", handleBeforeUnload);
    } else {
      audio.pause();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isPlaying, audio]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleConfirmLeave = () => {
    setShowLeaveWarning(false);
    setIsPlaying(true); // Keep audio playing
    window.removeEventListener("beforeunload", () => {}); // Allow navigation
  };

  const handleCancelLeave = () => {
    setShowLeaveWarning(false);
  };

  return (
    <div className="audio-player">
      <button onClick={handlePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>

      {showLeaveWarning && (
        <div className="leave-warning">
          <p>Are you sure you want to leave the page while audio is playing?</p>
          <button onClick={handleConfirmLeave}>Yes</button>
          <button onClick={handleCancelLeave}>No</button>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
