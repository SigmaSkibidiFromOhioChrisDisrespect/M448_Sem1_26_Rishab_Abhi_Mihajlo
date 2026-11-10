//TESTING CODE TO SEE IF API WORKS NOT ACTUAL CODE WE WILL USE
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import { useSearch } from "../hooks/useSearch";

export default function SearchScreen() {
  const [query, setQuery] = useState("");

  const { songs, loading, error, search } = useSearch();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search music..."
        placeholderTextColor="#888"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={() => search(query)}
        returnKeyType="search"
      />

      {loading && <ActivityIndicator color="white" />}

      {error && (
        <Text style={styles.error}>{error}</Text>
      )}

      <FlatList
        data={songs}
        keyExtractor={(item, index) =>
          `${item.provider}-${item.providerId}-${index}`
        }
        renderItem={({ item }) => (
          <View style={styles.song}>
            <Image
              source={{ uri: item.artworkUrl }}
              style={styles.artwork}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.title}>
                {item.title}
              </Text>

              <Text style={styles.artist}>
                {item.artist}
              </Text>

              <Text style={styles.provider}>
                {item.provider}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  input: {
    backgroundColor: "#292929",
    color: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  song: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 15,
  },
  artwork: {
    width: 55,
    height: 55,
    borderRadius: 8,
  },
  title: {
    color: "white",
    fontWeight: "bold",
  },
  artist: {
    color: "#aaa",
  },
  provider: {
    color: "#777",
    fontSize: 12,
  },
  error: {
    color: "red",
    marginBottom: 12,
  },
});
