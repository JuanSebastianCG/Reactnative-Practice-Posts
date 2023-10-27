import React from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import BasicStylesPage from "../css_public_Styles/Basic_Style";
import { CustomButton } from "./Basic_Components_F";
import { Polygon, Svg } from "react-native-svg";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export function CustomAlertConfirmation({
  isVisible,
  message,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.2}
      backdropColor={BasicStylesPage.color1}>
      <ScrollView contentContainerStyle={stylesAlert.modalContainer}>
        <View style={stylesAlert.modalContent}>
          <Svg
            height="230"
            width="400"
            style={[stylesAlert.footer, { top: 40, left: 7 }]}>
            <Polygon
              points="0,90 190,200 0,200"
              fill={BasicStylesPage.color2}
            />
          </Svg>
          <View style={stylesAlert.modalContent2}>
            <Text style={stylesAlert.message}>{message}</Text>
            <View style={stylesAlert.buttonContainer}>
              <CustomButton
                text="Confirmar"
                onPress={onConfirm}
                textStyle={stylesAlert.confirmButton}
                buttonStyle={stylesAlert.buttonConfirmation}
              />
              <CustomButton
                text="Cancelar"
                onPress={onCancel}
                textStyle={stylesAlert.cancelButton}
                buttonStyle={stylesAlert.buttonCancel}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
}

const stylesAlert = StyleSheet.create({
  modalContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: BasicStylesPage.color1,
    borderRadius: 8,
    width: "90%",
    borderWidth: 4,
    borderColor: BasicStylesPage.color1,
  },
  modalContent2: {
    padding: 15,
    borderWidth: 4,
    borderColor: BasicStylesPage.color2,
  },
  message: {
    backgroundColor: BasicStylesPage.color2,
    color: BasicStylesPage.color1,
    borderRadius: 40,
    marginTop: 10,
    padding: 30,
    fontSize: 18,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  confirmButton: {
    color: BasicStylesPage.color1,
    fontSize: 16,
  },
  cancelButton: {
    color: BasicStylesPage.color1,
    fontSize: 16,
  },
  buttonConfirmation: {
    backgroundColor: BasicStylesPage.colorWarning2,
    borderRadius: 40,
    fontSize: 18,
    marginBottom: 16,
  },
  buttonCancel: {
    backgroundColor: BasicStylesPage.colorWarning3,
    borderRadius: 40,
    fontSize: 18,
    marginBottom: 16,
  },
  footer: {
    position: Platform.OS === "android" ? "absolute" : "relative",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
  },
});

export function CustomSuccessAlert({ message, onConfirm, isVisible }) {
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.2}
      backdropColor={BasicStylesPage.color1}>
      <ScrollView contentContainerStyle={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalContent2}>
            
            <Text style={styles.message}>{message}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={onConfirm}
              >
                <Icon name="checkbox-marked-circle-plus-outline" size={80} color={BasicStylesPage.color0} />
                
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: BasicStylesPage.color2,
    borderRadius: 8,
    width: "90%",
    borderWidth: 4,
    padding: 15,
    borderColor: BasicStylesPage.color1,
  },
  modalContent2: {
    padding: 15,
    borderWidth: 4,
    borderColor: BasicStylesPage.color1,
    
  },
  message: {
    color: BasicStylesPage.color1,
    marginTop: 10,
    paddingBottom: 18,
    marginBottom: 16,
    padding: 12,
    fontSize: 22,
    textAlign: "center",
    borderColor: BasicStylesPage.color1,
    borderBottomWidth: 4,
  },
  
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

});

export function CustomErrorAlert({ message, onConfirm, isVisible }) {
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.2}
      backdropColor={BasicStylesPage.color1}>
      <ScrollView contentContainerStyle={styles.modalContainer}>
        <View style={styles.modalContent}>
            <Text style={styles.message}>{message}</Text>
          <View style={styles.modalContent2}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={onConfirm}>
                <Icon name="step-backward-2" size={80} color={BasicStylesPage.color0} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
}


export const CustomErrorBanner = ({ text, styleBanner, buttons, onChange }) => {

  return (
    <View style={[stylesErrorBanner.errorBanner,styleBanner]}>
      <Text style={[stylesErrorBanner.errorText]}>{text}</Text>
      {buttons}
      <TouchableOpacity onPress={onChange} style={[stylesErrorBanner.errorButtonStyle]}>
        <Text style={[stylesErrorBanner.errorText]}>OK</Text>
      </TouchableOpacity>

    </View>
  );
};




const stylesErrorBanner = StyleSheet.create({
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
    zIndex : 1,

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

