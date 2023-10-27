import React, { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Svg, Polygon } from "react-native-svg";
import { StyleSheet, Platform } from "react-native";
import BasicStylesPage from "../../public_styles/css_public_Styles/Basic_Style";
import {
  CustomButton,
  CustomLogo,
} from "../../public_styles/component_public_Styles/Basic_Components_F";
import AsyncStorage from "@react-native-async-storage/async-storage";
function HomeScreen() {
  const [userToken, setUserToken] = useState(null);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const goToRegister = () => navigation.navigate("RegisterScreen");
  const goToLogin = () => navigation.navigate("LoginScreen");
  const goToShowPosts = () => navigation.navigate("ShowPostsScreen");

  useEffect(() => {
    if (isFocused) {
      try {
        obtenerToken()
      } catch (error) {
        console.error(error)
      }
    }
    
  }, [isFocused]); 

  const obtenerToken = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      console.log('Token recuperado:', token);
      setUserToken(token)
    } catch (error) {
      console.error('Error al obtener el token desde AsyncStorage:', error);
    }
  };

/*   useEffect(() => {
    // Obten el token de acceso de AsyncStorage y actualiza el estado
    AsyncStorage.getItem("accessToken")
      .then((token) => {
        if (token) {
          setAccessToken(token);
        }
      })
      .catch((error) => {
        console.log("Error al obtener el token de acceso:", error);
      });
  }, []); */

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      horizontal={false}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <Svg height={230} width={400} style={styles.footer}>
        <Polygon points="0,0 400,200 0,250" fill={BasicStylesPage.color0} />
      </Svg>
      <Svg height={230} width={400} style={styles.footer}>
        <Polygon points="0,60 190,200 0,200" fill={BasicStylesPage.color2} />
      </Svg>
  
      <CustomLogo styleLogo={styles.logoContainer} />
  
      <Text style={styles.text_tittle}>Que Quieres Hacer?</Text>
      <Text style={styles.text_tittlePoint}>...</Text>

      {userToken ? (
        <CustomButton
        text="Ver API"
        onPress={goToShowPosts}
        buttonStyle={[
          styles.buttonContainer,
          { paddingLeft: 26, paddingRight: 26 },
        ]}
      />
      ) : (
        
        <View>
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
      </View>
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
    top:0,
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
    fontSize: 4,
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
