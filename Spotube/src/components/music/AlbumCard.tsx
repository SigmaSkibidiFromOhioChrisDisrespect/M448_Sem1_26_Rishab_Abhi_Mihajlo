import { Image, StyleSheet, Text, View } from "react-native";
import type { Album } from "@/types/music";

type AlbumCardProps = {
  album: Album;
};

export default function AlbumCard({ album }: AlbumCardProps) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: album.artworkUrl }}
        style={styles.artwork}
      />

      <View>
        <Text style={styles.title}>{album.title}</Text>
        <Text style={styles.artist}>{album.artist}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  artwork: {
    width: 65,
    height: 65,
    borderRadius: 8,
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  artist: {
    color: "#888",
    fontSize: 14,
  },
});