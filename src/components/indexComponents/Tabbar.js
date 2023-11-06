import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react"; // Importa 'useEffect'
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard, // Importa 'Keyboard'
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import BasicStylesPage from "../../public_styles/css_public_Styles/Basic_Style";

const Tabbar = () => {
  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState("Home");
  const [tabbarVisible, setTabbarVisible] = useState(true); // Estado para controlar la visibilidad del Tabbar

  const handleTabPress = (tabName) => setActiveTab(tabName);

  useEffect(() => {
    // Agrega un listener para detectar cuando se muestra el teclado
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setTabbarVisible(false); // Oculta el Tabbar cuando se muestra el teclado
    });

    // Agrega un listener para detectar cuando se oculta el teclado
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setTabbarVisible(true); // Muestra el Tabbar cuando se oculta el teclado
    });

    // Limpia los listeners cuando el componente se desmonta
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={[styles.tabContainer, !tabbarVisible && styles.hiddenTabContainer]}>
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
    position: "absolute",
    bottom: 10,
    zIndex: 2,
  },
  hiddenTabContainer: {
    display: "none", // Oculta el Tabbar
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
