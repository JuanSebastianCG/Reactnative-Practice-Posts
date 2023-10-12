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

import BasicStylesPage from "../../public_styles/css_public_Styles/Basic_Style";
import { Logo } from "../../public_styles/component_public_Styles/Basic_Coponents_F";

function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <Stack spacing={4} style={styles.container}>
      <Logo styleLogo = {styles.logoContainer}/>
      <Text style={styles.text_tittle}>Welcome to Apis </Text>

      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate("IndexTabbar");
        }}>
        <View style={styles.buttonContainer}>
          <MaterialCommunityIcons
            name="arrow-right-circle"
            color={BasicStylesPage.color1}
            size={150}
          />
        </View>
      </TouchableWithoutFeedback>

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
});

export default WelcomeScreen;
