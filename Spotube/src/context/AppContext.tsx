import { createContext, ReactNode, useContext, useState } from "react";

import { Playlist } from "../types/playlist";

type AppContextType = {
  // Playlist data
  playlists: Playlist[];
  setPlaylists: (playlists: Playlist[]) => void;

  // App status
  isAppReady: boolean;
  setIsAppReady: (ready: boolean) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isAppReady, setIsAppReady] = useState(false);

  return (
    <AppContext.Provider
      value={{
        playlists,
        setPlaylists,
        isAppReady,
        setIsAppReady,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }

  return context;
}
