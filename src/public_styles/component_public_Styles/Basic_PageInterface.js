import React from "react";
import { TouchableOpacity, StyleSheet, Image, View } from "react-native"; // Importa View para crear bordes redondeados
import BasicStylesPage from "../css_public_Styles/Basic_Style";
import { useNavigation } from "@react-navigation/native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { TokenUserManager } from "../../utils/asyncStorage";
import { useAuth } from "../../utils/authManager";
import { Polygon, Svg } from "react-native-svg";

export const CustomLogo = ({ styleLogo, width = 140, height = 200 }) => {
  const navigation = useNavigation();

  const primaryStyle =
    styleLogo !== undefined ? styleLogo : styles.logoContainer;

  //0,150 101,0 200,150
  const points1 = `0,${height / 2} ${width / 2},0 ${(width * 3) / 3},${
    height / 2
  }`;

  // Calcula las coordenadas de los puntos del segundo polígono 0,40 200,40 100,230
  const points2 = `0,${height / 5} ${width},${height / 5} ${width / 2},${
    height - height / 5
  }`;
  return (
    <TouchableOpacity style={{ width: width, height: height, position: "absolute", top: 0, right: 0,zIndex:1
    }} onPress={() => navigation.navigate("WelcomeScreen")}>
      
      <Svg
        height={height}
        width={width}
        style={[styles.logoPosition, primaryStyle]}>
        <Polygon points={points1} fill={BasicStylesPage.color1} />
      </Svg>
      <Svg
        height={height}
        width={width}
        style={[styles.logoPosition, primaryStyle]}>
        <Polygon points={points2} fill={BasicStylesPage.color2} />
      </Svg>
    </TouchableOpacity>
  );
};

export const CustomLogoutButton = ({ text, textStyle, buttonStyle }) => {
  const { deleteToken } = TokenUserManager();
  const { logged } = useAuth();
  const navigation = useNavigation();

  //rconst primaryStyle = styleLogo["styleLogo"] != undefined ? styleLogo["styleLogo"] : styles.logoutContainer;
  const primaryStyle = styles.logoutContainer;

  const handleLogout = async () => {
    deleteToken();
    navigation.navigate("WelcomeScreen");
  };
  return (
    logged && ( // Verifica si el usuario está logueado antes de mostrar el botón de logout
      <TouchableOpacity onPress={() => handleLogout()} style={primaryStyle}>
        <View style={styles.logoLogout}>
          <Icon name="logout" size={60} color={BasicStylesPage.color0} />
        </View>
      </TouchableOpacity>
    )
  );
};

const styles = StyleSheet.create({
  /* logo */
  logoContainer: {
    flexDirection: "row",
    right: 0,
    top: 0,
  },
  logo: {
    width: "100%",
    height: "100%",
  },


  logoutContainer: {
    flexDirection: "row",
    height: 70,
    paddingHorizontal: 16,
    borderRadius: 25,
    top: 20,
    position: "absolute",
  },
  logoLogout: {
    width: "100%",
    height: "100%",
  },
  logoPosition: {
    position: "absolute",
    top: 0,
    right: 0,
  },
});
