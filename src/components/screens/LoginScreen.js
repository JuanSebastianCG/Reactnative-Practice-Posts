import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import {
  Stack,
  TextInput,
  Button,
  Badge,
  Text,
  Banner,
  HStack,
} from "@react-native-material/core";

import { useNavigation } from "@react-navigation/native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { usePostData } from "../../utils/useAxios";

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
      if (error || !data  ) {
        console.log("Error:", error);
        setLoginError(true);
      }else{
        navigation.navigate("Home");
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.logoContainer}>
          <Icon name="account" size={60} color="#6200ee" />
        </View>
        <Stack spacing={16} style={styles.form}>
          <TextInput
            label="Email"
            variant="outlined"
            style={styles.input}
            placeholder="Email"
            value={userData.email}
            onChangeText={(text) => handleChange("email", text)}
          />

          <TextInput
            label="Password"
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
                  style={{ marginBottom: 20 }}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  form: {
    width: "100%",
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default RegisterSwitchScreen;
