import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";

import WelcomeScreen from "./screens/WelcomeScreen";
import IndexTabbar from "./IndexTabbar";
import CamaraScreen from "./screens/CamaraScreen";


const Stack = createStackNavigator();

const IndexScreen = () => {
  const [orientation, setOrientation] = useState(null);

  const handleOrientationChange = ({ window: { width, height } }) => {
    const newOrientation = height > width ? "portrait" : "landscape";
    setOrientation(newOrientation);
  };

  useEffect(() => {
    Dimensions.addEventListener("change", handleOrientationChange);
    return () => {
      Dimensions.removeEventListener("change", handleOrientationChange);
    };
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="WelcomeScreen"
      screenOptions={{
        headerMode: "none", // Establecer headerMode en "none" para ocultar la barra de navegación
        headerStyle:
          orientation === "portrait"
            ? styles.headerStylePortrait
            : styles.headerStyleLandscape,
      }}>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="IndexTabbar" component={IndexTabbar} />
      <Stack.Screen name="CamaraScreen" component={CamaraScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerStylePortrait: {
    backgroundColor: "#2181CD",
    height: 100,
  },
  headerStyleLandscape: {
    backgroundColor: "#2181CD",
    height: 50,
  },
});

/* 
nvm install --lts 
npm cache clean --force
*/
export default IndexScreen;
