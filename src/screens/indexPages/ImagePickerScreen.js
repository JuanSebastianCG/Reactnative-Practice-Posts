import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ImageManipulator } from 'expo';

 function ImagePickerExample() {
    const [avatarBase64, setAvatarBase64] = useState(null);
  const [image, setImage] = useState(null);

/*   const pickImage = async () => {
    // No permissions request is necessary for launching the image library

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.assets[0].uri);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }; */

  const pickImage = async () => {
    try {
      const resultPermission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (resultPermission.granted === false) {
        Alert.alert("Permisos requeridos", "Se requiere acceder a la galería");
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) {
        console.log(result.assets[0].uri)
        const  uri  = result.assets[0].uri; // Accede a la propiedad 'uri' de 'result' utilizando desestructuración
        
        console.log(uri)
        const imageBase64 = await ImageManipulator.toBase64(uri);
        setAvatarBase64(imageBase64);
        setEditPostData({ ...editPostData, avatar: imageBase64 });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const ViewPicker = () => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );


  return (
 /*    imageUri: result,
    ViewPicker */
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Button title="Pick an image from camera roll" onPress={pickImage} />
    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>

  )
}

export default ImagePickerExample;
