import React, { useState } from 'react';
import { View,StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { CustomButton } from "./Basic_Components_F";

export default function ImagePickerComponent() {
  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const BasicViewPicker = () => (
    <View>
      <CustomButton
        text="Seleccionar Imagen"
        onPress={pickImage}
      />
    </View>
  );

  return {
    imageUri,
    BasicViewPicker,
  };
}

const styles = StyleSheet.create({


});



