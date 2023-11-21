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
  useUpdateData,
} from "../../utils/useAxios";

import { CustomSwitch } from "../../public/customComponent/Basic_FormComponents";
import { CustomErrorAlert } from "../../public/customComponent/Basic_AlertComponent";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import BasicStylesPage from "../../public/cssStyles/Basic_Style";

import { useNavigation } from "@react-navigation/native";
import { TokenUserManager } from "../../utils/asyncStorage";

function ShowUsersScreen() {
  const { getData, error } = useGetData();
  const { deleteData } = useDeleteData();
  const { updateData } = useUpdateData();
  const { getToken } = TokenUserManager();

  const navigation = useNavigation();
  const [isDeleted, setIsDeleted] = useState(false);
  const [dataArray, setDataArray] = useState([]);
  const [errorGet, setErrorGet] = useState(false);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  const handleGetData = async () => {
    const url = "/user";
    const header = {
      Authorization: `Bearer ${await getToken()}`,
    };
    getData(
      url,
      (data) => {
        if (error || data == null) {
          setErrorGet(true);
          
          return;
        }
        data.ma
        setDataArray(data);
      },
      header
    );
  };

  const handleDelete = async (id) => {
    const url = `/user/${id}`;
    const header = {
      Authorization: `Bearer ${await getToken()}`,
    };
    deleteData(
      url,
      (data) => {
        handleGetData();
      },
      header
    );
  };

  const handleVerify = async (id, state,userEmail) => {
    const url = `/user/verify/${id}`;
    const header = {
      Authorization: `Bearer ${await getToken()}`,
    };
    updateData(url, { active: state,email: userEmail}, header, (data) => {});
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          scrollIndicatorInsets={{ bottom: 300 }}>
          <CustomErrorAlert
            isVisible={errorGet}
            message="¿estas logueado  0.0?"
            onConfirm={() => {
              setErrorGet(false);
              navigation.navigate("LoginScreen");
            }}
          />

          {dataArray.map((dataUser, index) => (
            <View style={styles.cards} key={index}>
              <Card
                dataUser={dataUser}
                handleDelete={handleDelete}
                handleVerify={handleVerify}
              />
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

function Card({ dataUser, handleDelete, handleVerify }) {
  return (
    <View style={styleCard.card} key={dataUser._id}>
      <View style={styleCard.borderButton} />
      <View style={styleCard.borderLeft} />

      <Svg width="220" height="220" style={styleCard.cardCircle2}>
        <Circle cx="70" cy="70" r="60" fill={BasicStylesPage.color2 + 90} />
      </Svg>
      <View style={styleCard.cardContent}>
        <View>
          <Text style={styleCard.cardTitle}>
            {dataUser.firstname + " " + dataUser.lastname}
          </Text>
          <Text style={styleCard.cardEmail}>{dataUser.email}</Text>
        </View>
        <View style={styleCard.cardBody}>
          <Text style={styleCard.cardText}>{dataUser.typeOfDocument}</Text>
          <Text style={styleCard.cardText}>{dataUser.documentNumber}</Text>
        </View>
        <View style={styleCard.footer}>
          <CustomSwitch
            onValueChange={(state) => handleVerify(dataUser._id, state,dataUser.email)}
            value={dataUser.active}
            activeText="Activo"
            inActiveText="Inactivo"
          />
        </View>
      </View>
      <TouchableOpacity
        style={styleCard.deleteButton}
        onPress={() => handleDelete(dataUser._id)}>
        <Icon
          name="trash-can-outline"
          size={30}
          color={BasicStylesPage.color0}
        />
      </TouchableOpacity>
    </View>
  );
}

const styleCard = StyleSheet.create({
  card: {
    marginBottom: 5,
    alignSelf: "center",
    width: "95%",
    borderRadius: 10,
    backgroundColor: BasicStylesPage.color3 + 60,
  },
  borderButton: {
    position: "absolute",
    content: '""',
    bottom: 0,
    left: 0,
    right: 0,
    width: "30%",
    height: "2%",
    backgroundColor: BasicStylesPage.color4 + 99,
    borderRadius: 10,
  },
  borderLeft: {
    position: "absolute",
    content: '""',
    bottom: 0,
    left: 0,
    right: 0,
    width: "1%",
    height: "30%",
    backgroundColor: BasicStylesPage.color4 + 99,
    borderRadius: 10,
  },

  deleteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 50,
    height: 50,
    backgroundColor: BasicStylesPage.color4 + 95,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    marginBottom: 70,
  },

  cardCircle2: {
    position: "absolute",
    top: -40,
    right: -115,
  },
  cardContent: {
    margin: 20,
  },

  cardTitle: {
    color: BasicStylesPage.color0,
    fontWeight: "bold",
    fontSize: 30,
  },
  cardEmail: {
    color: BasicStylesPage.color0,
    fontSize: 17,
    marginTop: 10,
  },
  cardBody: {
    marginTop: 10,
  },
  cardText: {
    color: BasicStylesPage.color0,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
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
    paddingTop: 50,
    paddingBottom: 150,
  },
  cards: {
    marginBottom: 20,
  },
});

export default ShowUsersScreen;
