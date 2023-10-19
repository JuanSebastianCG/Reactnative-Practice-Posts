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
import ImagePickerComponent from "../../../public_styles/component_public_Styles/Basic_ImageComponent";
import { CustomSuccessAlert,CustomAlertConfirmation} from "../../../public_styles/component_public_Styles/Basic_AlertComponent";

function CreatePostScreen() {
  const navigation = useNavigation();
  //api
  const { postData, loading, error, data } = usePostData();
  
  //imagepiker
  const { BasicViewPicker, imageUri } = ImagePickerComponent();

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
  });

  const handleConfirm = () => {
    const url = "https://apis-backend-dm.up.railway.app/api/v1/posts";
    const headers = {
      "Content-Type": "application/json",
    };
    const body = {
      title: PostDataDB.title,
      subtitle: PostDataDB.subtitle,
      description: PostDataDB.description,
      avatar: imageUri,
    };
    postData(url, headers, body, (data) => {
      console.log(data);
      if (error || !data) {
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
        {/* image from piker imageUri*/}

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
            <BasicViewPicker />

            <View style={styles.imageContainer}>
              {imageUri && (
                <Image source={{ uri: imageUri }} style={styles.image} />
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
