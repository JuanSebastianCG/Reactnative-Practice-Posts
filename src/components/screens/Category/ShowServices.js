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
import { CustomErrorAlert } from "../../../public_styles/component_public_Styles/Basic_AlertComponent";

function ShowServicesScreen() {
  const [errorPost, setErrorPost] = useState(false);
  const { getData, loading, error } = useGetData();
  const { getToken } = TokenUserManager();
  const { deleteData, loadingDelete, errorDelete, dataDelete } =
    useDeleteData();

  const navigation = useNavigation();
  const gotToLogin = () => navigation.navigate("LoginScreen");
  const [data, setData] = useState([]);

  useEffect(() => {
    handleGetData();
  }, [data]);

  const handleError = () => {
    setErrorPost(false);
    gotToLogin();
  };

  /* [{"_id":"653dbc450368d11e0cf289c6","nameCategoryService":"Construcción y adecuación","descriptionCategoryService":"Construcción y adecuación","active":true,"avatar":"uploads/categoryServices/1698544706791-pexels-james-frid-901941.jpg","__v":0},{"_id":"653dbc790368d11e0cf289cb","nameCategoryService":"Suministro e instalación","descriptionCategoryService":"Suministro e instalación","active":true,"avatar":"uploads/categoryServices/1698544761304-pexels-photo-7568422.jpeg","__v":0},{"_id":"653dbcbd0368d11e0cf289d0","nameCategoryService":"Redes de frio y refrigeración","descriptionCategoryService":"Redes de frio y refrigeración","active":true,"avatar":"uploads/categoryServices/1698544829132-im2.jpg","__v":0},{"_id":"654504020368d11e0cf4c0a7","nameCategoryService":"Gt prueba","descriptionCategoryService":"Mto","active":true,"avatar":"uploads/categoryServices/1699021826089-1b096120-df65-4841-b6a2-bbac10c1842b.jpeg","__v":0}] */
  const handleGetData = async () => {
    const url = "/admin/category-services";
    const header = {
      Authorization: `Bearer ${await getToken()}`,
    };
    getData(
      url,
      (data) => {
        console.log("data", data);
        if (error && !data) {
          setErrorPost(true);
          return;
        }
        setData(data);
      },
      header
    );
  };
  const handleDelete = async (id) => {
    const url = `/data/${id}`;
    const header = {
      Authorization: `Bearer ${await getToken()}`,
    };
    deleteData(
      url,
      (data) => {
        if (data) {
          setData(data.filter((post) => post._id !== id));
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
          {data.map((post, index) => (
            <View style={styles.cards} key={index}>
              <Card post={post} handleDelete={handleDelete} />
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("CreateCategoryScreen")}>
          <Icon name="plus" size={60} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function Card({ Category, handleDelete }) {
  return (
  <View>



  </View>
  );
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

export default ShowServicesScreen;
