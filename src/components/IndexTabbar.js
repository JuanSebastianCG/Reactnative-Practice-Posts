import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, StyleSheet } from "react-native"; // Usé react-native en lugar de native-base

import Tabbar from "./indexComponents/Tabbar";
import { Sidebar } from "./indexComponents/SideBarMenu";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/User/LoginScreen";
import RegisterScreen from "./screens/User/RegisterScreen";
import ShowCategoryScreen from "./screens/Category/ShowCategory";
import ShowServicesScreen from "./screens/Category/ShowServices";

import ShowPostsScreen from "./screens/posts/ShowPostsScreen";
import CreatePostScreen from "./screens/posts/CreatePostScreen";
import CreateCategoryScreen from "./screens/Category/CreateCategory";
import { AuthProvider } from "../utils/authManager";

const Stack = createStackNavigator();

function IndexTabbar() {
  return (
    <AuthProvider>
      <View style={{ flex: 1 }}>
        <Stack.Navigator
          initialRouteName="HomeScreen"
          screenOptions={{
            headerMode: "none", // Establecer headerMode en "none" para ocultar la barra de navegación
          }}>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="ShowPostsScreen" component={ShowPostsScreen} />
          <Stack.Screen
            name="ShowServicesScreen"
            component={ShowServicesScreen}
          />
          <Stack.Screen
            name="ShowCategoryScreen"
            component={ShowCategoryScreen}
          />

          <Stack.Screen name="CreatePostScreen" component={CreatePostScreen} />
          <Stack.Screen name="CreateCategoryScreen" component={CreateCategoryScreen} />

        </Stack.Navigator>
        {/* Superponer el Tabbar de manera absoluta */}

        <Tabbar />
        <View style={styles.sideBarOverlay}>
          <Sidebar />
        </View>
      </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  sideBarOverlay: {
    position: "absolute",
    left: 0,
    top: "50%",
  },
});

export default IndexTabbar;
