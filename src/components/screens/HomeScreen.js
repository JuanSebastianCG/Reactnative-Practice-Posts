import React from "react";
import { Stack, Text } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import { Polygon, Svg } from "react-native-svg";
import { StyleSheet } from "react-native";
import BasicStylesPage from "../../public_styles/css_public_Styles/Basic_Style";
import { CustomButton, Logo } from "../../public_styles/component_public_Styles/Basic_Coponents_F";


function HomeScreen() {
  const navigation = useNavigation();

  const goToRegister = () => navigation.navigate("RegisterScreen");
  const goToLogin = () => navigation.navigate("LoginScreen");
  const goToWelcome = () => navigation.navigate("LoginScreen");

  return (
    <Stack spacing={4} style={styles.container}>
      <Logo/>
      <Text style={styles.text_tittle}>Que Quieres Hacer?   ... </Text>

      <CustomButton
        text="Registrarse"
        onPress={goToRegister}
        buttonStyle={styles.buttonContainer}
      />
      <CustomButton
        text="Login"
        onPress={goToLogin}
        buttonStyle={[styles.buttonContainer, { paddingLeft: 32,paddingRight: 32, }]}       
      />
      <CustomButton
        text="Ver api"
        buttonStyle={[styles.buttonContainer, { paddingLeft: 26,paddingRight: 26, }]}
      />

      <Svg height="230" width="400" style={styles.footer}>
        <Polygon points="0,0 400,200 0,250" fill={BasicStylesPage.color0} />
      </Svg>
      <Svg height="230" width="400" style={styles.footer}>
        <Polygon points="0,60 190,200 0,200" fill={BasicStylesPage.color2} />
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
    fontSize: 52,
    fontWeight: BasicStylesPage.fontWeightTitle,
    fontFamily: BasicStylesPage.fontText,
    marginTop: "5%",
    marginLeft: "25%",
    marginRight: "18%",
  },

  buttonContainer: {
    marginBottom: "3%",
  },

});

export default HomeScreen;
