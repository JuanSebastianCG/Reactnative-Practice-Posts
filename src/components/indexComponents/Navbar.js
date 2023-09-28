import React, { useState } from "react";
import {
  AppBar,
  IconButton,
  Button,
  Avatar,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const navBar = () => {

    const navigation = useNavigation();
  return (
    <AppBar
      title="Welcome"
      leading={(props) => (
        <IconButton
          icon={(props) => <Icon name="menu" {...props} />}
          {...props}
          onPress={() => navigation.navigate("Home")}
        />
      )}
    />
  );
};

export default navBar;
