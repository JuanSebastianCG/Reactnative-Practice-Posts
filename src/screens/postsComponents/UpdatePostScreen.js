import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
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
import {
    useGetData,
    useDeleteData,
    useUpdateData,
    imageEndpointApi,
    usePostData
  } from "../../utils/useAxios";
import VideoPlayer from "../../components/cameraAndGalery/VideoPLayer.js";

function UpdatePostScreen() {
    const route = useRoute();
const { id } = route.params;
const { getData, loading, errorData, data } = useGetData();
const [posts, setPosts] = useState([]);
  const navigation = useNavigation();
  const goToShowPosts = () => navigation.navigate("ShowPostsScreen");
  const { getToken } = TokenUserManager();
  const{updateData, loadingUpdate, errorUpdate, dataUpdate } = useUpdateData();
  const [lastImages, setLastImages] = useState([]);
  const [allImages, setAllImages] = useState([]);

  //api
  const { postData,  error  } = usePostData();

  const handleChange = (name, value) => {
    setPostDataDB({ ...PostDataDB, [name]: value });
  };
  const [PostDataDB, setPostDataDB] = useState({
    title: "",
    subtitle: "",
    description: "",
    avatars: [],
    media:[]
  });

  useEffect(() => {
    handleGetData();
  }, []);


  const handleGetData = async () => {
    const url = `/posts`;
    const header = {
      Authorization: `Bearer ${await getToken()}`,
    };
    getData(
      url,
      (data) => {
        if (error && !data) {
          console.log("error")
          return;
        }
        for (let i = 0; i < data.length; i++) {
          photos = data[i].photos.map((photo) => {
            return {
              uri: `${imageEndpointApi}/${photo}`,
            };
          });
          videos = data[i].videos.map((video) => {
            return {
              uri: `${imageEndpointApi}/${video}`,
            };
          });
          setAllImages([...photos, ...videos])
          
          setLastImages([...photos, ...videos])
          
        }
  
        
        const postEncontrado = data.find(post => post._id === id);
        
        if (postEncontrado) {
        setPostDataDB({
            title: postEncontrado.title || "",
            subtitle: postEncontrado.subtitle || "",
            description: postEncontrado.description || "",
            media: postEncontrado.media || [],
        });
        } else {
        console.log(`No se encontró ningún post con el id ${id}`);
        }
      },
      header
    );

    //http://192.168.20.26:3000/api/v1/uploads/post/1697776043933-1fd0c384-43c2-4c48-8818-80ca2a166a9a.jpeg
  };



  const { BasicIconMediaPicker } = MediaPickerComponent({

    onComplete: (image) => {
      console.log(image);
      if (image) {
        setPostDataDB({
          ...PostDataDB,
          media: [...PostDataDB.media, image],
        });
        console.log(PostDataDB.media);
        setAllImages([...allImages, image])
      }
    },
  });
  

  const { BasicIconImagePhoto } = ImagePhotoPickerComponent({
    onComplete: (image) => {
      if (image)
        setPostDataDB({
          ...PostDataDB,
          media: [...PostDataDB.media, image],
        });
        setAllImages([...allImages, image])
    },
  });
  //modal and alert
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [successPost, setSuccess] = useState(false);
  const [errorPost, setError] = useState(false);

  const handleConfirm = () => {
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
    const url = `/posts/edit/${id}`;
    const token =  async () => await getToken()
    const headers = {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };

    const formData = new FormData();
    formData.append("id", id)
    formData.append("lastImages", lastImages)
    formData.append("title", PostDataDB.title);
    formData.append("subtitle", PostDataDB.subtitle);
    formData.append("description", PostDataDB.description);

    PostDataDB.media.forEach((image, index) => {
      if (PostDataDB.media[index].uri.includes(".mp4")) {
        formData.append("videos", {
          name: `video${index}.mp4`,
          type: image.type,
          uri: image.uri,
        });
      }
      if (PostDataDB.media[index].uri.includes(".jpeg")) {
        formData.append("photos", {
          name: `image${index}.jpeg`,
          type: image.type,
          uri: image.uri,
        });
      }
    });

   /*  const body = {
      title: formData._parts[1][1],
      subtitle: formData._parts[2][1],
      description: formData._parts[3][1],
      photos: formData._parts[4][1],
      videos: formData._parts[5][1],
      lastImages: formData._parts[0][1]
    };
    

    console.log(body) */
    console.log(formData)
    updateData(url, formData, headers, (data) => {
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
                
                  <CustomCarrousel
                  data={allImages}
                  renderItem={(index, focused) => {
                    return (
                      <View style={{ width: "100%", height: "100%" }}>
                        {allImages[index].uri.includes(".mp4") ? (
                          <VideoPlayer uri_Video={allImages[index].uri} />
                        ) : (
                          <Image
                            source={{ uri: allImages[index].uri }}
                            style={styleCard.avatarImage}
                          />
                        )}
                      </View>
                    );
                  }}
                />
                
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
              message="Post editado con éxito!!"
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

const styleCard = StyleSheet.create({
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  
});

export default UpdatePostScreen;
