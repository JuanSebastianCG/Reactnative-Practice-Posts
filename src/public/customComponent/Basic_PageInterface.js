import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native"; // Importa View para crear bordes redondeados
import { useNavigation } from "@react-navigation/native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { TokenUserManager } from "../../utils/asyncStorage";
import { useAuth } from "../../utils/authManager";
import { UserNotification } from "../../Services/ApiServices/UserNotification";

import { Polygon, Svg } from "react-native-svg";

import BasicStylesPage from "../cssStyles/Basic_Style";
import { Text } from "react-native";

export const CustomLogo = ({ styleLogo, width = 110, height = 150 ,Color1Logo = BasicStylesPage.color1, Color2Logo = BasicStylesPage.color2}) => {
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
        { width: width, height: height, zIndex: 1, position: "absolute" },
      ]}
      onPress={() => navigation.navigate("WelcomeScreen")}>
      <Svg
        height={height}
        width={width}
        style={{ position: "absolute", zIndex: 1 }}>
        <Polygon points={points1} fill={Color1Logo  } />
      </Svg>
      <Svg
        height={height}
        width={width}
        style={{ position: "absolute", zIndex: 2 }}>
        <Polygon points={points2} fill={Color2Logo } />
      </Svg>
    </TouchableOpacity>
  );
};

export const CustomLogOutInButton = ({ onPress = () => {}, style }) => {
  const { deleteToken } = TokenUserManager();
  const navigation = useNavigation();
  const { logged ,handleLoggin } = useAuth();

  const primaryStyle = style;
  const handleLogout = async () => {
    deleteToken();
    handleLoggin();
    navigation.navigate("WelcomeScreen");
  };
  const handleLoIn = async () => {
    navigation.navigate("LoginScreen");
  };

  return (
    <TouchableOpacity
      onPress={() =>
        logged ? (handleLogout(), onPress()) : (handleLoIn(), onPress())
      }
      style={[primaryStyle, { zIndex: 2 }]}>
      <View style={styles.logoLogout}>
        {/* if login */}
        <Icon
          name={logged ? "logout" : "login"}
          size={50}
          color={BasicStylesPage.color0}
        />
        <Text
          style={{
            color: BasicStylesPage.color0,
            marginLeft: logged ? 0 : 10,
          }}>
          {logged ? "Logout" : "Login"}
        </Text>
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

export const BellUserNotification = ({ style, onPress }) => {
  const { fetchUnreadNotification } = UserNotification();
  const [hasUnreadNotification, setHasUnreadNotification] = useState(0);
  const { logged } = useAuth();
  useEffect(() => {
    const fetch = async () => {
      setHasUnreadNotification(await fetchUnreadNotification());
    };
    if (logged) fetch();
  }, []);
  return (
    <TouchableOpacity
      
      style={{
        position: "absolute",
        top: -30,
        right: -40,
        borderRadius: 50,
        padding: 10,
        borderWidth: 3,
        backgroundColor: BasicStylesPage.color3 + 99,
        borderColor: BasicStylesPage.color4,
      }}
      onPress={() => {onPress();}}>
      
      <View>
        <Icon name="bell" size={50} color={BasicStylesPage.color0} />
      </View>

      {hasUnreadNotification > 0 && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: -10,
            backgroundColor: BasicStylesPage.color0,
            borderRadius: 50,
            width: 30,
            height: 30,
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Text
            style={{
              color: BasicStylesPage.color3,
              fontSize: 13,
              fontWeight: "bold",
            }}>
            {hasUnreadNotification}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
