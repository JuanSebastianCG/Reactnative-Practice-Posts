import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";

import { CustomButton } from "./Basic_Components_F";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export function ImagePickerComponent({ onComplete = () => {} }) {
  const [imageData, setImageData] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImageData(result.assets[0]);
    }
    onComplete(result.assets[0]);
  };

  const BasicViewPicker = () => (
    <View>
      <CustomButton text="Seleccionar Imagen" onPress={pickImage} />
    </View>
  );

  const BasicIconImagePicker = () => (
    <View>
      <TouchableOpacity onPress={pickImage}>
        <Icon name="image-edit" size={55} />
      </TouchableOpacity>
    </View>
  );

  return {
    imageData,
    BasicViewPicker,
    BasicIconImagePicker,
  };
}

export function ImagePhotoPickerComponent({onComplete = () => {}}) {
  const [imageDataPhoto, setImageDataPhoto] = useState(null);

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImageDataPhoto(result.assets[0]);
      onComplete(result.assets[0]);
    }
  };

  const BasicViewPhoto = () => (
    <View>
      <CustomButton text="Seleccionar Imagen" onPress={takePhoto} />
    </View>
  );

  const BasicIconImagePhoto = () => (
    <View>
      <TouchableOpacity onPress={takePhoto}>
        <Icon name="camera-plus" size={55} />
      </TouchableOpacity>
    </View>
  );

  return {
    imageDataPhoto,
    BasicViewPhoto,
    BasicIconImagePhoto,
  };
}
