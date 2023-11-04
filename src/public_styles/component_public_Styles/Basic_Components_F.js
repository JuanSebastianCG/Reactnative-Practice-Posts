import React, { useState, useRef, useEffect } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Animated,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native"; // Importa View para crear bordes redondeados
import BasicStylesPage from "../css_public_Styles/Basic_Style";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Dimensions } from "react-native";
import { TextInput } from "react-native-paper";
const { width, height } = Dimensions.get("window");

const tenueColor2Button = BasicStylesPage.color2 + "99";

const CustomButton = ({ onPress, text, textStyle, buttonStyle }) => {
  return (
    <TouchableOpacity
      style={[styles.button]}
      onPress={onPress}
      activeOpacity={0.7} // Agrega una mejor animación al tocar
    >
      <View style={[styles.buttonContainer, buttonStyle]}>
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  /* button */
  button: {
    borderRadius: 10, // Bordes redondeados
    overflow: "hidden", // Asegura que los bordes redondeados sean respetados
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    padding: 10,
    backgroundColor: tenueColor2Button,
    borderRadius: 50, // Bordes redondeados dentro del botón
  },
  /* text normal */
  text: {
    fontSize: BasicStylesPage.sizeFontButton,
    fontWeight: BasicStylesPage.fontWeightTitle,
    color: BasicStylesPage.color0,
    paddingTop: 10,
    paddingBottom: 11,
    paddingLeft: 19,
    paddingRight: 19,
  },

  /* banner */
  errorBanner: {
    borderWidth: 1,
    borderColor: BasicStylesPage.colorWarning1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  errorText: {
    color: BasicStylesPage.colorWarning1,
    fontSize: 16,
    fontWeight: "bold",
    zIndex: 1,
  },
  errorButtonStyle: {
    paddingLeft: -10,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: BasicStylesPage.colorWarning1,
    borderRadius: 50,

    height: 45,
    borderRadius: 60,
    marginTop: 10,
  },
});

const CustomTag = ({ text, onPress, deleteMode = false }) => {
  return (
    <View style={stylesTag.tag}>
      <TouchableOpacity style={stylesTag.tagButton} onPress={onPress}>
        <Text style={stylesTag.tagText}>{text}</Text>
        {deleteMode && (
          <MaterialCommunityIcons
            name="close"
            color={BasicStylesPage.color0}
            size={20}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const CustomShowMultipleTag = ({ tags, handleDelete, style }) => {
  return (
    <View style={[stylesTag.container, style]}>
      {tags.map((tag) => (
        <CustomTag
          text={tag}
          onPress={() => handleDelete(tag)}
          deleteMode={true}
        />
      ))}
    </View>
  );
};

const stylesTag = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: "row", // Establecer el flujo de fila
    flexWrap: "wrap", // Permitir que los elementos se envuelvan a la siguiente línea
  },
  tag: {
    margin: 5,
    backgroundColor: BasicStylesPage.color4 + 40,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  tagButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  tagText: {
    color: BasicStylesPage.color1,
    fontSize: 16,
    fontWeight: "bold",
    color: BasicStylesPage.color0,
  },
});

const CustomDropDown = ({
  label,
  icon,
  items,
  style,
  width,
  height,
  onItemSlected,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const inputRef = useRef(null);

  const toggleModal = () => setModalOpen(!isModalOpen);
  const closeSidebar = () => setModalOpen(false);

  const updateModalPosition = () => {
    if (inputRef.current) {
      inputRef.current.measureInWindow((x, y, inputWidth, inputHeight) => {
        setModalPosition({ top: y + inputHeight - 70, left: x });
      });
    }
  };

  useEffect(() => {
    if (isModalOpen) updateModalPosition();
  }, [isModalOpen]);

  return (
    <View style={{ flexDirection: "row", ...style }}>
      <TouchableOpacity
        ref={inputRef}
        onPress={toggleModal}
        style={stylesDropdown.logo}>
        <MaterialCommunityIcons
          name={icon}
          color={BasicStylesPage.color2}
          size={50}
        />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={isModalOpen}
        onRequestClose={closeSidebar}>
        <View
          style={[
            stylesDropdown.modal,
            { top: modalPosition.top, left: modalPosition.left },
          ]}>
          <View style={stylesDropdown.inputContainer}>
            <MaterialCommunityIcons
              name={icon}
              color={BasicStylesPage.color2}
              size={50}
            />
            <TextInput
              placeholder={label}
              style={stylesDropdown.input}
              value={filterText}
              onChangeText={(text) => setFilterText(text)}
              textColor={BasicStylesPage.color2}
              placeholderTextColor={BasicStylesPage.color2}
            />
          </View>
          <ScrollView style={stylesDropdown.scrollView}>
            {items
              .filter((item) =>
                item.toLowerCase().includes(filterText.toLowerCase())
              )
              .map((item, index) => (
                <TouchableOpacity
                  style={stylesDropdown.item}
                  onPress={() => {
                    onItemSlected(item);
                    closeSidebar();
                  }}
                  key={index}>
                  <Text style={stylesDropdown.text}>{item}</Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
        <TouchableWithoutFeedback onPress={closeSidebar}>
          <View style={stylesDropdown.modalOverlay} />
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const stylesDropdown = {
  logo: {
    backgroundColor: BasicStylesPage.color6,
    borderRadius: 30,
    width: 300,
    padding: 10,
  },
  modal: {
    position: "absolute",
    maxHeight: 300,
    zIndex: 1,
    borderRadius: 10,
    width: 300,
  },
  inputContainer: {
    backgroundColor: BasicStylesPage.color6,
    padding: 10,
    borderRadius: 30,
    flexDirection: "row",
  },
  scrollView: {
    marginTop: 4,
    marginLeft: 10,
    marginRight: 10,
  },
  item: {
    padding: 15,
    backgroundColor: BasicStylesPage.color6,
    borderStyle: "solid",
    borderLeftWidth: 5,
    borderLeftColor: BasicStylesPage.color2,
    margin: 2,
    borderRadius: 15,
  },
  input: {
    backgroundColor: "rgba(0,0,0,0.0)",
    fontSize: 16,
    width: "70%",
  },
  text: {
    fontSize: 16,
    color: BasicStylesPage.color2,
  },
  modalOverlay: {
    flex: 1,
  },
};

export { CustomButton, CustomTag, CustomShowMultipleTag, CustomDropDown };
