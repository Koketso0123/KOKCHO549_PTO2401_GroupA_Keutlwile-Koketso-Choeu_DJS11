import React, { useState, useEffect } from "react";

const AudioPlayer = ({ currentEpisode }) => {
  const [audio] = useState(new Audio(currentEpisode?.file || ""));
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

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

    if (isPlaying) {
      audio.play();
      audio.addEventListener("timeupdate", handleTimeUpdate);
    } else {
      audio.pause();
    }

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [isPlaying, audio]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="audio-player">
      <button onClick={handlePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default AudioPlayer;
