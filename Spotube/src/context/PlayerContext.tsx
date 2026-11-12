// Context was made with ChatGPT agent, and is used to manage the state of the music player in the application. It provides a centralized way to control playback, manage the queue, and handle playback settings like shuffle and repeat modes.
// https://chatgpt.com/g/g-p-6aeca1fb11c481919f6f19c02e8d75bc-vybe/shared/c/6af48865-c2d8-83ea-b699-95d4e350be69?owner_user_id=user-XSYhecBA8B3XrogS8GpBBlnh

import { createContext, ReactNode, useContext, useState } from "react";

import type { Song } from "../types/music";

// Repeat options
type RepeatMode = "off" | "one" | "all";

// Player context structure
type PlayerContextType = {
  // Current music
  currentSong: Song | null;
  queue: Song[];
  isPlaying: boolean;

  // Playback progress
  currentTime: number;
  duration: number;

  // Playback settings
  isShuffle: boolean;
  repeatMode: RepeatMode;

  // Music controls
  playSong: (song: Song) => void;
  pauseSong: () => void;
  resumeSong: () => void;
  skipSong: () => void;
  previousSong: () => void;

  // Queue controls
  setQueue: (songs: Song[]) => void;
  addToQueue: (song: Song) => void;

  // Playback settings
  toggleShuffle: () => void;
  toggleRepeat: () => void;

  // Progress controls
  seekTo: (time: number) => void;
  updateProgress: (time: number, total: number) => void;
};

// Create context
const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

// Provider
export function PlayerProvider({ children }: { children: ReactNode }) {
  // Current music state
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [queue, setQueue] = useState<Song[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  // Playback progress
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Playback settings
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>("off");

  // Play selected song
  const playSong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setCurrentTime(0);
    setDuration(0);

    setQueue((previousQueue) =>
      previousQueue.some((item) => item === song)
        ? previousQueue
        : [...previousQueue, song],
    );
  };

  // Pause music
  const pauseSong = () => {
    setIsPlaying(false);
  };

  // Resume music
  const resumeSong = () => {
    if (currentSong) {
      setIsPlaying(true);
    }
  };

  // Skip to next song
  const skipSong = () => {
    if (queue.length === 0 || !currentSong) return;

    const currentIndex = queue.indexOf(currentSong);
    if (currentIndex === -1) return;

    let nextIndex: number;

    if (isShuffle && queue.length > 1) {
      do {
        nextIndex = Math.floor(Math.random() * queue.length);
      } while (nextIndex === currentIndex);
    } else {
      nextIndex = currentIndex + 1;

      if (nextIndex >= queue.length) {
        if (repeatMode === "all") {
          nextIndex = 0;
        } else {
          setIsPlaying(false);
          return;
        }
      }
    }

    setCurrentSong(queue[nextIndex]);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(true);
  };

  // Go to previous song
  const previousSong = () => {
    if (queue.length === 0 || !currentSong) return;

    const currentIndex = queue.indexOf(currentSong);
    if (currentIndex <= 0) return;

    setCurrentSong(queue[currentIndex - 1]);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(true);
  };

  // Add song to queue
  const addToQueue = (song: Song) => {
    setQueue((previousQueue) => [...previousQueue, song]);
  };

  // Toggle shuffle
  const toggleShuffle = () => {
    setIsShuffle((previous) => !previous);
  };

  // Cycle repeat modes
  const toggleRepeat = () => {
    setRepeatMode((previous) => {
      if (previous === "off") return "all";
      if (previous === "all") return "one";
      return "off";
    });
  };

  // Seek to a specific time
  const seekTo = (time: number) => {
    const safeTime = Math.max(0, Math.min(time, duration));
    setCurrentTime(safeTime);
  };

  // Update playback progress
  const updateProgress = (time: number, total: number) => {
    setCurrentTime(time);
    setDuration(total);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        queue,
        isPlaying,
        currentTime,
        duration,
        isShuffle,
        repeatMode,
        playSong,
        pauseSong,
        resumeSong,
        skipSong,
        previousSong,
        setQueue,
        addToQueue,
        toggleShuffle,
        toggleRepeat,
        seekTo,
        updateProgress,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

// Custom hook
export function usePlayerContext() {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error("usePlayerContext must be used within PlayerProvider");
  }

  return context;
}
