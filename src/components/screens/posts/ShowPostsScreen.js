import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import { Circle, Svg } from "react-native-svg";
import {
  useGetData,
  useDeleteData,
  basicEndpoint,
} from "../../../utils/useAxios";
import { TokenUserManager } from "../../../utils/asyncStorage";

import BasicStylesPage from "../../../public_styles/css_public_Styles/Basic_Style";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

function ShowPostsScreen() {
  const { getData, loading, error, data } = useGetData();
  const [isDeleted, setIsDeleted] = useState(false);
  const { getToken } = TokenUserManager();
  const [errorPost, setErrorPost] = useState(false);

  const { deleteData, loadingDelete, errorDelete, dataDelete } =
    useDeleteData();

  const navigation = useNavigation();

  // Estado para la lista de posts
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
    const url = "https://apis-backend-dm.up.railway.app/api/v1/posts";
    getData(url, (data) => {
      // Actualiza el estado con la lista de posts
      setPosts(data);
    });
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
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {loading && <ActivityIndicator size="large" color="#FF5733" />}
          {error && <Text>Error: {error.message}</Text>}
          {posts.map((post, index) => (
            <View style={styles.cards}>
              <Card key={index} post={post} handleDelete={handleDelete} />
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

function Card({ post , handleDelete}) {
  return (
    <View style={styleCard.card} key={post._id}>
      <Svg width="400" height="500" style={styleCard.cardCircle}>
        <Circle cx="200" cy="160" r="140" fill="rgba(255, 136, 136, 0.1)" />
      </Svg>
      <View style={styleCard.cardHeader}>
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
    bottom: 20,
    right: 20,
    width: 100,
    height: 60,
    backgroundColor: "#FF5733",
    borderRadius: 30,
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
