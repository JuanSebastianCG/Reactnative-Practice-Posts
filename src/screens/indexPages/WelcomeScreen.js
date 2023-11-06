import React from "react";
import {
  View,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import Svg, { Polygon } from "react-native-svg";
import { Text, Stack } from "@react-native-material/core";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import BasicStylesPage from "../../public/cssStyles/Basic_Style";
import { CustomLogo } from "../../public/customComponent/Basic_PageInterface";
import AnimatedTriangleRain from "../../public/animations/AnimatedTriangleRain";

function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <Stack spacing={4} style={styles.container}>
      <CustomLogo width={220} height={320} styleLogo={styles.logoContainer} />

      <View style={{marginTop: "75%"}}>
        <Text style={styles.text_tittle}>Welcome to Apis </Text>

        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate("IndexTabbar");
          }}>
          <View style={styles.buttonContainer}>
            <MaterialCommunityIcons
              name="arrow-right-circle"
              color={BasicStylesPage.color1}
              size={170}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>

      <Svg height="200" width="300" style={styles.footer}>
        <Polygon points="0,0 300,200 0,200" fill={BasicStylesPage.color1} />
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
    color: BasicStylesPage.color1,
    fontWeight: BasicStylesPage.fontWeightTitle,
    fontFamily: BasicStylesPage.fontText,
    fontSize: 52,
    textAlign: "center",
    marginTop: "5%",
    marginLeft: "10%",
    marginRight: "10%",
  },

  logoContainer: {
    flexDirection: "row",
    right: 78,
    top: 40,
  },

  buttonContainer: {
    alignItems: "center",
    marginTop: "8%",
    zIndex: 2,
  },


});

export default WelcomeScreen;
