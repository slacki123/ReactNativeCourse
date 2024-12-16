import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { LatLng, MapPressEvent, Marker, Region} from "react-native-maps";
import { RootStackParamList } from "../App";
import IconButton from "../components/UI/IconButton";

type MapScreenProps = NativeStackScreenProps<RootStackParamList, "Map">;

function Map( {navigation}: MapScreenProps ) {
  const [selectedLocation, setSelectedLocation] = useState<LatLng>({latitude: 37.78, longitude: -122.43});

  const region: Region = {
    latitude: 37.78825, // Default latitude (adjust as needed)
    longitude: -122.4324, // Default longitude (adjust as needed)
    latitudeDelta: 0.0922, // Required delta values for zoom level
    longitudeDelta: 0.0421, // Required delta values for zoom level
  };

  function selectLocationHandler(event: MapPressEvent) {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({
      latitude: lat,
      longitude: lng
    })

  }

  const savePickedLocationHandler = useCallback( () => {
      if(!selectedLocation){
        Alert.alert("No location picked.", "Pick a location by tapping on the map first");
        return;
      }

      navigation.navigate('AddPlace', {pickedLat: selectedLocation.latitude, pickedLng: selectedLocation.longitude});
    }, [navigation, selectedLocation]);

  useLayoutEffect( () => {
    navigation.setOptions({
      headerRight: ({tintColor}) => <IconButton icon="save" size={24} color={tintColor} onPress={savePickedLocationHandler} />
    })
  }, [navigation, savePickedLocationHandler])

  return (
    <MapView style={styles.map} initialRegion={region} onPress={selectLocationHandler}>
      <Marker coordinate={selectedLocation} />
    </MapView>
  )
}

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
});