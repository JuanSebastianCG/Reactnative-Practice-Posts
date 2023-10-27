import React, { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Svg, Polygon } from "react-native-svg";
import { StyleSheet, Platform } from "react-native";
import BasicStylesPage from "../../public_styles/css_public_Styles/Basic_Style";
import { CustomButton } from "../../public_styles/component_public_Styles/Basic_Components_F";
import {
  CustomLogo,
  CustomLogoutButton,
} from "../../public_styles/component_public_Styles/Basic_PageInterface";

import { TokenUserManager } from "../../utils/asyncStorage";
import { useAuth } from "../../utils/authManager";

function HomeScreen() {
  const navigation = useNavigation();

  const goToRegister = () => navigation.navigate("RegisterScreen");
  const goToLogin = () => navigation.navigate("LoginScreen");
  const goToShowPosts = () => navigation.navigate("ShowPostsScreen");
  const { logged, handleLoggin } = useAuth();

  useFocusEffect(
    React.useCallback(() => {
      handleLoggin();
    }, [])
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      horizontal={false}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <Svg height={230} width={400} style={styles.footer}>
        <Polygon points="0,0 400,200 0,250" fill={BasicStylesPage.color0} />
      </Svg>
      <Svg height={230} width={400} style={styles.footer}>
        <Polygon points="0,60 190,200 0,200" fill={BasicStylesPage.color2} />
      </Svg>

      <CustomLogoutButton />
      <CustomLogo styleLogo={styles.logoContainer} />

      <Text style={styles.text_tittle}>Que Quieres Hacer?</Text>
      <Text style={styles.text_tittlePoint}>...</Text>

      <CustomButton
        text="Registrarse"
        onPress={goToRegister}
        buttonStyle={styles.buttonContainer}
      />
      <CustomButton
        text="Login"
        onPress={goToLogin}
        buttonStyle={[
          styles.buttonContainer,
          { paddingLeft: 32, paddingRight: 32 },
        ]}
      />
      {logged && (
        <CustomButton
          text="Ver api"
          onPress={goToShowPosts}
          buttonStyle={[
            styles.buttonContainer,
            { paddingLeft: 26, paddingRight: 26 },
          ]}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logoContainer: {
    position: "absolute",
    width: 120,
    height: 120,
    right: 0,
    top: 0,
  },
  scrollContent: {
    alignItems: "center",
    paddingBottom: 0, // Adjust this value based on your content height
    height: "100%",
    width: "100%",
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
    paddingLeft: 60,
    paddingRight: 20,
    fontSize: 64,
    fontWeight: BasicStylesPage.fontWeightTitle,
    fontFamily: BasicStylesPage.fontText,
    marginTop: 80,
  },
  text_tittlePoint: {
    color: BasicStylesPage.color1,
    fontSize: 55,
    fontWeight: BasicStylesPage.fontWeightTitle,
    fontFamily: BasicStylesPage.fontText,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default HomeScreen;
