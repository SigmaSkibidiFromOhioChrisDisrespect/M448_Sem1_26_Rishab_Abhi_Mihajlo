
import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import { router } from "expo-router";
import type { Album } from "@/types/music";

type AlbumCardProps = {
  album: Album;
};

export default function AlbumCard({ album }: AlbumCardProps) {
  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        router.push({
          pathname: "/album/[id]",
          params: {
            id: album.providerId,
            provider: album.provider,
            title: album.title,
            artist: album.artist,
            artworkUrl: album.artworkUrl,
          },
        })
      }
    >
      <Image
        source={{ uri: album.artworkUrl }}
        style={styles.artwork}
      />

      <View style={styles.details}>
        <Text style={styles.title}>{album.title}</Text>
        <Text style={styles.artist}>{album.artist}</Text>
      </View>
    </Pressable>
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
  details: {
    flex: 1,
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
