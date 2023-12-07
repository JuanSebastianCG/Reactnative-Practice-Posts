import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  Modal
} from "react-native";

import { Circle, Svg } from "react-native-svg";
import {
  useGetData,
  useDeleteData,
  imageEndpointApi,
  usePostData,
} from "../../utils/useAxios";
import { TokenUserManager } from "../../utils/asyncStorage";
import { CustomButton } from "../../public/customComponent/Basic_Components";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { CustomCarrousel } from "../../public/customComponent/Basic_CarrouselComponent";
import { CustomErrorAlert } from "../../public/customComponent/Basic_AlertComponent";
import BasicStylesPage from "../../public/cssStyles/Basic_Style";
import VideoPlayer from "../../components/cameraAndGalery/VideoPLayer";
import AsyncStorage from '@react-native-async-storage/async-storage';


function ShowPostsScreen() {
  const { getData, loading, error, data } = useGetData();
  const [isDeleted, setIsDeleted] = useState(false);
  const { getToken, getInfoToken, getInfoToken2 } = TokenUserManager();
  const [errorPost, setErrorPost] = useState(false);

  const { deleteData, loadingDelete, errorDelete, dataDelete } =
    useDeleteData();

  const navigation = useNavigation();
  const gotToLogin = () => navigation.navigate("LoginScreen");
  // Estado para la lista de posts
  const [posts, setPosts] = useState([]);
  const { postData, errorPostLike } = usePostData();

  const [userId, setUserId] = useState("");

  const getUserId = async () => {
    const userIdFromToken =  await getInfoToken("user_id");
    setUserId(userIdFromToken);
  };
  

  useEffect(() => {
    handleGetData();
    getUserId()
    setIsDeleted(false);
  }, [/* isDeleted, data */]);

/*   useEffect(() => {
    getIdUser(); 
     if(buttonLike==false){
      handleGetData();
    }else{
      handleGetFavoriteData(userId);
    } 
     handleGetData(); 
     setIsDeleted(false); 
  }, [isDeleted, data]); */

  const handleError = () => {
    setErrorPost(false);
    gotToLogin();
  };

   const handleGetData = async () => {
    const token = await getToken();
    console.log("Token:", token);
    await AsyncStorage.setItem("user_token", token);
    const userId = await getInfoToken2("user_id");

   /*  console.log("UserId:", userId); */

    if (!userId) {
      console.log("UserId es null o undefined");
      // Manejar el caso en el que userId sea null o undefined
      return;
}
    console.log("UserId:", userId);
    const url = `/like/usersLikes/${userId}`;
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
      },
      header
    );
  };

  const handleGetIdLike = async (postId) => {
    const userId = await getInfoToken2("user_id");
    console.log
    try {
      const url = `/like/user/${userId}/post/${postId}`;
      const header = {
        Authorization: `Bearer ${await getToken()}`,
      };
      let idLike = null
      await  getData(
        url,
        (data) => {
         console.log("data"+data._id)
         idLike = data._id
        },
        header
      );
      return idLike;
    } catch (error) {
      console.error("Error al obtener el like:", error);
      throw error;
    }
  };
  

  /* const handleDelete = async () => {
     const id = handleGetIdLike() 
    const url = `/posts/${id}`;
    const header = {
      Authorization: `Bearer ${await getToken()}`,
    }
    deleteData(url, (data) => {
      if (data) {
        setPosts(posts.filter((post) => post._id !== id));
        setIsDeleted(true);
      }
    },header);
  }; */

  const handleDelete = async (postId) => {
    
    const idLike = await handleGetIdLike(postId) ;
    console.log("like a eliminar" + idLike)
   const url = `/like/${idLike}`;
   const header = {
     Authorization: `Bearer ${await getToken()}`,
   }
   deleteData(url, (data) => {
     if (data) {
       setPosts(posts.filter((post) => post._id !== id));
       setIsDeleted(true);
     }
   },header);
 };



  const handleLike= async (postId)=>{
    try {
      const url = "/likes"
      const headers = {
        "Content-Type": "application/json",
      };
      const body = {
        userId: userId,
        postId: postId,
      };
      console.log(body)

      postData(url, body, headers, (data) => {
        if (error || !data) {
          console.log("error al subir el like")
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
        <Circle cx="200" cy="160" r="120" fill={BasicStylesPage.color2 + 90} />
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
          onPress={() => handleDelete(post._id)}>
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
              
          <View style={styleModal.cardHeader}>
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
                    style={styleModal.avatarImage}
                  />
                )}
              </View>
            );
          }}
        />

          <View style={styleModal.titleHeader}>
            <Text style={styleModal.title}>{post.title}</Text>
          </View>
          
        </View>
        <View style={styleModal.cardBody}>
          <TouchableOpacity
            style={styleModal.deleteButton}
            onPress={() => handleDelete(post._id)}>
            <Icon name="trash-can" size={40} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styleModal.editButton}
            onPress={() =>{setModalVisible(false); navigation.navigate("UpdatePostScreen",{ id: post._id });} }>
            <Icon name="pencil" size={40} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styleModal.likeButtonModal}
            onPress={() =>{ setLiked((isLiked) => !isLiked);  isLiked? console.log("error"): handleLike(post._id) }}>
            <Icon name={isLiked ? "heart" : "heart-outline"}
                  size={32}
                  color={isLiked ? "red" : "black"}/>
          </TouchableOpacity>
                
            <Text style={styleModal.subtitle}>{post.subtitle}</Text>
            <Text style={styleModal.description}>{post.description}</Text>
                <CustomButton text="salir" onPress={()=>setModalVisible(false)} buttonStyle={styles.button}></CustomButton>  
            </View>
            
        </Modal>
      </View>
    </View>
  );
}

