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
<<<<<<< HEAD
import CreateService from "./screens/CreateService";
=======
import CreateCategoryScreen from "./screens/Category/CreateCategory";
import { AuthProvider } from "../utils/authManager";
>>>>>>> origin/switch-checkbox-component

const Stack = createStackNavigator();

function IndexTabbar() {
  return (
<<<<<<< HEAD
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
        <Stack.Screen name="ShowPostsScreen" component={ShowPostsScreen} />
        <Stack.Screen name="CreatePostScreen" component={CreatePostScreen} />
        <Stack.Screen name="CreateService" component={CreateService} />
      </Stack.Navigator>
      {/* Superponer el Tabbar de manera absoluta */}
      <View style={styles.tabbarOverlay}>
=======
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
          <Stack.Screen name="CreatePostScreen" component={CreatePostScreen} />
          <Stack.Screen
            name="ShowServicesScreen"
            component={ShowServicesScreen}
            initialParams={{ categoryName:""}}
            options={({ route }) => ({ title: route.params.categoryName })}
            
          />
          <Stack.Screen
            name="ShowCategoryScreen"
            component={ShowCategoryScreen}
          />
          <Stack.Screen
            name="CreateCategoryScreen"
            component={CreateCategoryScreen}
          />
        </Stack.Navigator>
        {/* Superponer el Tabbar de manera absoluta */}

>>>>>>> origin/switch-checkbox-component
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
