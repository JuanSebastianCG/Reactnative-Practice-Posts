import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image,
  Button,
} from "react-native"; // Importa View para crear bordes redondeados
import BasicStylesPage from "../css_public_Styles/Basic_Style";

import { useNavigation } from "@react-navigation/native";

const tenueColor2Button = BasicStylesPage.color2 + "99";

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
    zIndex: 1,
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

const CustomTag = ({ text, onPress }) => {
  return (
    <View style={stylesTag.tag}>
      <TouchableOpacity style={stylesTag.tagButton} onPress={onPress}>
        <Text style={stylesTag.tagText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const CustomShowMultipleTag = ({ tags }) => {
  return (
    <View style={stylesTag.container}>
      {tags.map((tag) => (
        <CustomTag text={tag} onPress={() => {}} />
      ))}
    </View>
  );
};

const stylesTag = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    marginBottom: 10,
  },
  tag: {
    margin: 5,
    backgroundColor: BasicStylesPage.color4 + 40,
    borderRadius: 10,    
    alignSelf: "flex-start",
  },
  tagButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  tagText: {
    color: BasicStylesPage.color1,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export { CustomButton, CustomTag, CustomShowMultipleTag };
