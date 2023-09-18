import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomeScreen from "../screens/HomeScreen";
import MovieScreen from "../screens/MovieScreen";
import PokemonScreen from "../screens/PokemonScreen";

const Tab = createMaterialBottomTabNavigator();

const Tabbar = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#c39df8"
      inactiveColor="#e6f6e6"
      barStyle={{ backgroundColor: "#6200ee" }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="home" // Change the icon based on focus
              color={focused ? "#c39df8" : "#e6f6e6"} // Change the color based on focus
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Movie"
        component={MovieScreen}
        options={{
          tabBarLabel: "Movie",
          tabBarColor: "#009387",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name= "movie"  // Change the icon based on focus
              color={focused ? "#c39df8" : "#e6f6e6"} // Change the color based on focus
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Pokemon"
        component={PokemonScreen}
        options={{
          tabBarLabel: "Pokemon",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name= "pokeball" // Change the icon based on focus
              color={focused ? "#c39df8" : "#e6f6e6"} // Change the color based on focus
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabbar;
