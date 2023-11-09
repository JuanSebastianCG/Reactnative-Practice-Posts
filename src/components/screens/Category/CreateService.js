import React, { useEffect, useState } from "react";
import { Checkbox } from "react-native-paper";
import { CustomLogo } from "../../../public_styles/component_public_Styles/Basic_PageInterface";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { Circle, Svg, Polygon } from "react-native-svg";
import {
  useGetData,
  useDeleteData,
  basicEndpoint,
} from "../../../utils/useAxios";
import { TokenUserManager } from "../../../utils/asyncStorage";

import BasicStylesPage from "../../../public_styles/css_public_Styles/Basic_Style";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { CustomCarrousel } from "../../../public_styles/component_public_Styles/Basic_CarrouselComponent";
import {
  CustomDropDown,
  CustomShowMultipleTag,
  CustomTag,
  CustomButton
} from "../../../public_styles/component_public_Styles/Basic_Components_F";

import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import {
    CustomInTextField,
    CustomInTextArea,
  } from "../../../public_styles/component_public_Styles/Basic_FormComponents_F";

  import {
    ImagePickerComponent,
    ImagePhotoPickerComponent,
  } from "../../../public_styles/component_public_Styles/Basic_ImageComponent";
  import {
    CustomSuccessAlert,
    CustomAlertConfirmation,
    CustomErrorBanner
  } from "../../../public_styles/component_public_Styles/Basic_AlertComponent";
import { Input } from "react-native-elements";

  
function CreateService() {
  const { getToken } = TokenUserManager();
  const { getData, loading, error } = useGetData();
  const [isChecked, setIsChecked] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [successPost, setSuccess] = useState(false);
  const [date, setDate] = useState();


  const [dataPost, setDataPost] = useState([]);
  const [dataPostCategories, setDataPostCategories] = useState([]);
  const [dataPostCategory, setDataPostCategory] = useState("");

  const navigation = useNavigation();
  const route = useRoute();

  const [errorPost, setErrorPost] = useState(false);
  const gotToLogin = () => navigation.navigate("LoginScreen");

  const [filterCategories, setFilterCategories] = useState(
    route.params?.categoryName ? [route.params?.categoryName] : []
  );

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    handleChange("active", isChecked)
    console.log(isChecked)
  };

  useEffect(() => {
    handleGetData();
    handleGetDataCategories();
    const intervalId = setInterval(() => {
      handleGetData();
      handleGetDataCategories();
    }, 5000);
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [filterCategories]);

  const handleError = () => {
    setErrorPost(false);
    gotToLogin();
  };


  const handleGetDataCategories = async () => {
    if (loading) return;
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
        console.log(newData)
        setDataPostCategories(newData);
      },
      header
    );
  };

  const handleGetData = async () => {
    if (loading) return;
    const url = "/admin/services";
    const header = {
      Authorization: `Bearer ${await getToken()}`,
    };
    getData(
      url,
      (data) => {
        if (error && !data) {
          console.log(error)
          setErrorPost(true);        
          return;
        }
        if (filterCategories.length > 0) {
          data = data.filter((item) =>
            filterCategories.includes(item.categoryService)
          );
        }

        for (let i = 0; i < data.length; i++) {
          uri = `${basicEndpoint}/${data[i].avatar}`;
          data[i].photos = data[i].photos.map((avatar) => {
            return { uri: `${basicEndpoint}/${avatar}` };
          });
        }
        setDataPost(data);
        
      },
      header
    );
  };

