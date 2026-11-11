
import { useState } from "react";
import { searchMusic } from "../services/musicService";
import type { Song } from "../types/music";

export function useSearch() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (query: string) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const results = await searchMusic(query);
      setSongs(results);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
      setSongs([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    songs,
    loading,
    error,
    search,
  };
}
