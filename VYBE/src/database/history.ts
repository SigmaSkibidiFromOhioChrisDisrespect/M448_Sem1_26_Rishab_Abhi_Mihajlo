/**
 * Contains functions for managing listening history in the database.
 * Handles recording, retrieving, and organizing previously played songs.
 */

/**
 * Contains functions for managing listening history in the database.
 * Handles recording, retrieving, and organizing previously played songs.
 */

import type { SQLiteDatabase } from "expo-sqlite";

// Defines the structure of a listening history entry
export interface History {
  id: number;
  songId: number;
  playedAt: string;
}

// Insert a listening history entry
export const insertHistory = async (
  db: SQLiteDatabase,
  songId: number,
): Promise<number> => {
  const result = await db.runAsync(
    `INSERT INTO history (songId)
     VALUES (?);`,
    songId,
  );

  return result.lastInsertRowId;
};

// Retrieve all listening history entries
export const fetchHistory = async (db: SQLiteDatabase): Promise<History[]> => {
  return db.getAllAsync<History>(
    "SELECT * FROM history ORDER BY playedAt DESC;",
  );
};

// Retrieve one history entry by its database ID
export const fetchHistoryById = async (
  db: SQLiteDatabase,
  id: number,
): Promise<History | null> => {
  return db.getFirstAsync<History>("SELECT * FROM history WHERE id = ?;", id);
};

// Delete a history entry
export const deleteHistory = async (
  db: SQLiteDatabase,
  id: number,
): Promise<void> => {
  await db.runAsync("DELETE FROM history WHERE id = ?;", id);
};

// Clear all listening history
export const clearHistory = async (db: SQLiteDatabase): Promise<void> => {
  await db.runAsync("DELETE FROM history;");
};
