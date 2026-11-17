// Search the iTunes catalog only so YouTube videos no longer appear in music results.
import type { Album, NewSong } from "../types/music";
import { searchITunes, searchITunesAlbums } from "./api/itunes";

// Preserve the song-search API while excluding the former YouTube request and merge.
export async function searchMusic(query: string): Promise<NewSong[]> {
  const cleanedQuery = query.trim();

  if (!cleanedQuery) {
    return [];
  }

  return searchITunes(cleanedQuery);
}

// Fetch album collections separately; a blank query should never send an album request.
export async function searchAlbums(query: string): Promise<Album[]> {
  const cleanedQuery = query.trim();

  if (!cleanedQuery) {
    return [];
  }

  return searchITunesAlbums(cleanedQuery);
}
