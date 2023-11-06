import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  TouchableWithoutFeedback,
  Modal,
  ScrollView,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import BasicStylesPage from "../../public_styles/css_public_Styles/Basic_Style";
import { Dimensions } from "react-native";
import { Circle, Svg } from "react-native-svg";
const { width, height } = Dimensions.get("window");

const Sidebar = () => {
  const navigation = useNavigation();
  const [isModalOpen, setModalOpen] = useState(false);
  const sidebarAnimation = useRef(new Animated.Value(-width * 0.7)).current;

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const openSidebar = () => {
    Animated.timing(sidebarAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeSidebar = () => {
    Animated.timing(sidebarAnimation, {
      toValue: -width * 0.7,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setModalOpen(false);
    });
  };

  useEffect(() => {
    if (isModalOpen) {
      openSidebar();
    } else {
      closeSidebar();
    }
  }, [isModalOpen]);
  

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleModal} style={styles.logo}>
        <MaterialCommunityIcons
          name="menu"
          color={BasicStylesPage.color2}
          size={50}
        />
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={isModalOpen}
        onRequestClose={closeSidebar}>
        <TouchableWithoutFeedback onPress={closeSidebar}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <Animated.View style={[styles.modal, { left: sidebarAnimation }]}>
          <ScrollView style={styles.scrollView}>
            {/* cuerpo */}
            <SideBarBody closeSidebar={closeSidebar} />
          </ScrollView>
        </Animated.View>
      </Modal>
    </View>
  );
};
/* ===================================================================================== */
const DropdownItem = ({ icon, text, onPress }) => {
  return (
    <TouchableOpacity style={styleBody.sidebarChildItem} onPress={onPress}>
      <Text style={styleBody.sidebarItemChildText}>{text}</Text>
    </TouchableOpacity>
  );
};

const Dropdown = ({ title, titleIcon, items, closeSidebar }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View style={styleBody.sidebarRefs}>
      <TouchableOpacity style={styleBody.sidebarItem} onPress={toggleDropdown}>
        <MaterialCommunityIcons
          name={titleIcon}
          color={BasicStylesPage.color1}
          size={50}
        />
        <Text style={styleBody.sidebarItemText}>{title}</Text>
      </TouchableOpacity>

      {isOpen && (
        <View style={styleBody.sidebarChildDropdown}>
          {items.map((item, index) => (
            <DropdownItem
              key={index}
              icon={item.icon}
              text={item.text}
              onPress={() => {
                closeSidebar();
                item.onPress();
              }}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const SideBarBody = ({ closeSidebar }) => {
  const navigation = useNavigation();

  return (


      <View style={styleBody.container}>
      <Svg width="400" height="500" style={styleBody.cardCircle}>
        <Circle cx="200" cy="160" r="100" fill={BasicStylesPage.color2 + 90} />
      </Svg>

      <Svg width="400" height="500" style={styleBody.cardCircle}>
        <Circle cx="200" cy="380" r="70" fill={BasicStylesPage.color2 + 90} />
      </Svg>
        <Text style={styleBody.sidebarItemTitle}>MENU</Text>
        <Dropdown
          title="Home"
          titleIcon="home"
          items={[
            {
              text: "Home",
              onPress: () => navigation.navigate("HomeScreen"),
            },
            {
              text: "login",
              onPress: () => navigation.navigate("LoginScreen"),
            },
          ]}
          closeSidebar={closeSidebar}
        />
        <Dropdown
          title="Categorias"
          titleIcon="shape"
          items={[
            {
              text: "Ver Categorias",
              onPress: () => navigation.navigate("ShowCategoryScreen"),
            },
            {
              text: "Ver Servicios",
              onPress: () => navigation.navigate("ShowServicesScreen"),
            },
          ]}
          closeSidebar={closeSidebar}
        />
      </View>
  );
};

const styleBody = {
  borderRadius: 10,

  container: {
    flex: 1,
    backgroundColor: BasicStylesPage.color3,
    paddingTop: 20,
    height: height *  0.6,
  },
  sidebarItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderLeftWidth: 3,
    borderLeftColor: BasicStylesPage.color4,
    width: "80%",
  },
  sidebarItemTitle: {
    fontSize: 26,
    color: BasicStylesPage.color1,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  sidebarItemText: {
    marginLeft: 10,
    color: BasicStylesPage.color1,
    fontSize: 20,
  },
  sidebarRefs: {
    marginTop: 10,
    marginLeft: 30,
  },
  sidebarChildDropdown: {
    marginLeft: 30,
  },
  sidebarChildItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderLeftWidth: 3,
    borderLeftColor: BasicStylesPage.color4,
  },
  sidebarItemChildText: {
    marginLeft: 10,
    color: BasicStylesPage.color1,
    fontSize: 18,
  },
  cardCircle: {
    position: "absolute",
    alignSelf: "center",
  },

};

const styles = {
  container: {
    flexDirection: "row",
  },
  modal: {
    position: "absolute",
    top: height * 0.15,
    width: width * 0.64,
    height: height * 0.7,
    borderRadius: 12,
    backgroundColor: BasicStylesPage.color3,
    borderRightColor: BasicStylesPage.color1,
    borderBottomColor: BasicStylesPage.color1,
    borderTopColor: BasicStylesPage.color1,
    borderRightWidth: width * 0.01,
    borderBottomWidth: width * 0.01,
    borderTopWidth: width * 0.01,
  },
  modalOverlay: {
    flex: 1,
  },
  logo: {
    padding: 10,
    backgroundColor: BasicStylesPage.color1,
    borderTopRightRadius: 25,
    paddingLeft: 20,
    width: 70,
  },
  scrollView: {
    maxHeight: height * 0.65,
    marginTop: 10,
    
    
  },
  /* Resto de los estilos sin cambios */
};

export { Sidebar };
