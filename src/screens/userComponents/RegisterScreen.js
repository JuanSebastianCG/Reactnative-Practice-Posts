import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
/* componentes */
import { Stack } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Polygon, Svg } from "react-native-svg";
import { CustomButton } from "../../public/customComponent/Basic_Components";
import { CustomLogo } from "../../public/customComponent/Basic_PageInterface";
import {
  CustomButton,
  CustomDropDown,
} from "../../../public_styles/component_public_Styles/Basic_Components_F";
import { CustomLogo } from "../../../public_styles/component_public_Styles/Basic_PageInterface";
import { CustomInTextField } from "../../../public_styles/component_public_Styles/Basic_FormComponents_F";
import BasicStylesPage from "../../../public_styles/css_public_Styles/Basic_Style";
import { CustomErrorBanner } from "../../../public_styles/component_public_Styles/Basic_AlertComponent";
import {
  CustomCheckBox,
  CustomInTextField,
} from "../../public/customComponent/Basic_FormComponents";
import BasicStylesPage from "../../public/cssStyles/Basic_Style";
import {
  CustomErrorBanner,
  CustomTermsAndConditionsAlert,
} from "../../public/customComponent/Basic_AlertComponent";

/* utils */
import { TokenUserManager } from "../../utils/asyncStorage";
import { usePostData } from "../../utils/useAxios";

function RegisterScreen() {
  const navigation = useNavigation();
  const goToPolicy = () => navigation.navigate("PolicyScreen");
  const { saveToken, getToken, deleteToken } = TokenUserManager();
  const { postData, loading, error } = usePostData();
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [termsAndConditionsAlert, setTermsAndConditionsAlert] = useState(false);



  const [userData, setUserData] = useState({
    firstname: "admin",
    lastname: "admin",
    email: "dispositivomoviles9@gmail.com",
    password: "DispMov2023",
    acceptTerms: true,
    active: true,
    avatar: "https://example.com/avatar.jpg",
  });
  const handleChange = (name, value) => {
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  
  const handleCheckboxChange = () => {
    setPolicyAccepted(!policyAccepted);
  };

  const [loginError, setLoginError] = useState(false);
  /* http://mantenimientoandino.co:3000/api/v1/auth/register */
  const handleSubmit = async () => {
    const url = "/auth/register";
    const headers = {
      "Content-Type": "application/json",
    };
    const formData = {
      firstname: userData.firstname,
      lastname: userData.lastname,
      email: userData.email,
      current_password: userData.password,
      role: userData.role,
      active: userData.active,
      avatar: userData.avatar,
    };
    
    postData(url, formData, headers , (response) => {
      console.log(response);
      if (response) {
        navigation.navigate("LoginScreen");
      } else {
        setLoginError(true);
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
                value={userData.firstname}
                onChangeText={(text) => handleChange("firstname", text)}
              />

              <CustomInTextField
                label="Apellido"
                style={styles.input}
                value={userData.lastname}
                onChangeText={(text) => handleChange("lastname", text)}
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
                onChangeText={(text) => handleChange("current_password", text)}
              />

              <CustomCheckBox
                label="he leído y acepto los términos y condiciones"
                style={{ marginTop: 20, marginBottom: 20 }}
                value={userData.acceptTerms}
                onChange={(value) => handleChange("isUnderage", value)}
              />

              <TouchableOpacity
                onPress={() => setTermsAndConditionsAlert(true)}
                style={{ marginBottom: 20 }}>
                <Text style={BasicStylesPage.hrefLinkFontStyles.hrefLink}>
                  Ver términos y condiciones
                </Text>
              </TouchableOpacity>
            </Stack>
            {loginError && (
              <CustomErrorBanner
                text="No se pudo iniciar sesión. Por favor, verifique sus credenciales."
                styleBanner={styles.errorBanner}
                onChange={() => setLoginError(false)}
              />
            )}

          <View style={styles.checkboxContainer}>
            <Checkbox value={policyAccepted} onValueChange={handleCheckboxChange} />
            <Text style={styles.checkboxLabel}>He leído y Acepto la política de privacidad</Text>
          </View>

            <CustomButton
              text="Login"
              onPress={handleSubmit}
              buttonStyle={styles.button}
            />

            <CustomTermsAndConditionsAlert
              isVisible={termsAndConditionsAlert}
              onChange={() => setTermsAndConditionsAlert(false)}
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
