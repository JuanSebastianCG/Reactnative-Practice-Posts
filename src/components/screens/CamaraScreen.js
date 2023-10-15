import { Camera, CameraType } from 'expo-camera';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useState, useRef  } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'; 


export default function App() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [isTakingPicture, setIsTakingPicture] = useState(false);
  const cameraRef = useRef(null);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  async function takePicture() {
    if (cameraRef.current && !isTakingPicture) {
      try {
        setIsTakingPicture(true);
        const { uri } = await cameraRef.current.takePictureAsync();
        console.log(uri)
      } catch (error) {
        console.error('Error al tomar la foto:', error);
      } finally {
        setIsTakingPicture(false);
      }
    }
  }

  return (
/*     <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View> */

    
    <View style={styles.container}>
    <Camera style={styles.camera} type={type} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
          {/* <Text style={styles.text}>Flip Camera</Text> */}
           <Icon name="camera-flip" /* style={width: 30px } *//> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={takePicture}>
          {<Text style={styles.text}>Take Picture</Text>}
          {/* <Icon name="camera" />  */}
        </TouchableOpacity>
      </View>
    </Camera>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
