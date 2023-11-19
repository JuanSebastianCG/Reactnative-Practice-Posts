import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { useGetData, useDeleteData, useUpdateData } from "../../utils/useAxios";

import { CustomErrorAlert } from "../../public/customComponent/Basic_AlertComponent";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import BasicStylesPage from "../../public/cssStyles/Basic_Style";

import { useNavigation } from "@react-navigation/native";
import { TokenUserManager } from "../../utils/asyncStorage";

function ShowUsersScreen() {
  const { getData, error } = useGetData();
  const { deleteData } = useDeleteData();
  const { updateData } = useUpdateData();
  const { getToken ,getInfoToken} = TokenUserManager();

  const navigation = useNavigation();
  const [isDeleted, setIsDeleted] = useState(false);
  const [dataArray, setDataArray] = useState([]);
  const [errorGet, setErrorGet] = useState(false);

  
  useEffect(() => {
    handleGetData();
  }, [handleGetData,handleDelete]);

  const handleGetData = async () => {

    const userId = await getInfoToken("user_id");
    const url = "/user/notification/"+userId;
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
        /* set form date */

        for (let i = 0; i < data.length; i++) {
          data[i].date = new Date(data[i].date).toLocaleString();
        }
         
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
    deleteData(url, (data) => {}, header);
  };

  const handleReadAllNotifications = async () => {
    const url = `/user/notifications`;
    const header = {
      Authorization: `Bearer ${await getToken()}`,
    };
    updateData(url, (data) => {}, header);
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
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
function Card({ dataUser,handleDelete  }) {
  return <View style={styleCard.card} key={dataUser._id}>
    <View style={styleCard.header}>
      <Text style={styleCard.cardText}>{dataUser.title}</Text>
      <TouchableOpacity onPress={() => handleDelete(dataUser._id)}>
        <Icon name="trash-can-outline" style={styleCard.cardIcon} />
      </TouchableOpacity>
    </View>
    <View style={styleCard.body}>
      <Text style={styleCard.cardText}>{dataUser.message}</Text>
    </View>
    {/* date */}
    <View style={styleCard.footer}>
      <Text style={styleCard.cardText}>{dataUser.date}</Text>
    </View>



  </View>;
}

const styleCard = StyleSheet.create({
  card: {
    backgroundColor: BasicStylesPage.color2,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    marginLeft: "2%",
    marginRight: "2%",
    width: "96%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  body: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardText: {
    color: BasicStylesPage.color0,
    fontSize: 20,
    fontWeight: "bold",
  },
  cardIcon: {
    color: BasicStylesPage.color0,
    fontSize: 30,
  },
});



const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: "relative",
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
