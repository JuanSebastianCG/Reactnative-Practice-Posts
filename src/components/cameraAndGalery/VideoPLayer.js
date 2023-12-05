import * as React from "react";
import { View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { Video, ResizeMode } from "expo-av";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import BasicStylesPage from "../../public/cssStyles/Basic_Style";


export default function VideoPlayer({uri_Video="https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",focus=true}) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: uri_Video,
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }>

          <Icon
            name={status.isPlaying ? "pause" : "play"}
            size={70}
            color={BasicStylesPage.color0}
          />
          
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  video: {
    flex: 1,
  },
  buttons: {
    position: "absolute",
    /* center */
    alignItems: "center",
    justifyContent: "center",
    /* bottom */
    bottom: "5%",
    left: "1%",
  },
});
