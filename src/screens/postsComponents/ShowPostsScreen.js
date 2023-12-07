import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

import { Circle, Svg } from "react-native-svg";
import {
  useGetData,
  useDeleteData,
  imageEndpointApi,
} from "../../utils/useAxios";
import { TokenUserManager } from "../../utils/asyncStorage";
import { CustomButton } from "../../public/customComponent/Basic_Components";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { CustomCarrousel } from "../../public/customComponent/Basic_CarrouselComponent";
import { CustomErrorAlert } from "../../public/customComponent/Basic_AlertComponent";
import BasicStylesPage from "../../public/cssStyles/Basic_Style";
import VideoPlayer from "../../components/cameraAndGalery/VideoPLayer";

function ShowPostsScreen() {
  const { getData, loading, error, data } = useGetData();
  const [isDeleted, setIsDeleted] = useState(false);
  const { getToken } = TokenUserManager();
  const [errorPost, setErrorPost] = useState(false);
  const [buttonLike, setBottonLike] =useState(false);
  const { getInfoToken } = TokenUserManager();
  const [userId, setIdUser] = useState(false);

  const { deleteData, loadingDelete, errorDelete, dataDelete } =
    useDeleteData();

  const navigation = useNavigation();

  // Estado para la lista de posts
  const [posts, setPosts] = useState([]);

  const getIdUser = async () => {
    setIdUser((await getInfoToken("_id")));
  };


  useEffect(() => {
    getIdUser();
    if(buttonLike==false){
      handleGetData();
    }else{
      handleGetFavoriteData(userId);
    }
    /* handleGetData(); */
    setIsDeleted(false);
  }, [isDeleted, data]);

  const handleError = () => {
    setErrorPost(false);
    gotToLogin();
  };

  const getAdminRole = async () => {
    setAdminRole((await getInfoToken("_id")));
    
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

  const handleGetFavoriteData = async (userId) => {
    const url = `/favorite/usersFavorites/${userId}`;
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

  const handleDelete = async (id) => {
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
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          scrollIndicatorInsets={{ bottom: 300 }}>
          {/* {loading && <ActivityIndicator size="large" color={BasicStylesPage.color2} />} */}
          {error && (
            <CustomErrorAlert
              isVisible={true}
              message="¿estas logueado  0.0?  "
              onConfirm={handleError}
            />
          )}
          {posts.map((post, index) => (
            <View style={styles.cards}>
              <Card key={index} post={post} handleDelete={handleDelete} />
            </View>
            
          ))}
        </ScrollView>
        <CustomButton
        text="Ver Favoritos"
        onPress={setBottonLike(true)}
        buttonStyle={styles.buttonContainer}
      />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("CreatePostScreen")}>
          <Icon name="plus" size={60} />
        </TouchableOpacity>
      </View>      
          
    </SafeAreaView>
  );
}

function Card({ post , handleDelete}) {
  return (
    <View style={styleCard.card} key={post._id}>
      <Svg width="400" height="500" style={styleCard.cardCircle}>
        <Circle cx="200" cy="160" r="140" fill="rgba(255, 136, 136, 0.1)" />
      </Svg>
      <View style={styleCard.cardHeader}>
        <CustomCarrousel data={post.avatars} width={330} height={190} />

        <View style={styleCard.titleHeader}>
          <Text style={styleCard.title}>{post.title}</Text>
        </View>
      </View>
      <View style={styleCard.cardBody}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleDelete(post._id)}>
          <Icon name="plus" size={60} />
        </TouchableOpacity>

        <Text style={styleCard.subtitle}>{post.subtitle}</Text>
        <Text style={styleCard.description}>{post.description}</Text>
      </View>
      {/* <View style={styleCard.cardFooter}>
        <Text style={styleCard.description}>{post.avatar}</Text>
      </View> */}
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

export default ShowPostsScreen;
