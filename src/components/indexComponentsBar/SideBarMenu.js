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
import { Circle, Svg } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import BasicStylesPage from "../../public/cssStyles/Basic_Style";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const { width, height } = Dimensions.get("window");
import { TokenUserManager } from "../../utils/asyncStorage";
import {
  CustomLogOutInButton,
  BellUserNotification,
  CustomLogo,
} from "../../public/customComponent/Basic_PageInterface";
import { UserNotification } from "../../Services/ApiServices/UserNotification";
import { useAuth } from "../../utils/authManager";

const Sidebar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const sidebarAnimation = useRef(new Animated.Value(-width * 0.9)).current;
  const { logged } = useAuth();
  const navigation = useNavigation();


  const { fetchUnreadNotification } = UserNotification();
  const [hasUnreadNotification, setHasUnreadNotification] = useState(0);
  const fetchHasNotificationSet = async () => {
    setHasUnreadNotification(await fetchUnreadNotification());
  };

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
    if (logged) fetchHasNotificationSet();
    if (isModalOpen) {
      openSidebar();
    } else {
      closeSidebar();
    }
  }, [isModalOpen]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleModal} style={styles.logo}>
        {hasUnreadNotification > 0 && (
          <View
            style={{
              position: "absolute",
              top: -10,
              right: -10,
              backgroundColor: BasicStylesPage.color0,
              borderRadius: 50,
              width: 30,
              height: 30,
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Text
              style={{
                color: BasicStylesPage.color3,
                fontSize: 13,
                fontWeight: "bold",
              }}>
              {hasUnreadNotification}
            </Text>
          </View>
        )}

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
          <View style={styles.tabarIcon}>
            <CustomLogo width={60} height={80} styleLogo={{left: -75}}/> 
            <CustomLogOutInButton onPress={closeSidebar} />
            <TouchableOpacity
              style={{ marginLeft: 20 }}
              onPress={() => {
                closeSidebar();
                toggleModal();
                navigation.navigate("RegisterScreen");
              }}>
              <View>
                <Icon
                  name="account-plus"
                  size={50}
                  color={BasicStylesPage.color0}
                />
                <Text
                  style={{
                    color: BasicStylesPage.color0,
                  }}>
                  Registrar
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {logged && (
          <BellUserNotification
            onPress={() => {
              closeSidebar();
              navigation.navigate("NotificationScreen");
            }}
          />)}
          <Svg width="200" height="260" style={styles.cardCircle}>
            <Circle
              cx="100"
              cy="160"
              r="100"
              fill={BasicStylesPage.color2 + 90}
            />
          </Svg>

          <Svg width="200" height="500" style={styles.cardCircle}>
            <Circle
              cx="100"
              cy="380"
              r="70"
              fill={BasicStylesPage.color2 + 90}
            />
          </Svg>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}>
            {/* cuerpo */}
            <SideBarBody closeSidebar={closeSidebar} />
          </ScrollView>
        </Animated.View>
      </Modal>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: "row",
  },
  modal: {
    position: "absolute",
    top: height * 0.1,
    width: width * 0.66,
    height: height * 0.75,
    borderRadius: 12,
    backgroundColor: BasicStylesPage.color3,
    shadowColor: BasicStylesPage.color0,
    borderRightWidth: 3,
    borderRightColor: BasicStylesPage.color4,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    zIndex: 2,
  },
  modalOverlay: {
    flex: 1,
  },
  logo: {
    padding: 10,
    backgroundColor: BasicStylesPage.color1,
    borderTopRightRadius: 25,
    width: 65,
  },
  scrollView: {
    marginTop: 100,
    marginBottom: 20,
  },
  tabarIcon: {
    flexDirection: "row",
    justifyContent: "flex-end",
    /* increase the space betwen elements */
    position: "absolute",
    marginTop: 30,
    left: 90,
    zIndex: 2,
  },
  cardCircle: {
    position: "absolute",
    alignSelf: "center",
  },
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
  const { getInfoToken } = TokenUserManager();
  const [adminRole, setAdminRole] = useState(false);

  const getAdminRole = async () => {
    setAdminRole((await getInfoToken("role")) === "admin");
    
  };

  useEffect(() => {
    getAdminRole();
  }, []);

  return (
    <View style={styleBody.container}>
      <Text style={styleBody.sidebarItemTitle}>MENÚ</Text>
      <Dropdown
        title="Inicio"
        titleIcon="home"
        items={[
          {
            text: "Menú",
            onPress: () => navigation.navigate("HomeScreen"),
          },
          {
            text: "ver Api ",
            onPress: () => navigation.navigate("HomeScreen"),
          },
        ]}
        closeSidebar={closeSidebar}
      />
      <Dropdown
        title="Categorias y Servicios"
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
      {adminRole && (
        <Dropdown
          title="Admin"
          titleIcon="shield-crown"
          items={[
            {
              text: "Ver Usuarios",
              onPress: () => navigation.navigate("ShowUsersScreen"),
            },
          ]}
          closeSidebar={closeSidebar}
        />
      )}
    </View>
  );
};

const styleBody = {
  borderRadius: 10,

  container: {
    flex: 1,

    paddingTop: 20,
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
    marginBottom: 10,
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
};

export { Sidebar };
