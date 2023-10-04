import React from "react";
import { Stack, Text } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import { Polygon, Svg } from "react-native-svg";
import { StyleSheet, Image, TouchableOpacity } from "react-native";

function HomeScreen() {
  const navigation = useNavigation();

  //const goToCategories = () => navigation.navigate("Categories");
  const goToRegister = () => navigation.navigate("RegisterScreen");
  const goToLogin = () => navigation.navigate("LoginScreen");

  return (
    <Stack spacing={4} style={styles.container}>
      <Image source={require("../../img/logo.png")} style={styles.Image} />
      <Text style={styles.text_tittle}>Que quieres hacer?    ... </Text>

      {/* <Divider style={styles.divider } /> */}
      <TouchableOpacity style={styles.button} onPress={goToLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={goToRegister}>
        <Text style={styles.buttonText}>Registrate</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}>Ver api</Text>
      </TouchableOpacity>

      <Svg height="200" width="300" style={styles.footer}>
        <Polygon points="0,20 250,200 0,250" fill="#890000" />
      </Svg>
      <Svg height="200" width="300" style={styles.footer}>
        <Polygon points="0,70 190,200 0,200" fill="#FFDBDB" />
      </Svg>

      {/* <Svg
        height="150"
        width="150"
        style={{
          position: "absolute",
          marginTop: "120%",
          marginLeft: "62%",
        }}>
        <Polygon points="" fill="#890000" />
      </Svg> */}
      {/* FFDBDB */}
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  footer: {
    position: Platform.OS === "android" ? "absolute" : "relative",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
  },

  text_tittle: {
    color: "#7A1B1B",
    fontSize: 52,
    fontWeight: "bold",
    marginTop: "5%",
    marginLeft: "25%",
    marginRight: "18%",
  },

  Image: {
    width: 80,
    height: 80,
    marginRight: "25%",
    marginLeft: "2%",
    marginTop: "5%",
  },

  buttonContainer: {
    alignItems: "center",
    marginTop: "13%",
  },
  button: {
    backgroundColor: "#FFDBDB",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginVertical: 10,
    marginHorizontal: 100,
  },
  buttonText: {
    color: "#7A1B1B",
    fontSize: 18,
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default HomeScreen;
