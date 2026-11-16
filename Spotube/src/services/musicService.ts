import type { NewSong } from "../types/music";
import { searchITunes } from "./api/itunes";
import { searchYouTube } from "./api/youtube";

export async function searchMusic(query: string): Promise<NewSong[]> {
  const cleanedQuery = query.trim();

  if (!cleanedQuery) {
    return [];
  }

  const results = await Promise.allSettled([
    searchYouTube(cleanedQuery),
    searchITunes(cleanedQuery),
  ]);

  const youtubeSongs =
    results[0].status === "fulfilled" ? results[0].value : [];

  const itunesSongs = results[1].status === "fulfilled" ? results[1].value : [];

  if (results.every((result) => result.status === "rejected")) {
    throw new Error("Both music providers failed.");
  }

  return [...youtubeSongs, ...itunesSongs];
}
