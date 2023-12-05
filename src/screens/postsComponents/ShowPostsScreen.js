import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Modal,
  Button
} from "react-native";
import { Circle, Svg } from "react-native-svg";
import {
  useGetData,
  useDeleteData,
  basicEndpoint,
} from "../../utils/useAxios";
import { TokenUserManager } from "../../utils/asyncStorage";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { CustomCarrousel } from "../../public/customComponent/Basic_CarrouselComponent";
import { CustomErrorAlert } from "../../public/customComponent/Basic_AlertComponent";
import BasicStylesPage from "../../public/cssStyles/Basic_Style";
import { CustomButton } from "../../public/customComponent/Basic_Components";

function ShowPostsScreen() {
  const { getData, loading, error, data } = useGetData();
  const [isDeleted, setIsDeleted] = useState(false);
  const { getToken } = TokenUserManager();
  const [errorPost, setErrorPost] = useState(false);
  
  const { deleteData, loadingDelete, errorDelete, dataDelete } =
    useDeleteData();

  const navigation = useNavigation();
  const gotToLogin = () => navigation.navigate("LoginScreen");
  const [posts, setPosts] = useState([]);

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
          setErrorPost(true);
          return;
        }
        for (let i = 0; i < data.length; i++) {
          uri = `${basicEndpoint}/${data[i].avatar}`;
          data[i].avatars = data[i].avatars.map((avatar) => {
            return { uri: `${basicEndpoint}/${avatar}` };
          });
        }
        setPosts(data);
      },
      header
    );

    //http://192.168.20.26:3000/api/v1/uploads/post/1697776043933-1fd0c384-43c2-4c48-8818-80ca2a166a9a.jpeg
  };
  const handleDelete = async (id) => {
    const url = `/posts/${id}`;
    console.log("id:", id);
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
            <View style={styles.cards} key={index}>
              <Card post={post} handleDelete={handleDelete} />
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

function Card({ post, handleDelete }) {
  const [isLiked, setLiked] = useState(false);
  const [modalVisible, setModalVisible] = useState([]);
  const navigation = useNavigation();

  return (
    <View style={styleCard.card} key={post._id}>
      <Svg width="400" height="500" style={styleCard.cardCircle}>
        <Circle cx="200" cy="160" r="70" fill={BasicStylesPage.color2 + 90} />
      </Svg>
      <View style={styleCard.cardHeader}>
        <CustomCarrousel data={post.avatars} width={330} height={190} />

        <View style={styleCard.titleHeader}>
          <Text style={styleCard.title}>{post.title}</Text>
          
        </View>

        <TouchableOpacity
          style={styleCard.likeButton}
          onPress={() => setLiked((isLiked) => !isLiked)}>
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
          <CustomCarrousel data={post.avatars} width={330} height={190} />

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
            onPress={() => setLiked((isLiked) => !isLiked)}>
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
    bottom: 10,
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
