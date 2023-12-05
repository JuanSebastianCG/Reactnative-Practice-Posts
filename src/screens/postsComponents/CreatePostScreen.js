import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
} from "react-native";
import VideoPlayer from "../../components/cameraAndGalery/VideoPLayer";

import { useNavigation } from "@react-navigation/native";
import { usePostData } from "../../utils/useAxios";
import { Polygon, Svg } from "react-native-svg";

import { CustomButton } from "../../public/customComponent/Basic_Components";
import { CustomLogo } from "../../public/customComponent/Basic_PageInterface";
import {
  CustomInTextField,
  CustomInTextArea,
} from "../../public/customComponent/Basic_FormComponents";
import BasicStylesPage from "../../public/cssStyles/Basic_Style";
import {
  MediaPickerComponent,
  ImagePhotoPickerComponent,
} from "../../components/cameraAndGalery/CamaraGaleryPicker.js";
import {
  CustomSuccessAlert,
  CustomAlertConfirmation,
  CustomErrorBanner,
} from "../../public/customComponent/Basic_AlertComponent";

import { CustomCarrousel } from "../../public/customComponent/Basic_CarrouselComponent";
import { TokenUserManager } from "../../utils/asyncStorage";

function CreatePostScreen() {
  const navigation = useNavigation();
  const goToShowPosts = () => navigation.navigate("ShowPostsScreen");
  const { getToken } = TokenUserManager();

  //api
  const { postData, error } = usePostData();

  const handleChange = (name, value) => {
    setPostDataDB({ ...PostDataDB, [name]: value });
  };
  const [PostDataDB, setPostDataDB] = useState({
    title: "post 1",
    subtitle: "post 1",
    description: "post 1",
    media: [],
  });

  //image picker and photo
  const { BasicIconMediaPicker } = MediaPickerComponent({
    onComplete: (image) => {
      console.log(image);
      if (image)
        setPostDataDB({
          ...PostDataDB,
          media: [...PostDataDB.media, image],
        });
    },
  });

  const { BasicIconImagePhoto } = ImagePhotoPickerComponent({
    onComplete: (image) => {
      if (image)
        setPostDataDB({
          ...PostDataDB,
          media: [...PostDataDB.media, image],
        });
    },
  });

  //modal and alert
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [successPost, setSuccess] = useState(false);
  const [errorPost, setError] = useState(false);

  const handleConfirm = async () => {
    if (
      !PostDataDB.title ||
      !PostDataDB.subtitle ||
      !PostDataDB.description ||
      !PostDataDB.media
    ) {
      setError(true);
      setShowConfirmationModal(false);
      return;
    }
    const url = "/posts";
    const token = async () => await getToken();
    const headers = {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };
    const formData = new FormData();
    formData.append("title", PostDataDB.title);
    formData.append("subtitle", PostDataDB.subtitle);
    formData.append("description", PostDataDB.description);
    PostDataDB.media.forEach((image, index) => {
      if (image.type == "video/mp4") {
        formData.append("videos", {
          name: `video${index}.mp4`,
          type: image.type,
          uri: image.uri,
        });
      }
      if (image.type == "image/jpeg") {
        formData.append("photos", {
          name: `image${index}.jpg`,
          type: image.type,
          uri: image.uri,
        });
      }
    });
    console.log(PostDataDB);
    postData(url, formData, headers, (data) => {
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
        {/* image from piker images.uri*/}

        <View style={styles.formContainer}>
          <View style={styles.fieldContainer}>
            <CustomInTextField
              label="Titulo"
              style={styles.input}
              placeholder="Titulo"
              value={PostDataDB.title}
              onChangeText={(text) => handleChange("title", text)}
            />

            <View>
              <View style={styles.imageContainer}>
                {PostDataDB.media.length > 0 && (
                  <CustomCarrousel
                    data={PostDataDB.media}
                    renderItem={(index) =>
                      PostDataDB.media[index].type == "video/mp4" ? (
                        /* video */
                        <VideoPlayer
                          uri_Video={PostDataDB.media[index].uri}
                          focus={true}
                        />
                      ) : (
                        /* image */
                        <Image
                          style={styles.image}
                          source={{ uri: PostDataDB.media[index].uri }}
                        />
                      )
                    }
                  />
                )}
              </View>
              <BasicIconMediaPicker buttonStyle={styles.imgPiker} />
              <BasicIconImagePhoto buttonStyle={styles.imgPhoto} />
            </View>

            <CustomInTextField
              label="Subtitulo"
              style={styles.input}
              placeholder="Subtitulo"
              value={PostDataDB.subtitle}
              onChangeText={(text) => handleChange("subtitle", text)}
            />

            <CustomInTextArea
              label="Descripcion"
              style={styles.inputTextArea}
              placeholder="Descripcion"
              value={PostDataDB.description}
              onChangeText={(text) => handleChange("description", text)}
            />

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
});

export default CreatePostScreen;
