import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import PlaceForm from "../components/Places/PlaceForm";
import Place from "../models/place";
import { RootStackParamList } from "../App"; // Import your param list
import { insertPlace } from "../util/database";

type AddPlaceScreenProps = NativeStackScreenProps<RootStackParamList, "AddPlace">;

function AddPlace({ navigation }: AddPlaceScreenProps) {

  async function createPlaceHandler(place: Place) {
    await insertPlace(place); // insert into database
    navigation.navigate("AllPlaces"); // Correctly typed
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}

export default AddPlace;
