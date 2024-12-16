import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { LatLng, MapPressEvent, Marker, Region } from "react-native-maps";
import { RootStackParamList } from "../App";
import IconButton from "../components/UI/IconButton";

type MapScreenProps = NativeStackScreenProps<RootStackParamList, "Map">;

function Map({ navigation, route }: MapScreenProps) {
  const initialLocation: LatLng | undefined =
    route.params?.initialLat !== undefined && route.params?.initialLng !== undefined
      ? { latitude: route.params.initialLat, longitude: route.params.initialLng }
      : undefined;

  const [selectedLocation, setSelectedLocation] = useState<LatLng | undefined>(initialLocation);

  const region: Region = {
    latitude: initialLocation?.latitude || 37.78825, // Default latitude
    longitude: initialLocation?.longitude || -122.4324, // Default longitude
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function selectLocationHandler(event: MapPressEvent) {
    if(initialLocation){
      return
    }
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({
      latitude: lat,
      longitude: lng,
    });
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert("No location picked.", "Pick a location by tapping on the map first.");
      return;
    }

    navigation.navigate("AddPlace", {
      pickedLat: selectedLocation.latitude,
      pickedLng: selectedLocation.longitude,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if (initialLocation) {
      return;
    }

    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton icon="save" size={24} color={tintColor} onPress={savePickedLocationHandler} />
      ),
    });
  }, [navigation, savePickedLocationHandler, initialLocation]);

  return (
    <MapView style={styles.map} initialRegion={region} onPress={selectLocationHandler}>
      {selectedLocation && <Marker coordinate={selectedLocation} />}
    </MapView>
  );
}

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
