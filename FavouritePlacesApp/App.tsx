import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import Map from "./screens/Map";
import React, { useEffect, useState } from "react";
import IconButton from "./components/UI/IconButton";
import { Colors } from "./constants/colors";
import Place from "./models/place";
import { initDb } from "./util/database";
import AppLoading from "expo-app-loading";

export type RootStackParamList = {
  AllPlaces: { place: Place };
  AddPlace?: { pickedLat: number; pickedLng: number };
  Map: undefined; // Or { lat: number; lng: number } if you pass parameters to Map
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
   const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    async function initializeDatabase() {
      try {
        await initDb();
        setDbInitialized(true);
      } catch (err) {
        console.error("Database initialization failed:", err);
      }
    }

    initializeDatabase();
  }, []);

  if (!dbInitialized) {
    return <AppLoading />
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: Colors.primary500 },
          headerTintColor: Colors.gray700,
          contentStyle: { backgroundColor: Colors.gray700 },
        }}
      >
        <Stack.Screen
          name="AllPlaces"
          component={AllPlaces}
          options={({ navigation }) => ({
            title: "Your Favourite Places",
            headerRight: ({ tintColor }) => (
              <IconButton
                icon="add"
                color={tintColor}
                size={24}
                onPress={() => navigation.navigate("AddPlace")}
              />
            ),
          })}
        />
        <Stack.Screen
          name="AddPlace"
          component={AddPlace}
          options={{
            title: "Add a New Place",
          }}
        />
        <Stack.Screen name="Map" component={Map} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
