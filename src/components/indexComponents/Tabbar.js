import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import BasicStylesPage from "../../public_styles/css_public_Styles/Basic_Style";

const Tabbar = () => {
  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState("Home");
  const handleTabPress = (tabName) => setActiveTab(tabName);

  return (
    <View style={styles.tabContainer}>
      <TouchableWithoutFeedback
        onPress={() => {
          handleTabPress("Home");
          navigation.navigate("HomeScreen");
        }}
        style={styles.tabIconWrapper}>
        <View
          style={[
            styles.tabIconInnerWrapper,
            activeTab === "Home" && styles.activeTab,
          ]}>
          <MaterialCommunityIcons
            name="home-circle"
            color={
              activeTab === "Home"
                ? BasicStylesPage.color2
                : BasicStylesPage.color2
            }
            size={50}
          />
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
        onPress={() => {
          handleTabPress("Camera");
          navigation.navigate("CamaraScreen");
        }}
        style={styles.tabIconWrapper}>
        <View
          style={[
            styles.tabIconInnerWrapper,
            activeTab === "Camera" && styles.activeTab,
          ]}>
          <MaterialCommunityIcons
            name="camera-enhance"
            color={
              activeTab === "Camera"
                ? BasicStylesPage.color2
                : BasicStylesPage.color2
            }
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
    height: 70,
    backgroundColor: BasicStylesPage.color6,
    justifyContent: "space-around",
    alignItems: "center",

    paddingHorizontal: 16,
    width: "95%",
    marginHorizontal: "2.5%",
    borderRadius: 25,
    position: "relative", // Agrega position:relative para superponer elementos
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
  activeTab: {
    backgroundColor: BasicStylesPage.color3,
    borderRadius: 60,
    position: "relative", 
    zIndex: 1, 
    height: 60,
    width: 60,
  },
});

export default Tabbar;
