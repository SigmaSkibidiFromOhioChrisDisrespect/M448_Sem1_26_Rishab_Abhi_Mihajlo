
import type { Song } from "../../types/music";

export async function searchITunes(query: string): Promise<Song[]> {
  const params = new URLSearchParams({
    term: query,
    media: "music",
    entity: "song",
    limit: "15",
    country: "us",
  });

  const response = await fetch(
    `https://itunes.apple.com/search?${params}`
  );

  if (!response.ok) {
    throw new Error(`iTunes API error: ${response.status}`);
  }

  const data = await response.json();

  return data.results.map((item: any) => ({
    id: 0,
    title: item.trackName,
    artist: item.artistName,
    album: item.collectionName ?? "",
    artworkUrl: item.artworkUrl100 ?? "",
    duration: item.trackTimeMillis ?? 0,
    provider: "itunes",
    providerId: String(item.trackId),
    previewUrl: item.previewUrl,
  }));
}
