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
    data = null;
    if (!result.canceled) {
      const localUri = result.assets[0].uri;
      const filename = localUri.split("/").pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;
      data = {
        uri: localUri,
        name: filename,
        type,
      };
    }
    setImageData(data);
    onComplete(data);
  };

  const BasicViewPicker = ({ buttonStyle, positionStyle }) => (
    <View style={positionStyle}>
      <CustomButton
        text="Seleccionar Imagen"
        onPress={pickImage}
        buttonStyle={buttonStyle}
      />
    </View>
  );

  const BasicIconImagePicker = ({ buttonStyle }) => (
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

export function ImagePhotoPickerComponent({ onComplete = () => {} }) {
  const [imageDataPhoto, setImageDataPhoto] = useState(null);

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    data = null;
    if (!result.canceled) {
      const localUri = result.assets[0].uri;
      const filename = localUri.split("/").pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;
      data = {
        uri: localUri,
        name: filename,
        type,
      };
    }
    setImageDataPhoto(data);
    onComplete(data);
  };

  const BasicViewPhoto = ({ buttonStyle, positionStyle }) => (
    <View style={positionStyle}>
      <CustomButton
        text="Seleccionar Imagen"
        onPress={takePhoto}
        buttonStyle={positionStyle}
      />
    </View>
  );

  const BasicIconImagePhoto = ({ buttonStyle }) => (
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
