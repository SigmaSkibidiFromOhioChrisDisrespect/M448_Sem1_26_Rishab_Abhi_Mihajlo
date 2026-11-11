// AI GENERATED IN ORDER TO TEST THE API, NOT FINAL CODE.


import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import type { Song } from "@/types/music";

type SongCardProps = {
  song: Song;
  onPress?: (song: Song) => void;
};

export default function SongCard({ song, onPress }: SongCardProps) {
  // Convert milliseconds into minutes and seconds
  const formatDuration = (duration: number) => {
    const seconds = Math.floor(duration / 1000);

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <Pressable style={styles.container} onPress={() => onPress?.(song)}>
      {/* Album artwork */}
      <Image
        source={
          song.artworkUrl
            ? { uri: song.artworkUrl }
            : require("@/assets/images/placeholder.png")
        }
        style={styles.artwork}
      />

      {/* Song information */}
      <View style={styles.songInfo}>
        <Text style={styles.title} numberOfLines={1}>
          {song.title}
        </Text>

        <Text style={styles.artist} numberOfLines={1}>
          {song.artist}
        </Text>

        <View style={styles.details}>
          <Text style={styles.provider}>
            {song.provider === "youtube" ? "YouTube" : "iTunes"}
          </Text>

          {song.duration > 0 && (
            <Text style={styles.duration}>{formatDuration(song.duration)}</Text>
          )}
        </View>
      </View>

      {/* Play button */}
      <Text style={styles.playButton}>▶</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    padding: 10,
    borderRadius: 12,
    gap: 12,
  },

  artwork: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#333333",
  },

  songInfo: {
    flex: 1,
    justifyContent: "center",
    gap: 4,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },

  artist: {
    color: "#AAAAAA",
    fontSize: 13,
  },

  details: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  provider: {
    color: "#A78BFA",
    fontSize: 11,
    fontWeight: "600",
  },

  duration: {
    color: "#888888",
    fontSize: 11,
  },

  playButton: {
    color: "#FFFFFF",
    fontSize: 22,
    paddingHorizontal: 8,
  },
});
