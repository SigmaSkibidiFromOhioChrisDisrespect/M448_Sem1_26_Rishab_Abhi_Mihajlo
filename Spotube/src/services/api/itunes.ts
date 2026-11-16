import type { NewSong } from "../../types/music";

export async function searchITunes(query: string): Promise<NewSong[]> {
  const params = new URLSearchParams({
    term: query,
    media: "music",
    entity: "song",
    limit: "15",
    country: "us",
  });

  const response = await fetch(`https://itunes.apple.com/search?${params}`);

  if (!response.ok) {
    throw new Error(`iTunes error: ${response.status}`);
  }

  const data = await response.json();

  return data.results.map(
    (item: any): NewSong => ({
      title: item.trackName,
      artist: item.artistName,
      album: item.collectionName ?? "",
      artworkUrl: item.artworkUrl100 ?? "",
      duration: item.trackTimeMillis
        ? Math.floor(item.trackTimeMillis / 1000)
        : 0,
      provider: "itunes",
      providerId: String(item.trackId),
      audioUrl: item.previewUrl ?? null,
    }),
  );
}
