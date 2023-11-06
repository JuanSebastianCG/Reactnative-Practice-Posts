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
  basicEndpoint,
} from "../../../utils/useAxios";
import { TokenUserManager } from "../../../utils/asyncStorage";

import BasicStylesPage from "../../../public_styles/css_public_Styles/Basic_Style";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { CustomErrorAlert } from "../../../public_styles/component_public_Styles/Basic_AlertComponent";

function ShowCategoryScreen() {
  const [errorPost, setErrorPost] = useState(false);
  const { getData, loading, error } = useGetData();
  const { getToken } = TokenUserManager();
  const { deleteData, loadingDelete, errorDelete, dataDelete } =
    useDeleteData();

  const navigation = useNavigation();
  const gotToLogin = () => navigation.navigate("LoginScreen");
  const [dataPost, setDataPost] = useState([]);

  useEffect(() => {
    handleGetData();
    const intervalId = setInterval(() => {
      handleGetData();
    }, 5000);
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  const handleError = () => {
    setErrorPost(false);
    gotToLogin();
  };

  /* [{"_id":"653dbc450368d11e0cf289c6","nameCategoryService":"Construcción y adecuación","descriptionCategoryService":"Construcción y adecuación","active":true,"avatar":"uploads/categoryServices/1698544706791-pexels-james-frid-901941.jpg","__v":0},{"_id":"653dbc790368d11e0cf289cb","nameCategoryService":"Suministro e instalación","descriptionCategoryService":"Suministro e instalación","active":true,"avatar":"uploads/categoryServices/1698544761304-pexels-photo-7568422.jpeg","__v":0},{"_id":"653dbcbd0368d11e0cf289d0","nameCategoryService":"Redes de frio y refrigeración","descriptionCategoryService":"Redes de frio y refrigeración","active":true,"avatar":"uploads/categoryServices/1698544829132-im2.jpg","__v":0},{"_id":"654504020368d11e0cf4c0a7","nameCategoryService":"Gt prueba","descriptionCategoryService":"Mto","active":true,"avatar":"uploads/categoryServices/1699021826089-1b096120-df65-4841-b6a2-bbac10c1842b.jpeg","__v":0}] */
  const handleGetData = async () => {
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
        setDataPost(data);
        for (let i = 0; i < data.length; i++) {
          console.log(data[i]._id);
        }

      },
      header
    );
  };
  const handleDelete = async (id) => {
    const url = `/data/${id}`;
    const header = {
      Authorization: `Bearer ${await getToken()}`,
    };
    deleteData(url, (data) => {}, header);
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
          {dataPost.map((Category) => (
            <Card
              key={Category._id}
              Category={Category}
              handleDelete={handleDelete}
            />
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

/* [{"_id":"653dbc450368d11e0cf289c6","nameCategoryService":"Construcción y adecuación","descriptionCategoryService":"Construcción y adecuación","active":true,"avatar":"uploads/categoryServices/1698544706791-pexels-james-frid-901941.jpg","__v":0},{"_id":"653dbc790368d11e0cf289cb","nameCategoryService":"Suministro e instalación","descriptionCategoryService":"Suministro e instalación","active":true,"avatar":"uploads/categoryServices/1698544761304-pexels-photo-7568422.jpeg","__v":0},{"_id":"653dbcbd0368d11e0cf289d0","nameCategoryService":"Redes de frio y refrigeración","descriptionCategoryService":"Redes de frio y refrigeración","active":true,"avatar":"uploads/categoryServices/1698544829132-im2.jpg","__v":0},{"_id":"654504020368d11e0cf4c0a7","nameCategoryService":"Gt prueba","descriptionCategoryService":"Mto","active":true,"avatar":"uploads/categoryServices/1699021826089-1b096120-df65-4841-b6a2-bbac10c1842b.jpeg","__v":0}] */
function Card({ Category, handleDelete }) {
  navigation = useNavigation();
  return (
    <View style={styles.cards}>
      <TouchableOpacity
        style={styleCard.card}
        onPress={() =>
          navigation.replace("ShowServicesScreen", {
            categoryName: Category.nameCategoryService,
          })
        }>
        <View style={styleCard.contentContainer}>
          <View style={styleCard.ImageContainer}>
            <Image
              style={styleCard.image}
              source={{
                uri: `${basicEndpoint}/${Category.avatar}`,
              }}
            />
          </View>
          <View style={styleCard.descriptionContainer}>
            <Text style={styleCard.cardText}>
              {Category.nameCategoryService}
            </Text>
            <Text style={styleCard.descriptionText}>
              {Category.descriptionCategoryService}
            </Text>
          </View>
        </View>
        <Icon name="chevron-right" style={styleCard.cardIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styleCard = StyleSheet.create({
  card: {
    height: 220,
    width: "90%",
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderColor: BasicStylesPage.color4 + 99,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "6%",
    padding: 10,
  },
  cardText: {
    color: BasicStylesPage.color1,
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 20,
  },
  cardIcon: {
    color: BasicStylesPage.color1,
    fontSize: 30,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  ImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: BasicStylesPage.color4,
    borderRadius: 20,
    width: 160, // Ajusta el ancho de la imagen según tu preferencia
    height: 240,
  },
  image: {
    width: "100%",
    height: "100%", // Hace que la imagen ocupe todo el espacio del contenedor
    resizeMode: "cover",
    borderRadius: 10,
  },
  descriptionContainer: {
    marginLeft: 10, // Espacio entre la imagen y la descripción
    marginTop: 10,
    flex: 1,
  },
  descriptionText: {
    color: BasicStylesPage.color1,
    fontSize: 16, // Ajusta el tamaño de la fuente de la descripción
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
    marginTop: 50,
    paddingBottom: 150,
  },
  cards: {
    marginBottom: 20,
  },
});

export default ShowCategoryScreen;
