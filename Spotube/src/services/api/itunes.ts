
import type { Song, Album } from "../../types/music";

// Search for individual songs
export async function searchITunes(
  query: string
): Promise<Song[]> {
  const params = new URLSearchParams({
    term: query,
    media: "music",
    entity: "song",
    limit: "20",
    country: "us",
  });

  const response = await fetch(
    `https://itunes.apple.com/search?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error(`iTunes error: ${response.status}`);
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


// Search for albums
export async function searchITunesAlbums(
  query: string
): Promise<Album[]> {
  const params = new URLSearchParams({
    term: query,
    media: "music",
    entity: "album",
    limit: "25",
    country: "us",
  });

  const response = await fetch(
    `https://itunes.apple.com/search?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error(`iTunes error: ${response.status}`);
  }

  const data = await response.json();

  return data.results.map((item: any) => ({
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


// Get songs belonging to a selected album
export async function getAlbumSongs(
  albumId: string
): Promise<Song[]> {
  const params = new URLSearchParams({
    id: albumId,
    entity: "song",
    country: "us",
  });

  const response = await fetch(
    `https://itunes.apple.com/lookup?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error(`iTunes error: ${response.status}`);
  }

  const data = await response.json();

  // First result is the album itself, so skip it
  return data.results
    .filter((item: any) => item.wrapperType === "track")
    .map((item: any) => ({
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
