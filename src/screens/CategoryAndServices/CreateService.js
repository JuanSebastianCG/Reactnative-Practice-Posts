import React, { useEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet, ScrollView } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { usePostData, useGetData } from "../../utils/useAxios";
import { Polygon, Svg } from "react-native-svg";

import {
  CustomButton,
  CustomDropDown,
} from "../../public/customComponent/Basic_Components";
import { CustomLogo } from "../../public/customComponent/Basic_PageInterface";
import {
  CustomInTextField,
  CustomInTextArea,
} from "../../public/customComponent/Basic_FormComponents";
import BasicStylesPage from "../../public/cssStyles/Basic_Style";
import {
  ImagePickerComponent,
  ImagePhotoPickerComponent,
} from "../../components/cameraAndGalery/CamaraGaleryPicker.js";
import {
  CustomSuccessAlert,
  CustomAlertConfirmation,
  CustomErrorBanner,
} from "../../public/customComponent/Basic_AlertComponent";

import { CustomCarrousel } from "../../public/customComponent/Basic_CarrouselComponent";
import { TokenUserManager } from "../../utils/asyncStorage";

function CreateServiceScreen() {
  const navigation = useNavigation();
  const goToShowServices = () => navigation.navigate("ShowServicesScreen");
  const { getToken } = TokenUserManager();

  //api
  const { postData, error } = usePostData();
  const { getData, errorGet } = useGetData();

  const [PostDataDB, setPostDataDB] = useState({
    name: "Post Test",
    description: "Cardenas,Cristian,Sergio",
    active: true,
    categoryService: "",
    photos: [],
  });
  const handleChange = (name, value) => {
    setPostDataDB({ ...PostDataDB, [name]: value });
  };

  //image picker and photo
  const { BasicIconImagePicker } = ImagePickerComponent({
    onComplete: (image) => {
      if (image)
        setPostDataDB({
          ...PostDataDB,
          photos: [...PostDataDB.photos, image],
        });
    },
  });

  const { BasicIconImagePhoto } = ImagePhotoPickerComponent({
    onComplete: (image) => {
      if (image)
        setPostDataDB({
          ...PostDataDB,
          photos: [...PostDataDB.photos, image],
        });
    },
  });

  //modal and alert
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [successPost, setSuccess] = useState(false);
  const [errorPost, setError] = useState(false);
  const [dataPostCategories, setDataPostCategories] = useState([]);

  const handleConfirm = () => async () => {
    if (
      !PostDataDB.name ||
      !PostDataDB.description ||
      !PostDataDB.active ||
      !PostDataDB.categoryService ||
      !PostDataDB.photos
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
    };
    const formData = new FormData();
    formData.append("name", PostDataDB.name);
    formData.append("description", PostDataDB.description);
    formData.append("active", PostDataDB.active);
    formData.append("categoryService", PostDataDB.categoryService);
    PostDataDB.photos.forEach((image, index) => {
      formData.append("photos", {
        uri: image.uri,
        name: image.name,
        type: image.type,
      });
    });

    postData("/admin/services/new-service", formData, headers, (data) => {
      if (error || data == null) {
        setError(true);
        setShowConfirmationModal(false);
        return;
      } else {
        setSuccess(true);
        setShowConfirmationModal(false);
        return;
      }
    });
  };

  useEffect(() => {
    handleGetDataCategories();
  }, []);

  const handleGetDataCategories = async () => {
    const url = "/admin/category-services";
    const header = {
      Authorization: `Bearer ${await getToken()}`,
    };
    getData(
      url,
      (data) => {
        if (error && !data) {
          setErrorPost(true);
          return;
        }
        newData = [];
        data = data.map((item) => {
          newData.push(item.nameCategoryService);
        });
        setDataPostCategories(newData);
      },
      header
    );
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
              value={PostDataDB.name}
              onChangeText={(text) => handleChange("name", text)}
            />

            <View>
              <View style={styles.imageContainer}>
                {PostDataDB.photos.length > 0 && (
                  <CustomCarrousel data={PostDataDB.photos} />
                )}
              </View>
              <BasicIconImagePicker buttonStyle={styles.imgPiker} />
              <BasicIconImagePhoto buttonStyle={styles.imgPhoto} />
            </View>

            <CustomInTextArea
              label="Descripcion"
              style={styles.inputTextArea}
              placeholder="Descripcion"
              value={PostDataDB.description}
              onChangeText={(text) => handleChange("description", text)}
            />

            <CustomDropDown
              label="Tipo de documento"
              value={PostDataDB.categoryService}
              items={dataPostCategories}
              generalStyle={styles.generalDropDown}
              generalBorderStyle={styles.generalBorderDropDown}
              itemStyle={{}}
              fontInputStyle={{ color: BasicStylesPage.color4 }}
              onItemSlected={(item) => handleChange("categoryService", item)}
              placeholder={"Categoria"}
              styleLogo={{
                marginLeft: 2,
              }}
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
              onConfirm={handleConfirm()}
              onCancel={() => setShowConfirmationModal(false)}
            />
            <CustomSuccessAlert
              isVisible={successPost}
              message="Post creado con éxito!!"
              onConfirm={goToShowServices}
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

  inputDropDown: {
    marginBottom: 16,
    width: 190,
  },
  generalDropDown: {
    backgroundColor: BasicStylesPage.color3,
    width: 200,
    height: 50,
    top: 10,
    marginBottom: 16,
  },
  generalBorderDropDown: {
    borderRadius: 30,
    borderWidth: 2,
    borderColor: BasicStylesPage.color0 + 99,
    borderRadius: 30,
  },
});

export default CreateServiceScreen;
