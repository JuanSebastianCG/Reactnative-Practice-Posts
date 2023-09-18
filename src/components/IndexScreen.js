// IndexScreen.js
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Navbar from "./indexComponents/Navbar";
import HomeScreen from "./screens/HomeScreen";
import MovieScreen from "./screens/MovieScreen";
import Tabbar from "./indexComponents/Tabbar";

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
    <Stack.Navigator
      initialRouteName="Tabbar"
      screenOptions={{
        headerStyle:
          orientation === "portrait"
            ? styles.headerStylePortrait
            : styles.headerStyleLandscape,
      }}
    >
      <Stack.Screen
        name="Tabbar"
        component={Tabbar} // Render the Tabbar component as a screen
        options={{
          header: () => (
            <>
              <Navbar />
            </>
          ),
        }}
      />
      <Stack.Screen name="Movie" component={MovieScreen} />
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

export default IndexScreen;
