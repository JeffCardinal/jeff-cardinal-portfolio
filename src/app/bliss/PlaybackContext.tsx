import React, { createContext, useContext, useRef, useState } from 'react';

type PlaybackContextType = {
  isPlaying: boolean;
  isBeenPlayed: boolean;
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
  const [isBeenPlayed, setIsBeenPlayed] = useState<boolean>(false);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
      setIsBeenPlayed(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <PlaybackContext.Provider value={{ isPlaying, isBeenPlayed, audioRef, play, pause }}>
      <>
        <audio ref={audioRef} src="/bliss/Bliss-Loop.mp3" preload="auto" loop/>
        {children}
      </>
    </PlaybackContext.Provider>
  );
};
