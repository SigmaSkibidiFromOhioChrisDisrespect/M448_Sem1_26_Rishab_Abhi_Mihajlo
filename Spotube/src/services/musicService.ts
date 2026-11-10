import { searchYouTube } from "./api/youtube";
import { searchITunes } from "./api/itunes";
import type { Song } from "../types/music";

export async function searchMusic(
  query: string
): Promise<Song[]> {
  if (!query.trim()) {
    return [];
  }

  const results = await Promise.allSettled([
    searchYouTube(query),
    searchITunes(query),
  ]);

  const youtubeSongs =
    results[0].status === "fulfilled"
      ? results[0].value
      : [];

  const itunesSongs =
    results[1].status === "fulfilled"
      ? results[1].value
      : [];

  if (
    results.every(result => result.status === "rejected")
  ) {
    throw new Error("Both music providers failed.");
  }

  return [...youtubeSongs, ...itunesSongs];
}
