export type MusicProvider = "youtube" | "itunes";

/**
 * Defines the TypeScript types used for music data in VYBE.
 * Specifies the expected structure and properties of a song object.
 */

<<<<<<< HEAD
export type MusicProvider = "youtube" | "itunes";

=======
>>>>>>> 0d24dc3a6a155d88d0d82369aa56b2a755d1b2a1
export interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  artworkUrl: string;
  duration: number;
  provider: MusicProvider;
  providerId: string;
  audioUrl: string | null;
}

export type NewSong = Omit<Song, "id">;
