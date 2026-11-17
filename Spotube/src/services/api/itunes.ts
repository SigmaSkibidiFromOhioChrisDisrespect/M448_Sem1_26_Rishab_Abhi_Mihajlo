
import type { Album, NewSong } from "../../types/music";

// Search iTunes for individual songs.
export async function searchITunes(
  query: string
): Promise<NewSong[]> {
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
    })
  );
}

// Structure of an iTunes album result.
type ITunesAlbumResult = {
  collectionId: number;
  collectionName: string;
  artistName: string;
  artworkUrl100?: string;
  releaseDate?: string;
  trackCount?: number;
};

// Search iTunes for albums.
export async function searchITunesAlbums(
  query: string
): Promise<Album[]> {
  const params = new URLSearchParams({
    term: query,
    media: "music",
    entity: "album",
    limit: "15",
    country: "us",
  });

  const response = await fetch(
    `https://itunes.apple.com/search?${params}`
  );

  if (!response.ok) {
    throw new Error(`iTunes album error: ${response.status}`);
  }

  const data: { results: ITunesAlbumResult[] } =
    await response.json();

  return data.results.map(
    (item): Album => ({
      id: String(item.collectionId),
      title: item.collectionName,
      artist: item.artistName,
      artworkUrl: item.artworkUrl100 ?? "",
      releaseDate: item.releaseDate,
      trackCount: item.trackCount,
      provider: "itunes",
      providerId: String(item.collectionId),
    })
  );
}

// Structure of an iTunes track result.
type ITunesTrackResult = {
  wrapperType?: string;
  kind?: string;
  trackId: number;
  trackName: string;
  artistName: string;
  collectionName?: string;
  artworkUrl100?: string;
  trackTimeMillis?: number;
  previewUrl?: string;
  collectionId: number;
};

// Fetch all songs belonging to an album.
export async function getITunesAlbumTracks(
  collectionId: string
): Promise<NewSong[]> {
  const params = new URLSearchParams({
    id: collectionId,
    entity: "song",
    country: "us",
  });

  const response = await fetch(
    `https://itunes.apple.com/lookup?${params}`
  );

  if (!response.ok) {
    throw new Error(
      `iTunes album tracks error: ${response.status}`
    );
  }

  const data: { results: ITunesTrackResult[] } =
    await response.json();

  return data.results
    .filter(
      (item) =>
        item.wrapperType === "track" &&
        item.kind === "song" &&
        String(item.collectionId) === collectionId
    )
    .map(
      (item): NewSong => ({
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
      })
    );
}
