/**
 * Contains functions for managing song data in the database.
 * Handles inserting, retrieving, updating, and deleting songs.
 */

import type { SQLiteDatabase } from "expo-sqlite";
import type { NewSong, Song } from "../types/music";

// Insert a song
export const insertSong = async (
  db: SQLiteDatabase,
  song: NewSong,
): Promise<number> => {
  await db.runAsync(
    `INSERT INTO songs (
      title,
      artist,
      album,
      artworkUrl,
      duration,
      provider,
      providerId,
      audioUrl
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(provider, providerId) DO NOTHING;`,
    song.title,
    song.artist,
    song.album,
    song.artworkUrl,
    song.duration,
    song.provider,
    song.providerId,
    song.audioUrl,
  );

  const savedSong = await db.getFirstAsync<{ id: number }>(
    `SELECT id FROM songs
     WHERE provider = ? AND providerId = ?;`,
    song.provider,
    song.providerId,
  );

  if (!savedSong) {
    throw new Error("Could not retrieve the saved song.");
  }

  return savedSong.id;
};

// Retrieve all songs
export const fetchSongs = async (db: SQLiteDatabase): Promise<Song[]> => {
  return db.getAllAsync<Song>("SELECT * FROM songs ORDER BY id DESC;");
};

// Retrieve one song by its local database ID
export const fetchSongById = async (
  db: SQLiteDatabase,
  id: number,
): Promise<Song | null> => {
  return db.getFirstAsync<Song>("SELECT * FROM songs WHERE id = ?;", id);
};

// Update a song
export const updateSong = async (
  db: SQLiteDatabase,
  id: number,
  song: NewSong,
): Promise<void> => {
  await db.runAsync(
    `UPDATE songs
     SET title = ?,
         artist = ?,
         album = ?,
         artworkUrl = ?,
         duration = ?,
         provider = ?,
         providerId = ?,
         audioUrl = ?
     WHERE id = ?;`,
    song.title,
    song.artist,
    song.album,
    song.artworkUrl,
    song.duration,
    song.provider,
    song.providerId,
    song.audioUrl,
    id,
  );
};

// Delete a song
export const deleteSong = async (
  db: SQLiteDatabase,
  id: number,
): Promise<void> => {
  await db.runAsync("DELETE FROM songs WHERE id = ?;", id);
};
