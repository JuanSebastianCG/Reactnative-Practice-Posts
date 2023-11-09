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
import { CustomErrorAlert } from "../../../public_styles/component_public_Styles/Basic_AlertComponent";
import { CustomCarrousel } from "../../../public_styles/component_public_Styles/Basic_CarrouselComponent";
import {
  CustomDropDown,
  CustomShowMultipleTag,
  CustomTag,
} from "../../../public_styles/component_public_Styles/Basic_Components_F";

import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";

function ShowServicesScreen() {
  const { getToken } = TokenUserManager();
  const { getData, loading, error } = useGetData();
  const { deleteData, loadingDelete } = useDeleteData();

  const [dataPost, setDataPost] = useState([]);
  const [dataPostCategories, setDataPostCategories] = useState([]);

  const navigation = useNavigation();
  const route = useRoute();

  const [errorPost, setErrorPost] = useState(false);
  const gotToLogin = () => navigation.navigate("LoginScreen");

  const [filterCategories, setFilterCategories] = useState(
    route.params?.categoryName ? [route.params?.categoryName] : []
  );

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
  const handleDelete = async (id) => {
    const url = `/data/${id}`;
    const header = {
      Authorization: `Bearer ${await getToken()}`,
    };
    deleteData(url, (data) => {}, header);
  };

  /* ==============================Vista============================== */

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          scrollIndicatorInsets={{ bottom: 300 }}>
          <View style={styles.inputContainer}>
            {/* DropDown De categoria */}
            <CustomDropDown
              items={dataPostCategories}
              label={"Categorias"}
              icon={"magnify"}
              onItemSlected={(item) => {
                if (!filterCategories.includes(item)) {
                  setFilterCategories([...filterCategories, item]);
                }
              }}
              showLastSelected={false}
            />
          </View>
          <CustomShowMultipleTag
            tags={filterCategories}
            style={{ marginTop: 20, marginLeft: "5%", marginBottom: 20 }}
            handleDelete={(item) => {
              setFilterCategories(
                filterCategories.filter((tag) => tag !== item)
              );
            }}
          />
          {error && (
            <CustomErrorAlert
              isVisible={true}
              message="¿estas logueado  0.0?  "
              onConfirm={handleError}
            />
          )}
          {dataPost.map((Service) => (
            <Card
              key={Service._id}
              Service={Service}
              handleDelete={handleDelete}
            />
          ))}
        </ScrollView>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("CreateService")}>
          <Icon name="plus" size={60} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function Card({ Service, handleDelete }) {
  return (
    <View style={styleCard.card} key={Service._id}>
      <Svg width="400" height="500" style={styleCard.cardCircle}>
        <Circle cx="200" cy="160" r="140" fill={BasicStylesPage.color2 + 90} />
      </Svg>
      <View style={styleCard.cardHeader}>
        <CustomCarrousel data={Service.photos} width={330} height={190} />

        <View style={styleCard.titleHeader}>
          <Text style={styleCard.title}>{Service.name}</Text>
        </View>
      </View>
      <View style={styleCard.cardBody}>
        <TouchableOpacity
          style={styleCard.deleteButton}
          onPress={() => handleDelete(Service._id)}>
          <Icon name="trash-can" size={40} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styleCard.editButton}
          onPress={() => handleDelete(Service._id)}>
          <Icon name="pencil" size={40} />
        </TouchableOpacity>

        <Text style={styleCard.subtitle}>{Service.subtitle}</Text>
        <Text style={styleCard.description}>{Service.description}</Text>
        <View
          style={{
            position: "absolute",
            bottom: 10,
            right: 10,
            marginTop: 10,
          }}>
          <CustomTag text={Service.categoryService} />
        </View>
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

export default ShowServicesScreen;
