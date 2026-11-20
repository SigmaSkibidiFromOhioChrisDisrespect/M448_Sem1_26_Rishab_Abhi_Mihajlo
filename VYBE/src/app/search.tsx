import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import Textfield from "@/components/common/Textfield";
// Reuse the existing album list to display collection results from the search hook.
import AlbumList from "@/components/music/AlbumList";
import SongList from "@/components/music/SongList";
import { useSearch } from "@/hooks/useSearch";

export default function SearchScreen() {
  // Stores what the user types
  const [query, setQuery] = useState("");

  // Read both song and album results from the iTunes-only search flow.
  const { songs, albums, loading, error, search } = useSearch();

  // Runs when the user submits their search
  const handleSearch = () => {
    if (!query.trim()) return;

    search(query.trim());
  };


  return (
    <View style={styles.container}>
      {/* Page heading */}
      <Text style={styles.heading}>Search</Text>

      {/* Include albums in the prompt now that album searches are connected. */}
      <Textfield
        placeholder="Search songs, albums, or artists..."
        backgroundColor="#292929"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />

      {/* Loading indicator */}
      {loading && (
        <ActivityIndicator size="large" color="white" style={styles.loading} />
      )}

      {/* Error message */}
      {error && <Text style={styles.error}>{error}</Text>}

      {/* Give albums their own bounded list, including searches with no matching songs. */}
      {!loading && albums.length > 0 && (
        <View style={styles.results}>
          <Text style={styles.sectionTitle}>Albums</Text>
          <AlbumList albums={albums} />
        </View>
      )}

      {/* Keep song results in a separate section alongside the album list. */}
      {!loading && songs.length > 0 && (
        <View style={styles.results}>
          <Text style={styles.sectionTitle}>Songs</Text>

          <SongList songs={songs} />
        </View>
      )}

      {/* The initial prompt is only appropriate when both result collections are empty. */}
      {!loading && !error && songs.length === 0 && albums.length === 0 && query.length === 0 && (
        <Text style={styles.message}>
          Search for your favorite songs, albums, and artists.
        </Text>
      )}

      {/* Album-only matches are results too, so do not show a false empty-results message. */}
      {!loading && !error && songs.length === 0 && albums.length === 0 && query.trim().length > 0 && (
        <Text style={styles.message}>
          No results found. Try another search.
        </Text>
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

  heading: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  loading: {
    marginTop: 25,
  },

  error: {
    color: "#FF5555",
    marginTop: 15,
  },

  // Bound each sibling list to a share of the available height so both remain scrollable.
  results: {
    marginTop: 25,
    flex: 1,
  },

  sectionTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },

  message: {
    color: "#888888",
    marginTop: 25,
    textAlign: "center",
  },
});
