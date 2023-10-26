import React from "react";
import { TouchableOpacity, Text, StyleSheet, View, Image,  Button } from "react-native"; // Importa View para crear bordes redondeados
import BasicStylesPage from "../css_public_Styles/Basic_Style";

import { useNavigation } from "@react-navigation/native";

const tenueColor2Button = BasicStylesPage.color2 + "80";

const CustomButton = ({ onPress, text, textStyle, buttonStyle }) => {
  return (
    <TouchableOpacity
      style={[styles.button]}
      onPress={onPress}
      activeOpacity={0.7} // Agrega una mejor animación al tocar
    >
      <View style={[styles.buttonContainer, buttonStyle]}>
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};


const CustomLogo = (styleLogo) => {
  const navigation = useNavigation();
  
  const primaryStyle = ( styleLogo["styleLogo"] != undefined) ? styleLogo["styleLogo"] : styles.logoContainer;
  return (
      <TouchableOpacity onPress={() => navigation.navigate("WelcomeScreen")}  style={primaryStyle}>
        <Image source={require("../../img/logo.png")} style={styles.logo} />
      </TouchableOpacity>
    
  );
};

const CustomErrorBanner = ({ text, styleBanner, buttons, onChange }) => {

  return (
    <View style={[styles.errorBanner,styleBanner]}>
      <Text style={[styles.errorText]}>{text}</Text>
      {buttons}
      <TouchableOpacity onPress={onChange} style={[styles.errorButtonStyle]}>
        <Text style={[styles.errorText]}>OK</Text>
      </TouchableOpacity>

    </View>
  );
};






const styles = StyleSheet.create({

  /* button */
  button: {
    borderRadius: 10, // Bordes redondeados
    overflow: "hidden", // Asegura que los bordes redondeados sean respetados
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    padding: 10,
    backgroundColor: tenueColor2Button,
    borderRadius: 50, // Bordes redondeados dentro del botón
  },
  /* text normal */
  text: {
    fontSize: BasicStylesPage.sizeFontButton,
    fontWeight: BasicStylesPage.fontWeightTitle,
    color: BasicStylesPage.color0,
    paddingTop: 10,
    paddingBottom: 11,
    paddingLeft: 19,
    paddingRight: 19,
  },
  /* logo */
  logoContainer: {
    width: 80,
    height: 80,
    marginRight: "30%",
    marginLeft: "2%",
    marginTop: "5%",
    resizeMode: 'contain', // Ajusta el modo de redimensionamiento según tus necesidades

  },
  logo: {
    width: "100%",
    height: "100%",
  },
  /* banner */
  errorBanner: {
    borderWidth: 1,
    borderColor: BasicStylesPage.colorWarning1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,

  },
  errorText: {
    color: BasicStylesPage.colorWarning1,
    fontSize: 16,
    fontWeight: "bold",
    zIndex : 1,

  },
  errorButtonStyle: {
    
    
    paddingLeft: -10,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: BasicStylesPage.colorWarning1,
    borderRadius: 50,


    height: 45,
    borderRadius: 60,
    marginTop: 10,
      
  },
});



export { CustomButton, CustomLogo , CustomErrorBanner};
