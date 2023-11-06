import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { usePostData } from "../../../utils/useAxios";
import { Polygon, Svg } from "react-native-svg";

import { CustomButton } from "../../../public_styles/component_public_Styles/Basic_Components_F";
import { CustomLogo } from "../../../public_styles/component_public_Styles/Basic_PageInterface";

import { CustomTermsAndConditionsAlert } from "../../../public_styles/component_public_Styles/Basic_AlertComponent";
import {
  CustomInTextField,
  CustomInTextArea,
} from "../../../public_styles/component_public_Styles/Basic_FormComponents_F";
import BasicStylesPage from "../../../public_styles/css_public_Styles/Basic_Style";
import {
  ImagePickerComponent,
  ImagePhotoPickerComponent,
} from "../../../public_styles/component_public_Styles/Basic_ImageComponent";
import {
  CustomSuccessAlert,
  CustomAlertConfirmation,
  CustomErrorBanner,
} from "../../../public_styles/component_public_Styles/Basic_AlertComponent";
import { TokenUserManager } from "../../../utils/asyncStorage";
import { Avatar } from "react-native-paper";

import axios from "axios";

function CreateCategoryScreen() {
  const navigation = useNavigation();
  const { getToken } = TokenUserManager();

  const [showTermsAndConditions, setShowTermsAndConditions] = useState(false);
  const goToShowCaracteristic = () => navigation.replace("ShowCategoryScreen");

  //api
  const { postData, loading, error, data } = usePostData();

  const handleChange = (name, value) => {
    setPostDataDB({ ...PostDataDB, [name]: value });
  };

  const [PostDataDB, setPostDataDB] = useState({
    nameCategoryService: "Testeo",
    descriptionCategoryService: "Juan Cardenas testeo",
    active: true,
    avatar: "",
  });

  //image picker and photo
  const { BasicIconImagePicker } = ImagePickerComponent({
    onComplete: (image) => {
      if (image)
        setPostDataDB({
          ...PostDataDB,
          avatar: image,
        });
    },
  });

  const { BasicIconImagePhoto } = ImagePhotoPickerComponent({
    onComplete: (image) => {
      if (image)
        setPostDataDB({
          ...PostDataDB,
          avatar: image,
        });
    },
  });

  //modal and alert
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [successPost, setSuccess] = useState(false);
  const [errorPost, setError] = useState(false);

  const handleConfirm = async () => {
    if (
      !PostDataDB.nameCategoryService ||
      !PostDataDB.descriptionCategoryService ||
      !PostDataDB.active ||
      !PostDataDB.avatar
    ) {
      setError(true);
      setShowConfirmationModal(false);
      return;
    }

    const token = await getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };

    const formData = new FormData();
    formData.append("nameCategoryService", PostDataDB.nameCategoryService);
    formData.append(
      "descriptionCategoryService",
      PostDataDB.descriptionCategoryService
    );
    formData.append("active", PostDataDB.active);
    formData.append("avatar", {
      uri: PostDataDB.avatar.uri,
      name: PostDataDB.avatar.name,
      type: PostDataDB.avatar.type,
    });

    postData("/admin/category-services/new-category", formData, headers, (data) => {
      if (error || data == null) {
        setError(true);
        setShowConfirmationModal(false);
        return;
      }
      else{
        setSuccess(true);
        setShowConfirmationModal(false);
        return;
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Svg height="580" width="700" style={styles.footer}>
          <Polygon points="0,0 600,450 0,250" fill={BasicStylesPage.color2} />
        </Svg>
        <Svg height="340" width="700" style={styles.footer}>
          <Polygon points="0,0 800,280 0,500" fill={BasicStylesPage.color0} />
        </Svg>
        <View>
          <CustomLogo styleLogo={styles.logoContainer} />
        </View>
        {/* image from piker images.uri*/}

        <View style={styles.formContainer}>
          <View style={styles.fieldContainer}>
            <CustomInTextField
              label="Categoria"
              style={styles.input}
              placeholder="Categoria"
              value={PostDataDB.nameCategoryService}
              onChangeText={(text) => handleChange("nameCategoryService", text)}
            />

            <View>
              <View style={styles.imageContainer}>
                {PostDataDB.avatar && (
                  <Image
                    source={{ uri: PostDataDB.avatar.uri }}
                    style={styles.image}
                  />
                )}
              </View>
              {/* <View style={styles.imageContainer}>
                {PostDataDB.avatar.length > 0 && (
                  <CustomCarrousel data={PostDataDB.avatar} />
                )}
              </View> */}
              <BasicIconImagePicker buttonStyle={styles.imgPiker} />
              <BasicIconImagePhoto buttonStyle={styles.imgPhoto} />
            </View>

            <CustomInTextArea
              label="Descripcion"
              style={styles.inputTextArea}
              placeholder="Descripcion"
              value={PostDataDB.descriptionCategoryService}
              onChangeText={(text) =>
                handleChange("descriptionCategoryService", text)
              }
            />

            <CustomButton
              text="Activo"
              onPress={() => setPostDataDB({ ...PostDataDB, active: true })}
              buttonStyle={styles.button}
            />

            {errorPost && (
              <CustomErrorBanner
                text="No se pudo crear la categoria. Por favor, verifique sus credenciales."
                styleBanner={styles.errorBanner}
                onChange={() => setError(false)}
              />
            )}

            <CustomButton
              text="Enviar"
              onPress={() => setShowConfirmationModal(true)}
              buttonStyle={styles.button}
            />

            <CustomAlertConfirmation
              isVisible={showConfirmationModal}
              message="¿Está seguro de realizar esta acción? 0_0"
              onConfirm={handleConfirm}
              onCancel={() => setShowConfirmationModal(false)}
            />
            <CustomSuccessAlert
              isVisible={successPost}
              message="Post creado con éxito!!"
              onConfirm={goToShowCaracteristic}
            />

            <CustomTermsAndConditionsAlert
              isVisible={showTermsAndConditions}
              onConfirm={() => setShowTermsAndConditions(false)}
              onCancel={() => setShowTermsAndConditions(false)}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: BasicStylesPage.color3,
  },
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  fieldContainer: {
    backgroundColor: BasicStylesPage.color3,
    borderRadius: 60,
    width: "85%",
    height: "80%",
    marginBottom: "30%",
    marginTop: 100,
    paddingTop: 40,
    alignItems: "center",
  },
  input: {
    marginBottom: 16,
    width: 190,
  },

  inputTextArea: {
    marginBottom: 40,
    width: 240,
    height: 130,
    paddingTop: 10,
  },
  button: {
    padding: 10,
    marginTop: 8,
  },

  logoContainer: {
    position: "absolute",
    width: 120,
    height: 120,
  },

  imageContainer: {
    width: 350,
    height: 200,
    marginTop: 10,
    marginBottom: 30,
    overflow: "hidden",
    borderColor: BasicStylesPage.color1,
    borderWidth: 2,
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imgPiker: {
    position: "absolute",
    bottom: -90,
    right: 0,
    backgroundColor: BasicStylesPage.color2 + 99,
    padding: 10,
    borderRadius: 38,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    marginBottom: 70,
  },
  imgPhoto: {
    position: "absolute",
    bottom: -90,
    right: 80,
    backgroundColor: BasicStylesPage.color2 + 99,
    padding: 10,
    borderRadius: 38,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    marginBottom: 70,
  },

  errorBanner: {
    marginTop: 20,
    marginLeft: "8%",
    marginRight: "8%",

  },
});

export default CreateCategoryScreen;
