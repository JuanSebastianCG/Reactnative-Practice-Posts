import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import BasicStylesPage from "../../public/cssStyles/Basic_Style";
import { CustomButton } from "../../public/customComponent/Basic_Components";


export function MediaPickerComponent({ onComplete = () => {} }) {
  const [mediaData, setMediaData] = useState(null);

  const pickMedia = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    let data = null;

    if (!result.canceled) {
      const localUri = result.assets[0].uri;
      const filename = localUri.split("/").pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `${result.assets[0].type}/${match[1]}` : result.assets[0].type;
      data = {
        uri: localUri,
        name: filename,
        type,
      };
    }

    setMediaData(data);
    onComplete(data);
  };

  const BasicViewPicker = ({ buttonStyle, positionStyle }) => (
    <View style={positionStyle}>
      <CustomButton
        text="Seleccionar Archivo"
        onPress={pickMedia}
        buttonStyle={buttonStyle}
      />
    </View>
  );

  const BasicIconMediaPicker = ({ buttonStyle }) => (
    <View style={buttonStyle}>
      <TouchableOpacity onPress={pickMedia}>
        <Icon name="file" size={55} color={BasicStylesPage.color0} />
      </TouchableOpacity>
    </View>
  );

  return {
    mediaData,
    BasicViewPicker,
    BasicIconMediaPicker,
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
