import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Modal,
  Button,
  Image
} from "react-native";

import { Circle, Svg } from "react-native-svg";
import {
  useGetData,
  useDeleteData,
  imageEndpointApi,
  usePostData
} from "../../utils/useAxios";
import { TokenUserManager } from "../../utils/asyncStorage";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { CustomCarrousel } from "../../public/customComponent/Basic_CarrouselComponent";
import { CustomErrorAlert } from "../../public/customComponent/Basic_AlertComponent";
import BasicStylesPage from "../../public/cssStyles/Basic_Style";
import { CustomButton } from "../../public/customComponent/Basic_Components";
import VideoPlayer from "../../components/cameraAndGalery/VideoPLayer";

function ShowPostsScreen() {
  const { getData, loading, error, data } = useGetData();
  const [isDeleted, setIsDeleted] = useState(false);
  const { getToken, getInfoToken } = TokenUserManager();
  const [errorPost, setErrorPost] = useState(false);
  
  const { deleteData, loadingDelete, errorDelete, dataDelete } =
    useDeleteData();

  const navigation = useNavigation();
  const gotToLogin = () => navigation.navigate("LoginScreen");
  const [posts, setPosts] = useState([]);
  const { postData, errorPostLike } = usePostData();

  const [userId, setUserId] = useState("");

  const getUserId = async () => {
    setUserId((await getInfoToken("_id")));
    
  };
  

  useEffect(() => {
    handleGetData();
    setIsDeleted(false);
  }, [isDeleted, data]);

  const handleError = () => {
    setErrorPost(false);
    gotToLogin();
  };

  const handleGetData = async () => {
    const url = "/posts";
    const header = {
      Authorization: `Bearer ${await getToken()}`,
    };
    getData(
      url,
      (data) => {
        if (error && !data) {
          console.log(error[1]);
          if (error[1] == "jwt expired") {
            setErrorPost(true);
          }
          return;
        }
        if(data){
          for (let i = 0; i < data.length; i++) {
            /* add camp media to data */
            /* add images */
            photos = data[i].photos.map((photo) => {
              return {
                uri: `${imageEndpointApi}/${photo}`,
              };
            });
            /* add videos */
            videos = data[i].videos.map((video) => {
              return {
                uri: `${imageEndpointApi}/${video}`,
              };
            });
            data[i].media = [...photos, ...videos];
          }
          setPosts(data);
      }
       
      },
      header
    );
  };
  const handleDelete = async (id) => {
    const url = `/posts/${id}`;
    const header = {
      Authorization: `Bearer ${await getToken()}`,
    };
    deleteData(
      url,
      (data) => {
        if (data) {
          setPosts(posts.filter((post) => post._id !== id));
          setIsDeleted(true);
        }
      },
      header
    );
  };


  const handleLike= async (postId)=>{
    try {
      await getUserId()
      const url = "/likes";
      const token = async () => await getToken();
      const headers = {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };
      const formData = new FormData();
      formData.append("user",userId);
      formData.append("post", postId);
    console.log(formData)
      postData(url, formData, headers, (data) => {
        if (error || !data) {
          console.log("error l subir el like")
        } else {
          console.log("success al registrar el like");
        }
      });
    } catch (error) {
      console.error("Error al procesar el like:", error);
    }

  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          scrollIndicatorInsets={{ bottom: 300 }}>
          {/* {loading && <ActivityIndicator size="large" color={BasicStylesPage.color2} />} */}

          <CustomErrorAlert
            isVisible={errorPost}
            message="¿estas logueado  0.0?  "
            onConfirm={handleError}
          />

          {posts.map((post, index) => (
            <View style={styles.cards} key={index}>
              <Card post={post} handleDelete={handleDelete} handleLike={handleLike} />
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("CreatePostScreen")}>
          <Icon name="plus" size={60} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    
  );
}

function Card({ post, handleDelete, handleLike }) {
  const [isLiked, setLiked] = useState(false);
  const [modalVisible, setModalVisible] = useState([]);
  const navigation = useNavigation();

  return (
    <View style={styleCard.card} key={post._id}>
      <Svg width="400" height="500" style={styleCard.cardCircle}>
        <Circle cx="200" cy="160" r="70" fill={BasicStylesPage.color2 + 90} />
      </Svg>
      <View style={styleCard.cardHeader}>
        <CustomCarrousel
          data={post.media}
          renderItem={(index, focused) => {
            return (
              <View style={{ width: "100%", height: "100%" }}>
                {post.media[index].uri.includes(".mp4") ? (
                  <VideoPlayer uri_Video={post.media[index].uri} />
                ) : (
                  <Image
                    source={{ uri: post.media[index].uri }}
                    style={styleCard.avatarImage}
                  />
                )}
              </View>
            );
          }}
        />

        <View style={styleCard.titleHeader}>
          <Text style={styleCard.title}>{post.title}</Text>
          
        </View>

        <TouchableOpacity
          style={styleCard.likeButton}
          onPress={() => {setLiked((isLiked) => !isLiked); isLiked? console.log("error"): handleLike(post._id) }}>
          <Icon name={isLiked ? "heart" : "heart-outline"}
                size={32}
                color={isLiked ? "red" : "black"}/>
        </TouchableOpacity>

        <TouchableOpacity
          style={styleCard.moreButton}
          onPress={()=>setModalVisible(true)}>
          <Text>ver mas</Text>    
        </TouchableOpacity>

        <Modal visible={modalVisible} 
          onrequestClose={()=>setModalVisible(false)}
          animation="slide"
          >
              
          <View style={styleCard.cardHeader}>
          <CustomCarrousel
          data={post.media}
          renderItem={(index, focused) => {
            return (
              <View style={{ width: "100%", height: "100%" }}>
                {post.media[index].uri.includes(".mp4") ? (
                  <VideoPlayer uri_Video={post.media[index].uri} />
                ) : (
                  <Image
                    source={{ uri: post.media[index].uri }}
                    style={styleCard.avatarImage}
                  />
                )}
              </View>
            );
          }}
        />

          <View style={styleCard.titleHeader}>
            <Text style={styleCard.title}>{post.title}</Text>
          </View>
          
        </View>
        <View style={styleCard.cardBody}>
          <TouchableOpacity
            style={styleCard.deleteButton}
            onPress={() => handleDelete(post._id)}>
            <Icon name="trash-can" size={40} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styleCard.editButton}
            onPress={() =>{setModalVisible(false); navigation.navigate("UpdatePostScreen",{ id: post._id });} }>
            <Icon name="pencil" size={40} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styleCard.likeButtonModal}
            onPress={() =>{ setLiked((isLiked) => !isLiked);  isLiked? console.log("error"): handleLike(post._id) }}>
            <Icon name={isLiked ? "heart" : "heart-outline"}
                  size={32}
                  color={isLiked ? "red" : "black"}/>
          </TouchableOpacity>
                
            <Text style={styleCard.subtitle}>{post.subtitle}</Text>
            <Text style={styleCard.description}>{post.description}</Text>
                <CustomButton text="salir" onPress={()=>setModalVisible(false)} buttonStyle={styles.button}></CustomButton>  
            </View>
            
        </Modal>
      </View>
    </View>
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
    height: "100%",
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
    backgroundColor: BasicStylesPage.color6,
    position: "absolute",
    marginTop: 20,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: "flex-start",
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
    height: 100,
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
    bottom: 10,
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
    bottom: 10,
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
  likeButtonModal: {
    position: "absolute",
    bottom: 10,
    right: 250,
    width: 60,
    height: 60,
    backgroundColor: BasicStylesPage.color4 + 95,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    marginBottom:70
  },
  likeButton: {
    position: "absolute",
    bottom: 10,
    right: 250,
    width: 60,
    height: 60,
    backgroundColor: BasicStylesPage.color4 + 95,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  moreButton: {
    position: "absolute",
    bottom: 10,
    right: 40,
    width: 60,
    height: 60,
    backgroundColor: BasicStylesPage.color4 + 95,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    marginTop: 80,
  },
  
  button: {
    padding: 10,
    marginTop: 8,
    backgroundColor: BasicStylesPage.color4 + 95,
  },
  modalContainer:{
    flex:1,
    justifyContent:"center",
    alignContent:"center",
    alignItems:"center",
    width:200,
    height:150,
    marginLeft:100
},
});

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: "relative",
  },
  addButton: {
    position: "absolute",
    bottom: 16,
    right: 15,
    width: 80,
    height: 80,
    backgroundColor: BasicStylesPage.color4 + 80,
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
    marginTop: 50,
    paddingBottom: 150,
  },
  cards: {
    marginBottom: 20,
  },
});

export default ShowPostsScreen;
