
import { useState } from "react";
// Search both iTunes result types; search songs do not have a local database ID yet.
import { searchAlbums, searchMusic } from "../services/musicService";
import type { Album, NewSong } from "../types/music";

export function useSearch() {
  // Store album collections alongside unsaved song results for the search screen.
  const [songs, setSongs] = useState<NewSong[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (query: string) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Keep a successful song or album response even if the other iTunes request fails.
      const [songResults, albumResults] = await Promise.allSettled([
        searchMusic(query),
        searchAlbums(query),
      ]);

      if (songResults.status === "rejected" && albumResults.status === "rejected") {
        throw new Error("iTunes search failed.");
      }

      // Replace both collections together so a new query cannot retain old album results.
      setSongs(songResults.status === "fulfilled" ? songResults.value : []);
      setAlbums(albumResults.status === "fulfilled" ? albumResults.value : []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
      // Clear both result types when the entire search fails.
      setSongs([]);
      setAlbums([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    songs,
    // Expose the album collection so the existing AlbumList can render it.
    albums,
    loading,
    error,
    search,
  };
}
