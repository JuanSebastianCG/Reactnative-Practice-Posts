import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { Stack } from "@react-native-material/core";

import { useNavigation } from "@react-navigation/native";
import { usePostData } from "../../../utils/useAxios";
import { Polygon, Svg } from "react-native-svg";

import {
  CustomButton,
  CustomErrorBanner,
  CustomLogo,
} from "../../../public_styles/component_public_Styles/Basic_Components_F";
import CustomInTextField from "../../../public_styles/component_public_Styles/Basic_FormComponents_F";
import BasicStylesPage from "../../../public_styles/css_public_Styles/Basic_Style";
import {
  ImagePickerComponent,
  ImagePhotoPickerComponent,
} from "../../../public_styles/component_public_Styles/Basic_ImageComponent";
import {
  CustomSuccessAlert,
  CustomAlertConfirmation,
} from "../../../public_styles/component_public_Styles/Basic_AlertComponent";

function CreatePostScreen() {
  const navigation = useNavigation();

  //api
  const { postData, loading, error, data } = usePostData();

  //imagepiker
  const [actualImage, setActualImage] = useState(null);
  
  const { BasicViewPicker, BasicIconImagePicker } = ImagePickerComponent({
    onComplete: (image) => setActualImage(image),
  });
  const { BasicViewPhoto, BasicIconImagePhoto } = ImagePhotoPickerComponent({
    onComplete: (image) => setActualImage(image),
  });

  //modal and alert
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [successPost, setSuccess] = useState(false);
  const [errorPost, setError] = useState(false);

  const handleChange = (name, value) => {
    setPostDataDB({ ...PostDataDB, [name]: value });
  };
  const goToShowPosts = () => navigation.navigate("ShowPostsScreen");

  const [PostDataDB, setPostDataDB] = useState({
    title: "",
    subtitle: "",
    description: "",
    avatar: {
      uri: "",
      name: "",
      type: "",
    },
  });

  const handleConfirm = () => {
    const url = "/posts";
    const headers = {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    };
    if (!actualImage) {
      setError(true);
      return;
    }

    const formData = new FormData();
    formData.append("title", PostDataDB.title);
    formData.append("subtitle", PostDataDB.subtitle);
    formData.append("description", PostDataDB.description);

    const localUri = actualImage.uri;
    const filename = localUri.split("/").pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image`;
    console.log("filename:",filename);

    formData.append("avatar", {
      uri: localUri,
      name: filename,
      type,
    });

    postData(url, headers, formData, (data) => {
      if (error || !data) {
        console.log("Error:", error);
        setError(true);
      } else {
        setSuccess(true);
      }
    });
    setShowConfirmationModal(false);
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
        {/* image from piker actualImage.uri*/}

        <View style={styles.formContainer}>
          <View style={styles.fieldContainer}>
            <Stack spacing={16}>
              <CustomInTextField
                label="Titulo"
                style={styles.input}
                placeholder="Titulo"
                value={PostDataDB.title}
                onChangeText={(text) => handleChange("title", text)}
              />

              <CustomInTextField
                label="Subtitulo"
                style={styles.input}
                placeholder="Subtitulo"
                value={PostDataDB.subtitle}
                onChangeText={(text) => handleChange("subtitle", text)}
              />

              <CustomInTextField
                label="Descripcion"
                style={styles.input}
                placeholder="Descripcion"
                value={PostDataDB.description}
                onChangeText={(text) => handleChange("description", text)}
              />
            </Stack>

            <BasicIconImagePicker />

            <BasicIconImagePhoto />

            <View style={styles.imageContainer}>
              {actualImage && (
                <Image source={{ uri: actualImage.uri }} style={styles.image} />
              )}
            </View>
            {errorPost && (
              <CustomErrorBanner
                text="No se pudo crear el post. Por favor, verifique sus credenciales."
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
              onConfirm={goToShowPosts}
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
    marginTop: 80,
    paddingTop: 40,
    alignItems: "center",
  },
  input: {
    marginBottom: 16,
    width: 190,
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
    width: 240,
    height: 160,
    marginTop: 20,
    marginBottom: 20,
    overflow: "hidden",
    borderColor: BasicStylesPage.color0,
    borderWidth: 4,
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default CreatePostScreen;
