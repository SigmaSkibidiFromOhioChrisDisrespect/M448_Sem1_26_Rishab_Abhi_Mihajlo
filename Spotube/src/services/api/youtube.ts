
import type { Song } from "../../types/music";

const YOUTUBE_API_KEY =
  process.env.EXPO_PUBLIC_YOUTUBE_API_KEY;

export async function searchYouTube(
  query: string
): Promise<Song[]> {
  if (!YOUTUBE_API_KEY) {
    throw new Error("Missing YouTube API key");
  }

  const params = new URLSearchParams({
    part: "snippet",
    q: query,
    type: "video",
    videoCategoryId: "10",
    videoEmbeddable: "true",
    maxResults: "15",
    key: YOUTUBE_API_KEY,
  });

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?${params}`
  );

  if (!response.ok) {
    throw new Error(`YouTube error: ${response.status}`);
  }

  const data = await response.json();

  return data.items.map((item: any) => ({
    id: 0,
    title: item.snippet.title,
    artist: item.snippet.channelTitle,
    album: "",
    artworkUrl:
      item.snippet.thumbnails.high?.url ??
      item.snippet.thumbnails.default?.url ??
      "",
    duration: 0,
    provider: "youtube",
    providerId: item.id.videoId,
  }));
}
