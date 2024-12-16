import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useIsFocused } from "@react-navigation/native";
import PlacesList from "../components/Places/PlacesList";
import { RootStackParamList } from "../App";
import Place from "../models/place";

type AllPlacesScreenProps = NativeStackScreenProps<RootStackParamList, "AllPlaces">;

function AllPlaces({ route }: AllPlacesScreenProps) {
  const [loadedPlaces, setLoadedPlaces] = useState<Array<Place>>([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      setLoadedPlaces((currPlaces) => [...currPlaces, route.params.place]);
    }
  }, [isFocused, route]);

  return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;
