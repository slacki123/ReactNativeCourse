import { LatLng } from "react-native-maps";

class Place {
  id: string;

  constructor(
    public title: string,
    public imageUri: string,
    public address: string,
    public location: LatLng
  ) {
    this.id = new Date().toISOString() + Math.random().toString();
  }
}

export default Place;
