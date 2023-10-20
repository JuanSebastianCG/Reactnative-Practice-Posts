import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";

import { CustomButton } from "./Basic_Components_F";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import BasicStylesPage from "../css_public_Styles/Basic_Style";

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

  const BasicViewPicker = ({buttonStyle, positionStyle}) => (
    <View style={positionStyle}>
      <CustomButton text="Seleccionar Imagen" onPress={pickImage} buttonStyle={buttonStyle} />
    </View>
  );

  const BasicIconImagePicker = ({buttonStyle}) => (
    <View style={buttonStyle}>
      <TouchableOpacity onPress={pickImage}>
        <Icon name="image-edit" size={55} color={BasicStylesPage.color0} />
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

  const BasicViewPhoto = ({buttonStyle, positionStyle}) => (
    <View style={positionStyle}>
      <CustomButton text="Seleccionar Imagen" onPress={takePhoto} buttonStyle={positionStyle} />
    </View>
  );

  const BasicIconImagePhoto = ({buttonStyle}) => (
    <View style={buttonStyle}>
      <TouchableOpacity onPress={takePhoto}>
        <Icon name="camera-plus" size={55} color={BasicStylesPage.color0} />
      </TouchableOpacity>
    </View>
  );

  return {
    imageDataPhoto,
    BasicViewPhoto,
    BasicIconImagePhoto,
  };
}

styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    backgroundColor: BasicStylesPage.color0,
    alignItems: "center",
    justifyContent: "center",
  },
});
