import * as SQLite from "expo-sqlite";

let database: SQLite.SQLiteDatabase | null = null;

export async function initDb(): Promise<void> {
  try {
    database = await SQLite.openDatabaseAsync("places.db", {
      enableChangeListener: true, // Optional: Enables database change listeners
    });

    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
      );
    `);

    console.log("Database initialized successfully.");
  } catch (error) {
    console.error("Database initialization error:", error);
    throw error;
  }
}

export function getDatabase() {
  if (!database) {
    throw new Error("Database is not initialized. Call initDb first.");
  }
  return database;
}
