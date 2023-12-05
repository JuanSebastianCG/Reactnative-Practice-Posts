import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, StyleSheet } from "react-native"; // Usé react-native en lugar de native-base

import Tabbar from "../../components/indexComponentsBar/Tabbar";
import { Sidebar } from "../../components/indexComponentsBar/SideBarMenu";

import HomeScreen from "../indexPages/HomeScreen";
import LoginScreen from "../userComponents/LoginScreen";
import RegisterScreen from "../userComponents/RegisterScreen";
import ShowUsersScreen from "../userComponents/ShowUsersScreen";
import NotificationScreen from "../userComponents/NotificationScreen";


import ShowCategoryScreen from "../../screens/CategoryAndServices/ShowCategory";
import ShowServicesScreen from "../../screens/CategoryAndServices/ShowServices";
import CreateCategoryScreen from "../../screens/CategoryAndServices/CreateCategory";
import CreateServiceScreen from "../CategoryAndServices/CreateService";

import ShowPostsScreen from "../postsComponents/ShowPostsScreen";
import CreatePostScreen from "../postsComponents/CreatePostScreen";

import { AuthProvider } from "../../utils/authManager";
import UpdatePostScreen from "../postsComponents/UpdatePostScreen";

const Stack = createStackNavigator();

function IndexTabbar() {
  const { handleLoggin } = useAuth();

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
          <Stack.Screen name="CreatePostScreen" component={CreatePostScreen} />
          <Stack.Screen name="CreateService" component={CreateServiceScreen} />
          <Stack.Screen name="UpdatePostScreen" component={UpdatePostScreen} />

        <Stack.Screen
          name="ShowServicesScreen"
          component={ShowServicesScreen}
          initialParams={{ categoryName: "" }}
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
        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
        />
      </Stack.Navigator>

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
