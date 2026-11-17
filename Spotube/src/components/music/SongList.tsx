import { FlatList, StyleSheet, Text, View } from "react-native";

import type { NewSong } from "@/types/music";
import SongCard from "./SongCard";

type SongListProps = {
  songs: NewSong[];
  onSongPress: (song: NewSong) => void;
};

export default function SongList({ songs, onSongPress }: SongListProps) {
  return (
    <FlatList
      data={songs}
      keyExtractor={(item) => `${item.provider}-${item.providerId}`}
      renderItem={({ item }) => <SongCard song={item} onPress={onSongPress} />}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No songs to display.</Text>
        </View>
      }
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 20,
  },
  separator: {
    height: 12,
  },
  emptyContainer: {
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    color: "#888888",
    fontSize: 14,
  },
});
