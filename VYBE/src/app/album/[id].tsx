import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
//comments
import { getITunesAlbumTracks } from "../../services/api/itunes";
import type { NewSong } from "@/types/music";

export default function AlbumDetailsScreen() {
  const { id, title, artist, artworkUrl } = useLocalSearchParams<{
    id: string;
    title: string;
    artist: string;
    artworkUrl: string;
  }>();

  const [songs, setSongs] = useState<NewSong[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setLoading(true);
        setError(null);

        const results = await getITunesAlbumTracks(id);
        setSongs(results);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Could not load album tracks.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTracks();
    }
  }, [id]);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.backButton}>‹ Back</Text>
      </Pressable>

      <View style={styles.albumHeader}>
        <Image source={{ uri: artworkUrl }} style={styles.artwork} />

        <Text style={styles.albumTitle}>{title}</Text>
        <Text style={styles.artist}>{artist}</Text>
        <Text style={styles.trackCount}>{songs.length} songs</Text>
      </View>

      {loading && (
        <ActivityIndicator size="large" color="white" style={styles.loading} />
      )}

      {error && <Text style={styles.error}>{error}</Text>}

      {!loading && !error && (
        <FlatList
          data={songs}
          keyExtractor={(item) => item.providerId}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.empty}>No tracks found for this album.</Text>
          }
          renderItem={({ item, index }) => (
            <Pressable style={styles.songRow}>
              <Text style={styles.songNumber}>{index + 1}</Text>

              <View style={styles.songInfo}>
                <Text style={styles.songTitle}>{item.title}</Text>
                <Text style={styles.songArtist}>{item.artist}</Text>
              </View>

              <Text style={styles.duration}>
                {formatDuration(item.duration)}
              </Text>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  backButton: {
    color: "white",
    fontSize: 18,
    marginBottom: 25,
  },
  albumHeader: {
    alignItems: "center",
    marginBottom: 30,
  },
  artwork: {
    width: 190,
    height: 190,
    borderRadius: 12,
    marginBottom: 20,
  },
  albumTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  artist: {
    color: "#AAAAAA",
    fontSize: 16,
    marginTop: 5,
  },
  trackCount: {
    color: "#777777",
    fontSize: 13,
    marginTop: 8,
  },
  loading: {
    marginTop: 30,
  },
  error: {
    color: "#FF5555",
    textAlign: "center",
  },
  empty: {
    color: "#888888",
    textAlign: "center",
    marginTop: 20,
  },
  songRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: "#292929",
  },
  songNumber: {
    color: "#888888",
    width: 30,
    fontSize: 14,
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
  songArtist: {
    color: "#888888",
    fontSize: 13,
    marginTop: 3,
  },
  duration: {
    color: "#888888",
    fontSize: 13,
  },
});
