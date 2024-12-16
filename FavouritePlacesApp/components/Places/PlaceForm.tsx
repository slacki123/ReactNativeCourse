import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput } from "react-native";
import { Colors } from '../../constants/colors';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Button from '../UI/Button';
import { LatLng } from 'react-native-maps';
import Place from '../../models/place';

type PlaceFormProps = {
  onCreatePlace: (place: Place) => void; // Function that takes no arguments and returns nothing
}

function PlaceForm({onCreatePlace}: PlaceFormProps) {
  const [enteredTitle, setEnteredTitle] = useState<string>('');
  const [pickedLocation, setPickedLocation] = useState<LatLng>({latitude: 0.0, longitude: 0.0});
  const [pickedAddress, setPickedAddress] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>('');

  function changeTitleHandler(enteredText: string) {
    setEnteredTitle(enteredText);
  }

  function imageTakenHandler(imageUri: string) {
    setSelectedImage(imageUri);
  }

  const pickLocationHandler = useCallback( (location: LatLng, address: string) => {
    setPickedLocation(location);
    setPickedAddress(address);
  }, []);

  function savePlaceHandler() {
    const placeData = new Place(
      enteredTitle,
      selectedImage,
      pickedAddress,
      pickedLocation
    );

    onCreatePlace(placeData)
  }



  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredTitle} />
      </View>
      <ImagePicker onTakenImage={imageTakenHandler} />
      <LocationPicker onLocationPicked={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  )
}

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary500
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100
  }
})