import React from "react";
import { TouchableOpacity, StyleSheet, Image, View } from "react-native"; // Importa View para crear bordes redondeados
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { TokenUserManager } from "../../utils/asyncStorage";
import { useAuth } from "../../utils/authManager";
import { Polygon, Svg } from "react-native-svg";

import BasicStylesPage from "../cssStyles/Basic_Style";
import { Text } from "react-native";

export const CustomLogo = ({ styleLogo, width = 110, height = 150 }) => {
  const navigation = useNavigation();

  //0,150 101,0 200,150
  const points1 = `0,${height / 2} ${width / 2},0 ${(width * 3) / 3},${
    height / 2
  }`;
  // Calcula las coordenadas de los puntos del segundo polígono 0,40 200,40 100,230
  const points2 = `0,${height / 5} ${width},${height / 5} ${width / 2},${
    height - height / 5
  }`;
  return (
    <TouchableOpacity
      style={[
        styleLogo,
        { width: width, height: height, zIndex: 1, position: "absolute"},
      ]}
      onPress={() => navigation.navigate("WelcomeScreen")}>
      <Svg
        height={height}
        width={width}
        style={{ position: "absolute", zIndex: 1 }}>
        <Polygon points={points1} fill={BasicStylesPage.color1} />
      </Svg>
      <Svg
        height={height}
        width={width}
        style={{ position: "absolute", zIndex: 2 }}>
        <Polygon points={points2} fill={BasicStylesPage.color2} />
      </Svg>
    </TouchableOpacity>
  );
};

export const CustomLogOutInButton = ({onPress = () => {}}) => {
  const { deleteToken } = TokenUserManager();
  const navigation = useNavigation();

  const { logged, handleLoggin } = useAuth();

  useFocusEffect(
    React.useCallback(() => {
      handleLoggin();
    }, [])
  );
  const primaryStyle = styles.logoutContainer;
  const handleLogout = async () => {
    deleteToken();
    navigation.navigate("WelcomeScreen");
  };
  const handleLoIn = async () => {
    navigation.navigate("LoginScreen");
  };

  return (
    
      <TouchableOpacity onPress={() => logged ? (handleLogout(), onPress()) : (handleLoIn(), onPress())}
      style={[primaryStyle,{zIndex: 2}]}>
        <View style={styles.logoLogout}>
          {/* if login */}
          <Icon name={logged ? "logout" : "login"} 
          size={50} color={BasicStylesPage.color0} />
          <Text style={{ color: BasicStylesPage.color0 , marginLeft: (logged ? 0 : 10)
          }}>{logged ? "Logout" : "Login"}</Text>
        </View>
      </TouchableOpacity>
    
  );
};

const styles = StyleSheet.create({
  /* logo */
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
