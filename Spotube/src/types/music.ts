/**
 * Defines the TypeScript types used for music data in VYBE.
 * Specifies the expected structure and properties of a song object.
 */

export type MusicProvider = "youtube" | "itunes";

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
