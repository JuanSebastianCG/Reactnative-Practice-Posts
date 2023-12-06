import React, { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Svg, Polygon, Circle } from "react-native-svg";
import { StyleSheet, Platform } from "react-native";
import BasicStylesPage from "../../public/cssStyles/Basic_Style";
import { CustomButton } from "../../public/customComponent/Basic_Components";
import {
  CustomLogo,
  CustomLogoutButton,
} from "../../public/customComponent/Basic_PageInterface";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { useAuth } from "../../utils/authManager";

function HomeScreen() {
  const navigation = useNavigation();

  const goToRegister = () => navigation.navigate("RegisterScreen");
  const goToLogin = () => navigation.navigate("LoginScreen");
  const goToShowPosts = () => navigation.navigate("ShowPostsScreen");



  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsHorizontalScrollIndicator={false}>
      <Svg height={230} width={400} style={styles.footer}>
        <Polygon points="0,0 500,300 0,250" fill={BasicStylesPage.color0} />
      </Svg>
      <Svg height={230} width={400} style={styles.footer}>
        <Polygon points="0,60 190,200 0,200" fill={BasicStylesPage.color2} />
      </Svg> 

      <Svg
        width="400"
        height="500"
        style={{ position: "absolute", top: -70, right: -138 }}>
        <Circle cx="200" cy="160" r="190" fill={BasicStylesPage.color2 + 99} />
      </Svg>
      <Svg
        width="400"
        height="500"
        style={{ position: "absolute", top: -80, right: -130 }}>
        <Circle cx="200" cy="160" r="100" fill={BasicStylesPage.color3} />
      </Svg>

      <CustomLogo styleLogo={{ right: 15 ,top: 20}}  />

      {/* <Text style={styles.text_tittle}>¿Que Quieres Hacer?</Text> */}

      <CustomButton
        text="Registrarme"
        onPress={goToRegister}
        buttonStyle={styles.buttonContainer}
      />
      <CustomButton
        text="Loguearme"
        onPress={goToLogin}
        buttonStyle={[
          styles.buttonContainer,
          { paddingHorizontal: 18, },
        ]}
      />

      <CustomButton
        text="Ver Posts"
        onPress={goToShowPosts}
        buttonStyle={[
          styles.buttonContainer,
          {paddingHorizontal: 20},
        ]}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    marginBottom: 10,
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
