/**
 * Defines the SQL table structures used in the VYBE database.
 * Organizes the columns, relationships, and constraints for stored data.
 */

export const CREATE_TABLES = `
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

  CREATE TABLE IF NOT EXISTS playlists (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  createdAt TEXT NOT NULL
);

  CREATE TABLE IF NOT EXISTS playlist_songs (
    playlistId INTEGER NOT NULL,
    songId INTEGER NOT NULL,
    position INTEGER NOT NULL,
    PRIMARY KEY (playlistId, songId),
    FOREIGN KEY (playlistId) REFERENCES playlists(id) ON DELETE CASCADE,
    FOREIGN KEY (songId) REFERENCES songs(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS searches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    query TEXT NOT NULL,
    searchedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    songId INTEGER NOT NULL,
    playedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (songId) REFERENCES songs(id) ON DELETE CASCADE
  );
`;
