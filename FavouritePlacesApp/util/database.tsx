import * as SQLite from "expo-sqlite";
import Place from "../models/place";
import { LatLng } from "react-native-maps";

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

export async function insertPlace(place: Place): Promise<void> {
  try {
    const db = getDatabase(); // Ensure the database is initialized

    await db.withExclusiveTransactionAsync(async (txn) => {
      const result = await txn.runAsync(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [place.title, place.imageUri, place.address, place.location.latitude, place.location.longitude]
      );

      console.log("Place inserted successfully within transaction. Result:", result);
    });
  } catch (error) {
    console.error("Error inserting place within transaction:", error);
    throw error;
  }
}

export async function fetchPlaces(): Promise<Place[]> {
  try {
    const db = getDatabase(); // Ensure the database is initialized

    let places: Place[] = []; // Array to store the fetched places

    await db.withExclusiveTransactionAsync(async (txn) => {
      const result = await txn.getAllAsync(`SELECT * FROM places`);
      places = result as Place[]; // Assign the result to the array as a place type
    });

    console.log(places)

    return places; // Return the fetched places
  } catch (error) {
    console.error("Error fetching all places:", error);
    throw error;
  }
}

export async function fetchPlaceDetails(id: string): Promise<Place> {
  try {
    const db = getDatabase(); // Ensure the database is initialized

    let place: Place | null = null;

    await db.withExclusiveTransactionAsync(async (txn) => {
      const result = await txn.getAllAsync(`SELECT * FROM places WHERE id = ?`, [id]);

      if (result.length > 0) {
        const dbPlace = result[0] as any;
        const location: LatLng = { latitude: dbPlace.lat, longitude: dbPlace.lng };

        place = new Place(dbPlace.title, dbPlace.imageUri, dbPlace.address, location, dbPlace.id);
      }
    });

    if (!place) {
      throw new Error(`Place with id ${id} not found`);
    }

    console.log(place);
    return place;
  } catch (error) {
    console.error("Error fetching place details:", error);
    throw error;
  }
}


