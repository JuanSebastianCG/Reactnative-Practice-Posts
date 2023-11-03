import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
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
import { CustomCarrousel } from "../../../public_styles/component_public_Styles/Basic_CarrouselComponent";
import { CustomErrorAlert } from "../../../public_styles/component_public_Styles/Basic_AlertComponent";

function ShowCategoryScreen() {
  const [isDeleted, setIsDeleted] = useState(false);
  const [errorPost, setErrorPost] = useState(false);
  const { getData, loading, error, data } = useGetData();
  const { getToken } = TokenUserManager();

  const { deleteData, loadingDelete, errorDelete, dataDelete } =
    useDeleteData();

  const navigation = useNavigation();
  const gotToLogin = () => navigation.navigate("LoginScreen");
  const [posts, setPosts] = useState([]);

/*   useEffect(() => {
    handleGetData();
    setIsDeleted(false);
  }, [isDeleted, data]); */

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          scrollIndicatorInsets={{ bottom: 300 }}>
          {error && (
            <CustomErrorAlert
              isVisible={true}
              message="¿estas logueado  0.0?  "
              onConfirm={handleError}
            />
          )}
          {/* {posts.map((post, index) => (
            <View style={styles.cards} key={index}>
              <Card post={post} handleDelete={handleDelete} />
            </View>
          ))} */}
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

function Card({ Category, handleDelete }) {
  return <View></View>;
}

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

export default ShowCategoryScreen;
