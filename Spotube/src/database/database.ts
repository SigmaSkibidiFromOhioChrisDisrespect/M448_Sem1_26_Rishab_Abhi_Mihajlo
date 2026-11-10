/**
 * Initializes the SQLite database and creates the required tables.
 * Handles the database connection and setup for storing app data.
 */

import type { SQLiteDatabase } from "expo-sqlite";

export const initDb = async (db: SQLiteDatabase): Promise<void> => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS songs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      artist TEXT NOT NULL,
      album TEXT NOT NULL,
      artworkUrl TEXT NOT NULL,
      duration INTEGER NOT NULL,
      provider TEXT NOT NULL
        CHECK (provider IN ('youtube', 'itunes', 'soundcloud')),
      providerId TEXT NOT NULL,
      audioUrl TEXT,
      UNIQUE (provider, providerId)
    );
  `);
};
