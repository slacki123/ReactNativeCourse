import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View, Image, Text } from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import { getAddress, getMapPreview } from "../../util/location";
import {
  useNavigation,
  useRoute,
  NavigationProp,
  RouteProp,
  useIsFocused,
} from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { LatLng } from "react-native-maps";

type LocationPickerProps = {
  onLocationPicked: (location: LatLng, address: string) => void; // Function that takes no arguments and returns nothing
}

function LocationPicker({onLocationPicked}: LocationPickerProps) {
  const [pickedLocation, setPickedLocation] = useState<LatLng | null>(null);
  const isFocused = useIsFocused();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "AddPlace">>(); // Setting AddPlac here as it is the parent screen

  const [locationPermissionInformation, requestPermission] = useForegroundPermissions();

  useEffect(() => {
    async function setLocation() {
      if (isFocused && route.params) {
        const mapPickedLocation: LatLng = {
          latitude: route.params.pickedLat,
          longitude: route.params.pickedLng,
        };
        setPickedLocation(mapPickedLocation);
      } else if (!pickedLocation) {
        await getLocationHandler();
      }
    }

    setLocation();
  }, [route, isFocused]);

  useEffect( () => {
    async function handleLocation(){
      if(pickedLocation){
        const address = await getAddress(pickedLocation);
        onLocationPicked(pickedLocation, address);
      }
    }

    handleLocation();

    // because onLocationPicked is a method dependency here, therefore it must be using 'useCallback'
  }, [pickedLocation, onLocationPicked])

  async function verifyPermissions(): Promise<boolean> {
    if (locationPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locationPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant location permissions to use this app."
      );
      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      console.log("No location permission");
      return;
    }

    const location = await getCurrentPositionAsync();
    setPickedLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  }

  function pickOnMapHandler() {
    navigation.navigate("Map");
  }

  let locationPreview = <Text>No Location Picked Yet.</Text>;
  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(pickedLocation.latitude, pickedLocation.longitude),
        }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick On Map
        </OutlinedButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
