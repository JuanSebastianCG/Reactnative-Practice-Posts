import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Tabbar from "./indexComponents/Tabbar";
import HomeScreen from "./screens/HomeScreen";
import CamaraScreen from "./screens/camaraScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterSwitchScreen";
import { View, StyleSheet } from "react-native"; // Usé react-native en lugar de native-base

const Stack = createStackNavigator();

function IndexTabbar() {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerMode: "none", // Establecer headerMode en "none" para ocultar la barra de navegación
        }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="CamaraScreen" component={CamaraScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      </Stack.Navigator>
      {/* Superponer el Tabbar de manera absoluta */}
      <View style={styles.tabbarOverlay}>
        <Tabbar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabbarOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default IndexTabbar;
