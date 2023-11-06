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
              <TouchableOpacity onPress={onConfirm}>
                <Icon
                  name="checkbox-marked-circle-plus-outline"
                  size={80}
                  color={BasicStylesPage.color0}
                />
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
                <Icon
                  name="step-backward-2"
                  size={80}
                  color={BasicStylesPage.color0}
                />
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
    <View style={[stylesErrorBanner.errorBanner, styleBanner]}>
      <Text style={[stylesErrorBanner.errorText]}>{text}</Text>
      {buttons}
      <TouchableOpacity
        onPress={onChange}
        style={[stylesErrorBanner.errorButtonStyle]}>
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

/* terms and conditions */
export const CustomTermsAndConditionsAlert = ({
  onConfirm,
  onDecline,
  isVisible,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.2}
      style={stylesTermsAndConditions.modalContainer}
      backdropColor={BasicStylesPage.color1}>
      <View style={stylesTermsAndConditions.modalContent}>
        <View style={stylesTermsAndConditions.modalContent2}>
          <ScrollView
            contentContainerStyle={stylesTermsAndConditions.scrollContainer}>
            <Text style={stylesTermsAndConditions.message}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              facilisis elit vel ornare auctor. Aliquam rutrum, mauris non
              accumsan efficitur, nisi nibh suscipit lorem, vel ultricies ante
              urna id mauris. Etiam fermentum pharetra diam, eget finibus quam.
              Donec nunc tellus, porttitor non diam ultrices, rutrum dignissim
              turpis. Donec eget condimentum sapien. Aliquam scelerisque ac nisl
              id faucibus. Vestibulum arcu nisl, fermentum nec sapien cursus,
              pharetra facilisis justo. Sed erat purus, dapibus a hendrerit in,
              ullamcorper eu risus. Ut sit amet diam diam. Vestibulum suscipit
              scelerisque leo, sed congue erat elementum eu. Nam faucibus dolor
              in aliquet condimentum. Nunc at ipsum varius, auctor ligula a,
              auctor diam. Quisque sed dolor tempor, semper purus vel, placerat
              lacus. Ut ut sodales justo, ac porttitor dolor. Praesent eget
              rhoncus metus. Nulla tincidunt nulla a quam maximus porttitor.
              Praesent volutpat nibh eget tellus egestas pharetra. Curabitur
              sagittis magna dapibus, dapibus ligula id, aliquet ante. Praesent
              vitae faucibus massa. Sed elementum, metus sit amet vulputate
              pulvinar, nunc nisi sagittis mi, id aliquet sapien neque
              condimentum orci. Nulla eleifend est sit amet dui vulputate, at
              condimentum sem tincidunt. Donec condimentum dolor libero, et
              dictum nunc consectetur at. Sed quis fringilla ante, eget ornare
              erat. Donec tellus enim, varius in porta sit amet, semper eu
              dolor. Fusce sapien sem, porta eget libero ut, faucibus aliquam
              ligula. Morbi vestibulum dolor at imperdiet sollicitudin. Nullam
              nec nibh eget massa tincidunt porttitor. Vivamus purus mi,
              placerat at dui ac, accumsan pharetra urna. Proin venenatis
              aliquet facilisis. Nullam ultricies varius tellus ut pharetra.
              Mauris pulvinar mauris vel tortor rhoncus, et pharetra est
              maximus. Praesent ullamcorper lorem elit, in congue arcu
              scelerisque nec. Suspendisse posuere ex libero, at dapibus dui
              sagittis ultricies. Etiam eget enim lobortis, cursus dui vitae,
              laoreet orci. Suspendisse accumsan mauris justo, vitae ultrices
              mauris ornare sagittis.
              nec nibh eget massa tincidunt porttitor. Vivamus purus mi,
              placerat at dui ac, accumsan pharetra urna. Proin venenatis
              aliquet facilisis. Nullam ultricies varius tellus ut pharetra.
              Mauris pulvinar mauris vel tortor rhoncus, et pharetra est
              maximus. Praesent ullamcorper lorem elit, in congue arcu
              scelerisque nec. Suspendisse posuere ex libero, at dapibus dui
              sagittis ultricies. Etiam eget enim lobortis, cursus dui vitae,
              laoreet orci. Suspendisse accumsan mauris justo, vitae ultrices
              mauris ornare sagittis.
            </Text>
          </ScrollView>
          <View style={stylesTermsAndConditions.SelectionContainer}>
            <Text style={stylesTermsAndConditions.message1}>
              ¿Aceptas los términos y condiciones?
            </Text>
            <View style={stylesTermsAndConditions.buttonContainer}>
              <CustomButton
                text="Decline"
                onPress={onDecline}
                textStyle={stylesTermsAndConditions.confirmButton}
                buttonStyle={stylesTermsAndConditions.buttonConfirmation}
              />
              <CustomButton
                text="Accept"
                onPress={onConfirm}
                textStyle={stylesTermsAndConditions.cancelButton}
                buttonStyle={stylesTermsAndConditions.buttonCancel}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const stylesTermsAndConditions = StyleSheet.create({
  modalContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    borderRadius: 8,
    width: "90%",
    borderWidth: 4,
    borderColor: BasicStylesPage.color3,
  },
  modalContent2: {
    padding: 6,
    borderWidth: 4,
    borderColor: BasicStylesPage.color2,
  },
  message: {
    backgroundColor: BasicStylesPage.color3,
    borderRadius: 10,
    borderColor: BasicStylesPage.color2,
    borderBottomWidth: 4,
    color: BasicStylesPage.color4,
    textAlign: "justify",

    borderRadius: 10,
    padding: 20,
    paddingTop: 10,
    fontSize: 16,
    margin: 8,
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
    backgroundColor: BasicStylesPage.colorWarning3,
    borderRadius: 40,

    fontSize: 18,
    marginBottom: 16,
  },
  buttonCancel: {
    backgroundColor: BasicStylesPage.colorWarning2,
    borderRadius: 30,
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
  scrollContainer: {
    
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 500,
  },
  message1: {
    color: BasicStylesPage.color4,
    padding: 20,
    fontSize: 18,
    marginBottom: 16,
    textAlign: "center",
  },
  SelectionContainer: {
    backgroundColor: BasicStylesPage.color3,
    margin: 6,
    borderRadius: 4,
    borderLeftColor: BasicStylesPage.color2,
    borderLeftWidth: 5,
    borderRightColor: BasicStylesPage.color2,
    borderRightWidth: 5,
  },
});
