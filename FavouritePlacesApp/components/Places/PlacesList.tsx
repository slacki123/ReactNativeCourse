import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Place from "../../models/place";
import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type PlacesListProps = {
  places: Array<Place>;
};

function PlacesList({ places }: PlacesListProps) {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  function selectPlaceHandler(id: string) {
    navigation.navigate('PlaceDetails', {
      placeId: id
    });
  }

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }
  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlaceItem place={item} onSelect={selectPlaceHandler} />}
    />
  );
}

export default PlacesList;

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