/* ============================================== */
    const getCurrentDate=()=>{
    
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
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

const [PostDataDB, setPostDataDB] = useState({
  name: "",
  description: "",
  active: isChecked,
  category:dataPostCategory,
  avatars: [],
  createdAt: getCurrentDate()
});


const handleChange = (atribute, value) => {
  setPostDataDB({ ...PostDataDB, [atribute]: value });
};


const handleConfirm = () => {
  if (
    !PostDataDB.name ||
    !PostDataDB.category ||
    !PostDataDB.description ||
    !PostDataDB.avatars ||
    !PostDataDB.createdAt||
    !PostDataDB.active
  ) {
    console.log(PostDataDB)
    setErrorPost(true);
    console.log("error al confirmar")
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
}
  /* ==============================Vista============================== */

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* <Svg height="580" width="700" style={styles.footer}>
          <Polygon points="0,0 600,450 0,250" fill={BasicStylesPage.color2} />
        </Svg>
        <Svg height="340" width="700" style={styles.footer}>
          <Polygon points="0,0 800,280 0,500" fill={BasicStylesPage.color0} />
        </Svg>
        <View>
          <CustomLogo styleLogo={styles.logoContainer} />
        </View> */}

        <View style={styles.formContainer}>
          <View style={styles.fieldContainer}>
            <Input
              label="Nombre"
              style={styles.input}
              value={PostDataDB.name}
              onChangeText={(text) => handleChange("name", text)}
            />
            <Input
              label="Descripcion"
              style={styles.inputTextArea}
              value={PostDataDB.description }
              onChangeText={(text) => handleChange("description", text)}
            />

            <Checkbox.Item
            label="Activar"
            status={isChecked ? "unchecked" : "checked"}
            onPress={handleCheckboxChange}
            onChangeItem={(active) => handleChange("active",active)}
          />
           
           <CustomDropDown
              items={dataPostCategories}
              label={"Categorias"}
              onItemSlected={(item) => {
                if (!filterCategories.includes(item)) {
                  setFilterCategories([...filterCategories, item]);
                  setDataPostCategory(item)
                  handleChange("category",item)
                  console.log(item)
                }
              }}
              showLastSelected={true}
            />
            

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
                onChange={() => setErrorPost(false)}
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

const styleCard = StyleSheet.create({
  card: {
    marginBottom: 10,
    marginLeft: "2%",
    width: "96%",
    borderRadius: 10,
    backgroundColor: BasicStylesPage.color3 + 60,
  },
  avatarImage: {
    width: "100%",
    height: "80%",
  },
  cardHeader: {
    padding: 10,
    flexDirection: "row",
    borderTopColor: BasicStylesPage.color4 + 90,
    borderTopWidth: 4,
    borderBottomColor: BasicStylesPage.color4 + 90,
    borderBottomWidth: 4,
    height: 200,
  },
  cardCircle: {
    position: "absolute",
    alignSelf: "center",
  },
  titleHeader: {
    backgroundColor: BasicStylesPage.color6 + 99,
    position: "absolute",
    marginTop: 20,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: "flex-start",
    width: 220,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: BasicStylesPage.color3,
  },
  subtitle: {
    fontSize: 14,
    color: BasicStylesPage.color1,
    fontStyle: "italic",
  },
  description: {
    fontSize: 14,
    color: BasicStylesPage.color5,
  },
  cardBody: {
    padding: 10,
    marginTop: 10,
    height: 130,
    borderBottomColor: BasicStylesPage.color2,
    borderBottomWidth: 4,
    borderLeftColor: BasicStylesPage.color2,
    borderLeftWidth: 4,
    borderRightColor: BasicStylesPage.color2,
    borderRightWidth: 4,
    borderRadius: 10,
  },
  deleteButton: {
    position: "absolute",
    top: -35,
    right: 80,
    width: 50,
    height: 50,
    backgroundColor: BasicStylesPage.color4 + 95,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    marginBottom: 70,
  },
  editButton: {
    position: "absolute",
    top: -39,
    right: 15,
    width: 60,
    height: 60,
    backgroundColor: BasicStylesPage.color4 + 95,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    marginBottom: 70,
  },
});

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: "relative",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 15,
    width: 80,
    height: 80,
    backgroundColor: BasicStylesPage.color4 + 70,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    marginBottom: 70,
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    flexGrow: 1,
    justifyContent: "flex-start",
    marginTop: 10,
    paddingBottom: 150,
  },
  cards: {
    marginBottom: 20,
  },
  inputContainer: {
    marginTop: 30,
    alignItems: "center",
  },
});

export default CreateService;