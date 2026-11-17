import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

import { initDb } from "../database/database";

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="vybe.db" onInit={initDb}>
      <Stack />
    </SQLiteProvider>
  );
}
