import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import Svg, { Polygon } from "react-native-svg";
import { Text, Stack, Divider } from "@react-native-material/core";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <Stack spacing={4} style={styles.container}>
      <Image source={require("../../img/logo.png")} style={styles.Image} />
      <Text style={styles.text_tittle}>Welcome to Apis </Text>

      {/* <Divider style={styles.divider } /> */}
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate("IndexTabbar");
        }}>
        <View style={styles.buttonContainer}>
          <MaterialCommunityIcons
            name="arrow-right-circle"
            color="#890000"
            size={150}
          />
        </View>
      </TouchableWithoutFeedback>

      <Svg height="200" width="300" style={styles.footer}>
        <Polygon points="0,0 300,200 0,200" fill="#890000" />
      </Svg>
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  footer: {
    position: Platform.OS === "android" ? "absolute" : "relative",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
  },

  text_tittle: {
    color: "#7A1B1B",
    fontSize: 52,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "5%",
    marginLeft: "10%",
    marginRight: "10%",
  },

  Image: {
    width: 200,
    height: 200,
    marginLeft: "25%",
    marginRight: "25%",
    marginTop: "15%",
  },

  buttonContainer: {
    alignItems: "center",
    marginTop: "13%",
  },
  divider: {
    marginTop: "5%",
    marginLeft: "25%",
    marginRight: "25%",
    height: 10,
    backgroundColor: "#890000",
  },
});

export default WelcomeScreen;