const styleCard = StyleSheet.create({
  card: {
    /* backgroundColor: "#FF5733", */
    marginBottom: 10,
    marginLeft: "2%",
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: BasicStylesPage.color3 + 60,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  cardHeader: {
    padding: 10,
    flexDirection: "row", // Alinear elementos en fila
    borderTopColor: "red",
    borderTopWidth: 4,
    borderBottomColor: "red",
    borderBottomWidth: 4,
    height: 200,
  },
  cardCircle: {
    position: "absolute",
    alignSelf: "center",
  },
  titleHeader: {
    backgroundColor: "#FF5733",
    position: "absolute",
    marginTop: 20,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: "flex-start", // Alinear el contenido del titleHeader al principio vertical
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  subtitle: {
    fontSize: 14,
    color: "red",
    fontStyle: "italic",
  },
  description: {
    fontSize: 14,
    color: BasicStylesPage.color5,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    /* backgroundColor: "#FF5733", */
    height: 100,
    borderBottomColor: "red",
    borderBottomWidth: 4,
    borderLeftColor: "red",
    borderLeftWidth: 4,
    borderRightColor: "red",
    borderRightWidth: 4,
    borderRadius: 10,
  },
});

const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    bottom: 10,
    right: 15,
    width: 80,
    height: 80,
    backgroundColor: BasicStylesPage.color4 + 80,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 60,
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
  },
  cards: {
    marginBottom: 20,
  },
});


const styleModal = StyleSheet.create({
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
    padding: 20,
    flexDirection: "row",
    borderTopColor: BasicStylesPage.color4 + 90,
    borderTopWidth: 4,
    borderBottomColor: BasicStylesPage.color4 + 90,
    borderBottomWidth: 4,
    height: 400,
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
  
  cardCircle: {
    position: "absolute",
    alignSelf: "center",
  },
  titleHeader: {
    backgroundColor: "#FF5733",
    position: "absolute",
    marginTop: 20,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: "flex-start", // Alinear el contenido del titleHeader al principio vertical
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  subtitle: {
    fontSize: 36,
    color: "red",
    fontStyle: "italic",
    alignContent:"center"
  },
  description: {
    fontSize: 24,
    color: BasicStylesPage.color5,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    /* backgroundColor: "#FF5733", */
    height: 100,
    borderBottomColor: "red",
    borderBottomWidth: 4,
    borderLeftColor: "red",
    borderLeftWidth: 4,
    borderRightColor: "red",
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
    bottom: 80,
    right: 250,
    width: 60,
    height: 60,
    backgroundColor: BasicStylesPage.color4 + 95,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
});

export default ShowPostsScreen;
