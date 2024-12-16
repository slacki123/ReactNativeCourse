import React, { useState } from "react";
import { Alert, Button, Image, View, Text, StyleSheet } from "react-native";
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from "expo-image-picker";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";

type ImagePickerProps = {
  onTakenImage: (imageUri: string) => void; // Function that takes no arguments and returns nothing
}

function ImagePicker({onTakenImage} : ImagePickerProps ) {
  // permission state?
  const [cameraPermissionInfo, requestPermission] = useCameraPermissions();
  const [imagePreviewPath, setImagePreviewPath] = useState<string>('');

  async function verifyPermissions(): Promise<boolean> { 
    if (cameraPermissionInfo?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionInfo?.status === PermissionStatus.DENIED) {
      Alert.alert("Insufficient Permissions", "You need to grant camera permissions to use this app.");
      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    console.log("Takig pic");
    const hasPermission = await verifyPermissions();
    if(!hasPermission){
      console.log("No permission");
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    });

    if (!image.canceled) {
      setImagePreviewPath(image.assets[0].uri); 
      onTakenImage(image.assets[0].uri);
    }
  }

  let imagePreview = <Text>No image taken yet.</Text>
  if (imagePreviewPath){
    imagePreview = <Image style={styles.image} source={{uri: imagePreviewPath }} />

  }

  return (
    <View>
      <View style={styles.imagePreview}>
        {imagePreview}
      </View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>Take Image</OutlinedButton>
    </View>
  )
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  }
});