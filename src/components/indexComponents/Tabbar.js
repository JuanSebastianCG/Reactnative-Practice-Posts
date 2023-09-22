import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tabbar = () => {
  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState("Home");

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
  };


  return (
    <View style={styles.tabContainer}>

      <TouchableWithoutFeedback
        onPress={() => {
          handleTabPress("Home");
          navigation.navigate("Home");
        }}
        style={styles.tabIconWrapper}
      >
        <View style={styles.tabIconInnerWrapper}>
          <MaterialCommunityIcons
            name="home-circle"
            color={activeTab === "home-circle" ? "#c39df8" : "#e6f6e6"}
            size={50}
          />
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
        onPress={() => {
          handleTabPress("Camera");
          navigation.navigate("Camera");
        }}
        style={styles.tabIconWrapper}
      >
        <View style={styles.tabIconInnerWrapper}>
          <MaterialCommunityIcons
            name="camera-enhance"
            color={activeTab === "camera-enhance" ? "#c39df8" : "#e6f6e6"}
            size={45}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    height:65, // Aumentamos la altura de la barra
    backgroundColor: "#6200ee",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 16, // Añadimos espaciado horizontal
  },
  tabIconWrapper: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  tabIconInnerWrapper: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Tabbar;
