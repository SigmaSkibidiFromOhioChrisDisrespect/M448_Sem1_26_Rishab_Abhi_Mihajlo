/**
 * Contains functions for managing playlist data in the database.
 * Handles inserting, retrieving, updating, and deleting playlists.
 */

import type { SQLiteDatabase } from "expo-sqlite";
import type { Playlist } from "../types/playlist";

// Insert a playlist
export const insertPlaylist = async (
  db: SQLiteDatabase,
  playlist: Omit<Playlist, "id">,
): Promise<number> => {
  const result = await db.runAsync(
    `INSERT INTO playlists (
      name,
      description,
      createdAt
    ) VALUES (?, ?, ?);`,
    playlist.name,
    playlist.description ?? null,
    playlist.createdAt,
  );

  return result.lastInsertRowId;
};

// Retrieve all playlists
export const fetchPlaylists = async (
  db: SQLiteDatabase,
): Promise<Playlist[]> => {
  return db.getAllAsync<Playlist>("SELECT * FROM playlists ORDER BY id DESC;");
};

// Retrieve one playlist by its database ID
export const fetchPlaylistById = async (
  db: SQLiteDatabase,
  id: number,
): Promise<Playlist | null> => {
  return db.getFirstAsync<Playlist>(
    "SELECT * FROM playlists WHERE id = ?;",
    id,
  );
};

// Update a playlist
export const updatePlaylist = async (
  db: SQLiteDatabase,
  id: number,
  playlist: Omit<Playlist, "id">,
): Promise<void> => {
  await db.runAsync(
    `UPDATE playlists
     SET name = ?,
         description = ?,
         createdAt = ?
     WHERE id = ?;`,
    playlist.name,
    playlist.description ?? null,
    playlist.createdAt,
    id,
  );
};

// Delete a playlist
export const deletePlaylist = async (
  db: SQLiteDatabase,
  id: number,
): Promise<void> => {
  await db.runAsync("DELETE FROM playlists WHERE id = ?;", id);
};
