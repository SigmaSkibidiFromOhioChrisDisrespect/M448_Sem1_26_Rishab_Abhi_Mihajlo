// Album searches use collection data alongside the existing song result type.
import type { Album, NewSong } from "../../types/music";

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

// Keep album response fields separate from song fields: albums use collection IDs and names.
type ITunesAlbumResult = {
  collectionId: number;
  collectionName: string;
  artistName: string;
  artworkUrl100?: string;
  releaseDate?: string;
  trackCount?: number;
};

// Request albums explicitly because the existing entity=song request cannot return album cards.
export async function searchITunesAlbums(query: string): Promise<Album[]> {
  const params = new URLSearchParams({
    term: query,
    media: "music",
    entity: "album",
    limit: "15",
    country: "us",
  });

  const response = await fetch(`https://itunes.apple.com/search?${params}`);

  if (!response.ok) {
    throw new Error(`iTunes album error: ${response.status}`);
  }

  const data: { results: ITunesAlbumResult[] } = await response.json();

  // Convert each collection into the Album shape already used by AlbumList and AlbumCard.
  return data.results.map((item): Album => ({
    id: String(item.collectionId),
    title: item.collectionName,
    artist: item.artistName,
    artworkUrl: item.artworkUrl100 ?? "",
    releaseDate: item.releaseDate,
    trackCount: item.trackCount,
    provider: "itunes",
    providerId: String(item.collectionId),
  }));
}
