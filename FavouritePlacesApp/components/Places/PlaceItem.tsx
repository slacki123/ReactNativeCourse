import { View, Image, Text, Pressable, StyleSheet } from "react-native";
import Place from "../../models/place";
import React from 'react';
import { Colors } from "../../constants/colors";

type PlaceItemProps = {
  place: Place;
  onSelect: (id: string) => void;
};

function PlaceItem({place, onSelect} : PlaceItemProps){
  return (
    <Pressable style={({pressed}) => [styles.item, pressed && styles.pressed]} onPress={() => onSelect(place.id)}>
        <Image style={styles.image} source={{uri: place.imageUri}} />
        <View style={styles.info}>
          <Text style={styles.title}>{place.title}</Text>
          <Text style={styles.address}>{place.address}</Text>
        </View>
    </Pressable>

  )
}

export default PlaceItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1},
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.9
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 100
  },
  info: {
    flex: 2, // this is twice as big as the image
    padding: 12
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.gray700
  },
  address: {
    fontWeight: 'bold',
    fontSize: 12,
    color: Colors.gray700
  }
});