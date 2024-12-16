import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import PlaceForm from "../components/Places/PlaceForm";
import Place from "../models/place";
import { RootStackParamList } from "../App"; // Import your param list

type AddPlaceScreenProps = NativeStackScreenProps<RootStackParamList, "AddPlace">;

function AddPlace({ navigation }: AddPlaceScreenProps) {
  function createPlaceHandler(place: Place) {
    navigation.navigate("AllPlaces", { place }); // Correctly typed
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}

export default AddPlace;
