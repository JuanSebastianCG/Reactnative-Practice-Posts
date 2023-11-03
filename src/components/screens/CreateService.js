import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Image
} from "react-native";

import DropDownPicker from "react-native-dropdown-picker";
import {TokenUserManager} from "../../utils/as"
import { Checkbox } from "react-native-paper";

import { useNavigation } from "@react-navigation/native";
import { usePostData } from "../../utils/useAxios";
import { Polygon, Svg } from "react-native-svg";

import {
  CustomButton,
  CustomErrorBanner,
  CustomLogo,
} from "../../public_styles/component_public_Styles/Basic_Components_F";
import {
  CustomInTextField,
  CustomInTextArea,
} from "../../public_styles/component_public_Styles/Basic_FormComponents_F";
import BasicStylesPage from "../../public_styles/css_public_Styles/Basic_Style";
import {
  ImagePickerComponent,
  ImagePhotoPickerComponent,
} from "../../public_styles/component_public_Styles/Basic_ImageComponent";
import {
  CustomSuccessAlert,
  CustomAlertConfirmation,
} from "../../public_styles/component_public_Styles/Basic_AlertComponent";
import { Picker } from "@react-native-picker/picker";



function CreateService() {

    const [isChecked, setIsChecked] = useState(false);
  const navigation = useNavigation();
const { getToken } = TokenUserManager();
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };


  const getCurrentDate=()=>{
 
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return date + '-' + month + '-' + year;//format: d-m-y;
}

const { BasicIconImagePicker } = ImagePickerComponent({
  onComplete: (image) => {
    if (image)
      setPostDataDB({
        ...PostDataDB,
        avatars: [...PostDataDB.avatars, image],
      });
  },
});

const { BasicIconImagePhoto } = ImagePhotoPickerComponent({
  onComplete: (image) => {
    if (image)
      setPostDataDB({
        ...PostDataDB,
        avatars: [...PostDataDB.avatars, image],
      });
  },
});

  //api
  const { postData, loading, error, data } = usePostData();

  const handleChange = (name, value) => {
    setPostDataDB({ ...PostDataDB, [name]: value });
  };
  const [PostDataDB, setPostDataDB] = useState({
    name: "None",
    description: "None",
    active: false,
    category:"None",
    avatars: [],
    createdAt: getCurrentDate()
  });

 
  //modal and alert
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [successPost, setSuccess] = useState(false);
  const [errorPost, setError] = useState(false);

  const handleConfirm = () => {
    if (
      !PostDataDB.name ||
      !PostDataDB.category ||
      !PostDataDB.description ||
      !PostDataDB.avatars ||
      !PostDataDB.createdAt||
      !PostDataDB.active
    ) {
      setError(true);
      setShowConfirmationModal(false);
      return;
    }
    const url = "/admin/services/new-service";
    const headers = {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    };
    const formData = new FormData();
    formData.append("name", PostDataDB.name);
    formData.append("description", PostDataDB.description);
    formData.append("active", PostDataDB.active);
    formData.append("createdAt", PostDataDB.createdAt);
    formData.append("category", PostDataDB.category);
    PostDataDB.avatars.forEach((image, index) => {
      formData.append("avatars", {
        uri: image.uri,
        name: image.name,
        type: image.type,
      });
    });

    postData(url, headers, formData, (data) => {
      if (error || !data) {
        console.log("Error:", error);
        setError(true);
      } else {
        navigation.navigate("HomeScreen")
        setSuccess(true);
      }
    });
    setShowConfirmationModal(false);
  };

    useEffect(() => {
        handleGetData();
    },);

  const handleGetData = async () => {
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
        setDataPost(data);
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
              label="Nombre"
              style={styles.input}
              placeholder="Nombre"
              value={PostDataDB.name}
              onChangeText={(text) => handleChange("name", text)}
            />
            <CustomInTextArea
              label="Descripcion"
              style={styles.inputTextArea}
              placeholder="Descripcion"
              value={PostDataDB.description}
              onChangeText={(text) => handleChange("description", text)}
            />

            <Checkbox.Item
            label="Activar"
            status={isChecked ? "checked" : "unchecked"}
            onPress={handleCheckboxChange}
            onChangeItem={(active) => handleChange("active",active)}
          />
            <DropDownPicker
                style={styles.select}
                items={[
                    { label: 'Choose a category', value: null }, 
                    handleGetData()
                  ]}
                value={PostDataDB.category}
                containerStyle={{ height: 40 }}
                onChangeItem={(category) => handleChange("category",category)}
                >   
            </DropDownPicker>

            <View>
              <View style={styles.imageContainer}>
                {PostDataDB.avatars.length > 0 && (
                  <CustomCarrousel data={PostDataDB.avatars} />
                )}
              </View>

              <BasicIconImagePicker buttonStyle={styles.imgPiker} />
              <BasicIconImagePhoto buttonStyle={styles.imgPhoto} />

            </View>

            {errorPost && (
              <CustomErrorBanner
                text="No se pudo crear el post. Por favor, verifique sus credenciales."
                styleBanner={styles.errorBanner}
                onChange={() => setError(false)}
              />
            )}

            <CustomButton
              text="Crear"
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

export default CreateService;
