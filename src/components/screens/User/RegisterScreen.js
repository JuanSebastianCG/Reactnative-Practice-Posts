import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet, ScrollView, Text } from "react-native";
/* componentes */
import { Stack } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Polygon, Svg } from "react-native-svg";
import {
  CustomButton,
  CustomDropDown,
} from "../../../public_styles/component_public_Styles/Basic_Components_F";
import { CustomLogo } from "../../../public_styles/component_public_Styles/Basic_PageInterface";
import { CustomInTextField } from "../../../public_styles/component_public_Styles/Basic_FormComponents_F";
import BasicStylesPage from "../../../public_styles/css_public_Styles/Basic_Style";
import { CustomErrorBanner } from "../../../public_styles/component_public_Styles/Basic_AlertComponent";

/* utils */
import { TokenUserManager } from "../../../utils/asyncStorage";
import { usePostData } from "../../../utils/useAxios";

function RegisterScreen() {
  const navigation = useNavigation();
  const { saveToken, getToken, deleteToken } = TokenUserManager();
  const { postData, loading, error } = usePostData();

  /* {
    "name": "Juan Pérez",
    "email": "admin",
    "password": "admin",
    "isUnderage": false,
    "acceptTerms": true,
    "typeOfDocument": "DNI",
    "documentNumber": "12345678"
}
 */
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    isUnderage: true,
    acceptTerms: true,
    typeOfDocument: [],
    documentNumber: "",
  });
  const handleChange = (name, value) => {
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const [loginError, setLoginError] = useState(false);

  const handleSubmit = async () => {
    const url = "/users";
    const headers = {
      "Content-Type": "application/json",
    };
    const body = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      isUnderage: userData.isUnderage,
      acceptTerms: userData.acceptTerms,
      typeOfDocument: userData.typeOfDocument,
      documentNumber: userData.documentNumber,
    };
    postData(url, headers, body, (response) => {
      if (error || !response) {
        setLoginError(true);
      } else {
        console.log(response);
        navigation.navigate("LoginScreen");
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
          <CustomLogo styleLogo={styles.logoContainer} />
        </View>

        <View style={styles.formContainer}>
          {/* Contenedor para el logotipo */}
          <View style={styles.loginLogo}>
            <Icon name="account" size={60} color={BasicStylesPage.color0} />
          </View>

          <View style={styles.fieldContainer}>
            <Stack spacing={16}>
              <CustomInTextField
                label="Nombre"
                style={styles.input}
                value={userData.name}
                onChangeText={(text) => handleChange("name", text)}
              />

              <CustomInTextField
                label="Email"
                style={styles.input}
                value={userData.email}
                onChangeText={(text) => handleChange("email", text)}
              />

              <CustomInTextField
                label="Password"
                style={styles.input}
                value={userData.password}
                onChangeText={(text) => handleChange("password", text)}
              />

              <CustomDropDown
                label="Tipo de documento"
                value={userData.typeOfDocument}
                items={[
                  "DNI",
                  "Pasaporte",
                  "Carnet de conducir",
                  "Carnet de identidad",
                ]}
                generalStyle={styles.generalDropDown}
                generalBorderStyle={styles.generalBorderDropDown}
                itemStyle={{}}
                fontInputStyle={{ color: BasicStylesPage.color4 }}
                onItemSlected={(item) => handleChange("typeOfDocument", item)}
                placeholder={"Documento"}
                styleLogo={{
                  BackgroundColor: BasicStylesPage.color2,
                  marginLeft: 2,
                }}
              />

              <CustomInTextField
                label="Número de documento"
                style={styles.input}
                value={userData.documentNumber}
                onChangeText={(text) => handleChange("documentNumber", text)}
              />
            </Stack>
            {loginError && (
              <CustomErrorBanner
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
    marginLeft: "10%",
    marginRight: "10%",
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
    height: "80%",
    marginBottom: "30%",
    marginTop: 20,
    paddingTop: 40,
    alignItems: "center",
  },
  input: {
    marginBottom: 16,
    width: 200,
  },
  button: {
    padding: 10,
    marginTop: 8,
  },

  logoContainer: {
    position: "absolute",
    top: 0, // Alinea el componente en la parte superior
    right: 0, // Alinea el componente en la esquina derecha
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
  inputDropDown: {
    marginBottom: 16,
    width: 190,
  },
  generalDropDown: {
    backgroundColor: BasicStylesPage.color3,
    width: 200,
    height: 50,
    top: 10,
    marginBottom: 16,
  },
  generalBorderDropDown: {
    borderRadius: 30,
    borderWidth: 2,
    borderColor: BasicStylesPage.color0 + 99,
    borderRadius: 30,
  },
});

export default RegisterScreen;
