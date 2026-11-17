import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";

import Textfield from "@/components/common/Textfield";
import AlbumList from "@/components/music/AlbumList";
import SongList from "@/components/music/SongList";

import { insertSong } from "@/database/songs";
import { useSearch } from "@/hooks/useSearch";
import type { NewSong } from "@/types/music";

export default function SearchScreen() {
  // Stores what the user types
  const [query, setQuery] = useState("");

  // Access the SQLite database
  const db = useSQLiteContext();

  // Read song and album results from the search hook
  const { songs, albums, loading, error, search } = useSearch();

  // Runs when the user submits their search
  const handleSearch = () => {
    if (!query.trim()) return;

    search(query.trim());
  };

  // Saves a selected song to SQLite
  const handleSaveSong = async (song: NewSong) => {
    try {
      const songId = await insertSong(db, song);

      Alert.alert("Song saved", `${song.title} was saved to your library.`);

      console.log("Saved song ID:", songId);
    } catch (error) {
      console.error("Error saving song:", error);

      Alert.alert("Save failed", "Could not save this song. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Page heading */}
      <Text style={styles.heading}>Search</Text>

      {/* Search input */}
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

      {/* Album results */}
      {!loading && albums.length > 0 && (
        <View style={styles.results}>
          <Text style={styles.sectionTitle}>Albums</Text>
          <AlbumList albums={albums} />
        </View>
      )}

      {/* Song results */}
      {!loading && songs.length > 0 && (
        <View style={styles.results}>
          <Text style={styles.sectionTitle}>Songs</Text>

          <SongList songs={songs} onSongPress={handleSaveSong} />
        </View>
      )}

      {/* Initial search prompt */}
      {!loading &&
        !error &&
        songs.length === 0 &&
        albums.length === 0 &&
        query.length === 0 && (
          <Text style={styles.message}>
            Search for your favorite songs, albums, and artists.
          </Text>
        )}

      {/* No results message */}
      {!loading &&
        !error &&
        songs.length === 0 &&
        albums.length === 0 &&
        query.trim().length > 0 && (
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

  // Bound each sibling list to a share of the available height
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
