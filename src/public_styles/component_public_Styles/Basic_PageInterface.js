import React from "react";
import { TouchableOpacity, StyleSheet, Image, View } from "react-native"; // Importa View para crear bordes redondeados
import BasicStylesPage from "../css_public_Styles/Basic_Style";
import { useNavigation } from "@react-navigation/native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";


import { TokenUserManager } from "../../utils/asyncStorage";
import { useAuth } from "../../utils/authManager";

export const CustomLogo = (styleLogo) => {
  const navigation = useNavigation();

  const primaryStyle =
    styleLogo["styleLogo"] != undefined
      ? styleLogo["styleLogo"]
      : styles.logoContainer;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("WelcomeScreen")}
      style={primaryStyle}>
      <Image source={require("../../img/logo.png")} style={styles.logo} />
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
    width: 80,
    height: 80,
    marginRight: "30%",
    marginLeft: "2%",
    marginTop: "5%",
    resizeMode: "contain", // Ajusta el modo de redimensionamiento según tus necesidades
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
});
