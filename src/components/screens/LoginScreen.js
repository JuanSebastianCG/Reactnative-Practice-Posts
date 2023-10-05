import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import {
  Stack,
  TextInput,
  Button,
  Banner,
  HStack,
} from "@react-native-material/core";

import { useNavigation } from "@react-navigation/native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { usePostData } from "../../utils/useAxios";
import { Polygon, Svg } from "react-native-svg";

function RegisterSwitchScreen() {
  const navigation = useNavigation();
  const { postData, loading, error } = usePostData();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(false);

  const handleChange = (name, value) => {
    setUserData({
      ...userData,
      [name]: value,
    });
  };

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
      <Svg height="580" width="400" style={styles.footer}>
        <Polygon points="0,0 600,450 0,250" fill="#FFDBDB" />
      </Svg>
      <Svg height="340" width="400" style={styles.footer}>
        <Polygon points="0,0 800,280 0,500" fill="#890000" />
      </Svg>


      <View style={styles.formContainer}>
        <View style={styles.logoContainer}>
          <Icon name="account" size={60} color="#890000" />
        </View>
        <View style={styles.fieldContainer}>
          <Stack spacing={16} >
            <TextInput
              label="Email"
              color="#FFDBDB"
              variant="outlined"
              style={styles.input}
              placeholder="Email"
              value={userData.email}
              onChangeText={(text) => handleChange("email", text)}
            />

            <TextInput
              label="Password"
              color="#FFDBDB"
              variant="outlined"
              style={styles.input}
              placeholder="Password"
              value={userData.password}
              secureTextEntry
              onChangeText={(text) => handleChange("password", text)}
            />

            {loginError && (
              <Banner
                text="No se pudo iniciar sesión. Por favor, verifique sus credenciales."
                textStyle={{ color: "#ff8282", fontSize: 16, fontWeight: "bold" }}
                // Fondo rojizo tenue
                buttons={
                  <HStack
                    spacing={2}
                    justifyContent="center"
                    style={{ marginBottom: 20 }}
                  >
                    <Button
                      style={{
                        color: "#FF0000", // Cambia el color del botón a rojo
                        position: "absolute",
                        marginTop: 10,
                      }}
                      key="fix-it"
                      variant="text"
                      title="OK"
                      compact
                      titleStyle={{ color: "#ff8282" }}
                      onPress={() => setLoginError(false)}
                    />
                  </HStack>
                }
              />
            )}

            <Button
              title="Iniciar Sesión"
              onPress={handleSubmit}
              style={styles.button}
            />
          </Stack>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    width: "80%",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  fieldContainer: {
    backgroundColor: "#FFFF", // Color de fondo del campo
    borderRadius: 60, // Redondear las esquinas del campo
    paddingTop: 70,
    paddingLeft: 130,
    paddingRight: 130,
    paddingBottom: 70, 
    zIndex: 1, // Hacer que el formulario esté en la parte superior
  },

  input: {
    marginBottom: 16,
    width: "300%",
    marginLeft: "-90%",

  },
  button: {
    borderColor : "#FFDBDB",
    backgroundColor: "#830000",
    padding: 10,
    marginTop: "101%",
    width: "190%",
    marginLeft: "-35%",
    
  },
});

export default RegisterSwitchScreen;
