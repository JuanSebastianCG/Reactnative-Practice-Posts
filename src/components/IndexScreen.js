// IndexScreen.js
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";

import Navbar from "./indexComponents/Navbar";
import Tabbar from "./indexComponents/Tabbar";

import HomeScreen from "./screens/HomeScreen";


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

  useEffect(() => {
    console.log("Orientation:", orientation);
  }, [orientation]);

  return (
    <>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle:
            orientation === "portrait"
              ? styles.headerStylePortrait
              : styles.headerStyleLandscape,
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            header: () => (
              <>
                <Navbar />
              </>
            ),
          }}
        />

      </Stack.Navigator>
      <Tabbar />
    </>
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

export default IndexScreen;
