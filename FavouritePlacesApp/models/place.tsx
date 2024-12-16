import { LatLng } from "react-native-maps";

class Place {
  id: string;

  constructor(
    public title: string,
    public imageUri: string,
    public address: string,
    public location: LatLng,
    id?: string // Optional id
  ) {
    this.id = id || new Date().toISOString() + Math.random().toString();
  }
}

export default Place;
