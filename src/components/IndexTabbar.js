import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Tabbar from "./indexComponents/Tabbar";

import HomeScreen from "./screens/HomeScreen";
import camaraScreen from "./screens/camaraScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterSwitchScreen";



const Stack = createStackNavigator();

function IndexTabbar() {
  return (
    <>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerMode: "none", // Establecer headerMode en "none" para ocultar la barra de navegación
        }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="CamaraScreen" component={camaraScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        

      </Stack.Navigator>
      <Tabbar />
    </>
  );
}

export default IndexTabbar;
