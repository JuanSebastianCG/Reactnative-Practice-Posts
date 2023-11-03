import { Camera, CameraType } from 'expo-camera';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useState, useRef  } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View , Image} from 'react-native'; 
import { Card } from 'react-native-paper'; 
import * as MediaLibrary from 'expo-media-library';


export default function App() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [isTakingPicture, setIsTakingPicture] = useState(false);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const cameraRef = useRef(null);
  const [capturedImageUri, setCapturedImageUri] = useState(null);

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
        setCapturedImageUri(uri);
        console.log(uri)
      } catch (error) {
        console.error('Error al tomar la foto:', error);
      } finally {
        setIsTakingPicture(false);
      }
    }
  }

  if (capturedImageUri) {
    let sharePic = () => {
      shareAsync(capturedImageUri).then(() => {
        setCapturedImageUri(undefined);
      });
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(capturedImageUri).then(() => {
        setCapturedImageUri(undefined);
      });
    };

    return (
        <View style={styles.cardContainer}>
            <View style={styles.centeredCard}>
                <Card style={styles.card}>
                    <Card.Cover source={{ uri: capturedImageUri }} />
                </Card>
        </View>
        <Button title="Discard" onPress={() => setCapturedImageUri(undefined)} />
        <Button title="Save" /* onPress={savePhoto} */ /> 
        </View>
/*         <View style={styles.cardContainer}>
        <Card>
          <Card.Cover source={{ uri: capturedImageUri }} /> 
        </Card>
        <Button title="Discard" onPress={() => setCapturedImageUri(undefined)} />
      </View> */

/*       <SafeAreaView style={styles.container}>
        
        <Image style={styles.preview} source={{ uri: capturedImageUri }} />
         <Button title="Share" onPress={sharePic} />
        {hasMediaLibraryPermission ? <Button title="Save" onPress={savePhoto} /> : undefined} 
        <Button title="Discard" onPress={() => setCapturedImageUri(undefined)} /> 
      </SafeAreaView> */
    );
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
          <Text style={styles.text}>Flip Camera</Text> 
          {/*  <Icon name="camera-flip"  style={width: 30px } />  */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={takePicture}>
          {<Text style={styles.text}>Take Picture</Text>}
          {/* <Icon name="camera" />  */}
        </TouchableOpacity>
      </View>
    </Camera>
{/*     <View style={styles.imageContainer}>
          <Image source={{ uri: capturedImageUri }} style={styles.image}  />
        </View> */}
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
  preview: {
    alignSelf: 'stretch',
    flex: 1
  },
  cardContainer: {
    alignItems: 'center', 
    marginTop: 100,
  },
  centeredCard: {
    alignItems: 'center', 
  },
  card: {
    width: 200, 
    height: 200, 
  },
});
