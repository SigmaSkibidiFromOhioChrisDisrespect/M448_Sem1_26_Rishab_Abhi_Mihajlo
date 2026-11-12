import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import Textfield from "@/components/common/Textfield";
import SongList from "@/components/music/SongList";
import { useSearch } from "@/hooks/useSearch";

export default function SearchScreen() {
  // Stores what the user types
  const [query, setQuery] = useState("");

  // Handles searching through YouTube and iTunes
  const { songs, loading, error, search } = useSearch();

  // Runs when the user submits their search
  const handleSearch = () => {
    if (!query.trim()) return;

    search(query.trim());
  };


  return (
    <View style={styles.container}>
      {/* Page heading */}
      <Text style={styles.heading}>Search</Text>

      {/* Search bar */}
      <Textfield
        placeholder="Search songs or artists..."
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

      {/* Search results */}
      {!loading && songs.length > 0 && (
        <View style={styles.results}>
          <Text style={styles.sectionTitle}>Search Results</Text>

          <SongList songs={songs} />
        </View>
      )}

      {/* Empty search message */}
      {!loading && !error && songs.length === 0 && query.length === 0 && (
        <Text style={styles.message}>
          Search for your favorite songs and artists.
        </Text>
      )}

      {/* No results message */}
      {!loading && !error && songs.length === 0 && query.trim().length > 0 && (
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
