import React, { createContext, useContext, useRef, useState } from 'react';

type PlaybackContextType = {
  isPlaying: boolean;
  audioRef: React.RefObject<HTMLAudioElement>;
  play: () => void;
  pause: () => void;
};

const PlaybackContext = createContext<PlaybackContextType | null>(null);

export const usePlayback = () => {
  const context = useContext(PlaybackContext);
  if (!context) throw new Error('usePlayback must be used within PlaybackProvider');
  return context;
};

export const PlaybackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <PlaybackContext.Provider value={{ isPlaying, audioRef, play, pause }}>
      <>
        <audio ref={audioRef} src="/bliss/Bliss-Loop.wav" preload="auto" loop/>
        {children}
      </>
    </PlaybackContext.Provider>
  );
};
