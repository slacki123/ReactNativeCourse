import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useIsFocused } from "@react-navigation/native";
import PlacesList from "../components/Places/PlacesList";
import { RootStackParamList } from "../App";
import Place from "../models/place";
import { fetchPlaces } from "../util/database";

type AllPlacesScreenProps = NativeStackScreenProps<RootStackParamList, "AllPlaces">;

function AllPlaces({ route }: AllPlacesScreenProps) {
  const [loadedPlaces, setLoadedPlaces] = useState<Array<Place>>([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadPlaces() {
      console.log("Fetching all places...")
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    }

    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);

  return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;
