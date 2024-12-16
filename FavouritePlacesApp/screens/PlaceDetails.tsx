import { ScrollView, Image, View, Text, StyleSheet } from 'react-native';
import OutlinedButton from '../components/UI/OutlinedButton';
import React, { useEffect, useState } from 'react';
import { Colors } from '../constants/colors';
import { fetchPlaceDetails } from '../util/database';
import Place from '../models/place';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type PlaceDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "PlaceDetails"
>;

function PlaceDetails({ route, navigation }: PlaceDetailsScreenProps) {
  const [fetchedPlace, setFetchedPlace] = useState<Place>();

  function showOnMapHandler() {
    console.log("fetched", fetchedPlace)
    navigation.navigate('Map', {
      initialLat: fetchedPlace?.location.latitude,
      initialLng: fetchedPlace?.location.longitude
    });
  }

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    // useselectedPlaceId to fetch data for a single place
    async function loadPlaceData() {
      console.log("Fetching place with id", selectedPlaceId)
      const selectedPlace = await fetchPlaceDetails(selectedPlaceId);
      setFetchedPlace(selectedPlace);
      navigation.setOptions({
        title: selectedPlace.title,
      })
    }

    loadPlaceData();
  }, [selectedPlaceId]);

  if(!fetchedPlace){
    return (
      <View style={styles.fallback}>
        <Text>Loading place data...</Text>
      </View>
    )
  }

  return <ScrollView>
    <Image style={styles.image} source={{uri: fetchedPlace.imageUri}}/>
    <View style={styles.locationContainer}>
      <View style={styles.addressContainer}>
        <Text style={styles.address}>{fetchedPlace.address}</Text>
      </View>
      <OutlinedButton icon="map" onPress={showOnMapHandler}>View on Map</OutlinedButton>
    </View>
  </ScrollView>
}

export default PlaceDetails;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%'
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  addressContainer: {
    padding: 20
  },
  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  }
})