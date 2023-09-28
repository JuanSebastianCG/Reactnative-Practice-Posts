import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";

import Navbar from "./indexComponents/Navbar";
import Tabbar from "./indexComponents/Tabbar";

import HomeScreen from "./screens/HomeScreen";
import CamaraScreen from "./screens/camaraScreen"
import RegisterSwitchScreen from "./screens/RegisterSwitchScreen";

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
    <SafeAreaView style={{ flex: 1 }}>
      <Navbar />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle:
            orientation === "portrait"
              ? styles.headerStylePortrait
              : styles.headerStyleLandscape,
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            header: () => <></>,
          }}
        />
        <Stack.Screen
          name="Camera"
          component={CamaraScreen}
          options={{
            header: () => (
              <>
                <Navbar />
              </>
            ),
          }}
        />

        <Stack.Screen
          name="Register"
          component={RegisterSwitchScreen}
          options={{
            header: () => <></>,
          }}
        />
      </Stack.Navigator>
      <Tabbar style={{ height: "10%" }} />
    </SafeAreaView>
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
