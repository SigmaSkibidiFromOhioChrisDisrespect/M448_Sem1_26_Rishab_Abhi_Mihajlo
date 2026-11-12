// AI GENERATED IN ORDER TO TEST THE API, NOT FINAL CODE.

import { FlatList, StyleSheet, Text, View } from "react-native";

import type { Song } from "@/types/music";
import SongCard from "./SongCard";

type SongListProps = {
  songs: Song[];
};

export default function SongList({ songs }: SongListProps) {
  return (
    <FlatList
      data={songs}
      // Gives each song a unique key
      keyExtractor={(item) => `${item.provider}-${item.providerId}`}
      // Displays an individual SongCard
      renderItem={({ item }) => <SongCard song={item} />}
      // Message when there are no songs
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No songs to display.</Text>
        </View>
      }
      // Adds spacing between songs
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
