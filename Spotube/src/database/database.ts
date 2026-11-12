/**
 * Initializes the SQLite database and creates the required tables.
 * Handles the database connection and setup for storing app data.
 */

import type { SQLiteDatabase } from "expo-sqlite";
import { CREATE_TABLES } from "./schema";

export const initDb = async (db: SQLiteDatabase): Promise<void> => {
  //protection check to ensure foreign key constraints are enforced
  await db.execAsync("PRAGMA foreign_keys = ON;");
  //actual table creation
  await db.execAsync(CREATE_TABLES);
};
