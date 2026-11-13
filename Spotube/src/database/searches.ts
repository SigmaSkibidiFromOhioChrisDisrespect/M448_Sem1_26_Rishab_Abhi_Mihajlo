/**
 * Contains functions for managing search data in the database.
 * Handles saving, retrieving, and organizing the user's recent searches.
 */

import type { SQLiteDatabase } from "expo-sqlite";

// Defines the structure of a saved search
export interface Search {
  id: number;
  query: string;
  searchedAt: string;
}

// Insert a search
export const insertSearch = async (
  db: SQLiteDatabase,
  query: string,
): Promise<number> => {
  const result = await db.runAsync(
    `INSERT INTO searches (query)
     VALUES (?);`,
    query,
  );

  return result.lastInsertRowId;
};

// Retrieve all searches
export const fetchSearches = async (db: SQLiteDatabase): Promise<Search[]> => {
  return db.getAllAsync<Search>(
    "SELECT * FROM searches ORDER BY searchedAt DESC;",
  );
};

// Retrieve one search by its database ID
export const fetchSearchById = async (
  db: SQLiteDatabase,
  id: number,
): Promise<Search | null> => {
  return db.getFirstAsync<Search>("SELECT * FROM searches WHERE id = ?;", id);
};
