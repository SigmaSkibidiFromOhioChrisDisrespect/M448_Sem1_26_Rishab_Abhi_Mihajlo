import { FlatList, StyleSheet, Text, View } from "react-native";

import type { Album } from "@/types/music";
import AlbumCard from "./AlbumCard";

type AlbumListProps = {
  albums: Album[];
};

export default function AlbumList({ albums }: AlbumListProps) {
  return (
    <FlatList
      data={albums}
      keyExtractor={(item) => `${item.provider}-${item.providerId}`}
      renderItem={({ item }) => <AlbumCard album={item} />}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No albums to display.
          </Text>
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