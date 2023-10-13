import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet, ScrollView } from "react-native";
import { Stack, TextInput } from "@react-native-material/core";

import { useNavigation } from "@react-navigation/native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { usePostData } from "../../utils/useAxios";
import { Polygon, Svg } from "react-native-svg";
import {
  CustomButton,
  ErrorBanner,
  Logo,
} from "../../public_styles/component_public_Styles/Basic_Coponents_F";
import CustomInTextField from "../../public_styles/component_public_Styles/Basic_FormComponents_F";
import BasicStylesPage from "../../public_styles/css_public_Styles/Basic_Style";

function LoginScreen() {
  const navigation = useNavigation();
  const { postData, loading, error } = usePostData();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (name, value) => {
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const [loginError, setLoginError] = useState(false);

  const handleSubmit = async () => {
    const url = "https://apis-backend-dm.up.railway.app/api/v1/users/login";
    const headers = {
      "Content-Type": "application/json",
    };
    const body = {
      email: userData.email,
      password: userData.password,
    };
    postData(url, headers, body, (data) => {
      if (error || !data) {
        console.log("Error:", error);
        setLoginError(true);
      } else {
        navigation.navigate("HomeScreen");
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Svg height="580" width="700" style={styles.footer}>
          <Polygon points="0,0 600,450 0,250" fill={BasicStylesPage.color2} />
        </Svg>
        <Svg height="340" width="700" style={styles.footer}>
          <Polygon points="0,0 800,280 0,500" fill={BasicStylesPage.color0} />
        </Svg>
        <View>
          <Logo styleLogo={styles.logoContainer} />
        </View>

        <View style={styles.formContainer}>
          {/* Contenedor para el logotipo */}
          <View style={styles.loginLogo}>
            <Icon name="account" size={60} color={BasicStylesPage.color0} />
          </View>

          <View style={styles.fieldContainer}>
            <Stack spacing={16}>
              <CustomInTextField
                label="Email"
                style={styles.input}
                placeholder="Email"
                value={userData.email}
                onChangeText={(text) => handleChange("email", text)}
              />

              <CustomInTextField
                label="Password"
                style={styles.input}
                placeholder="Password"
                value={userData.password}
                onChangeText={(text) => handleChange("password", text)}
              />


            </Stack>
            {loginError && (
                <ErrorBanner
                  text="No se pudo iniciar sesión. Por favor, verifique sus credenciales."
                  styleBanner={styles.errorBanner}
                  onChange={() => setLoginError(false)}
                />
              )}
              <CustomButton
                text="Login"
                onPress={handleSubmit}
                buttonStyle={styles.button}
              />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  errorBanner: {
    marginLeft: '10%',
    marginRight: '10%',
    

  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: BasicStylesPage.color3,
  },
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  fieldContainer: {
    backgroundColor: BasicStylesPage.color3,
    borderRadius: 60,
    width: "85%",
    height: "55%",
    marginBottom: "30%",
    marginTop: 20,
    paddingTop: 40,
    alignItems: "center",
  },
  input: {
    marginBottom: 16,
    width: 190,
  },
  button: {
    padding: 10,
    marginTop: 8,
  },

  logoContainer: {
    position: 'absolute',
    top: 0,      // Alinea el componente en la parte superior
    right: 0,    // Alinea el componente en la esquina derecha
    width: 120,
    height: 120,
  },

  loginLogo: {
    marginTop: 90,
    width: 120,
    height: 120,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: BasicStylesPage.color0,
    alignItems: "center",
    justifyContent: "center",
  },

});

export default LoginScreen;
