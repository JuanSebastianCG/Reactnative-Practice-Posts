import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useGetData, useDeleteData, useUpdateData } from "../../utils/useAxios";

import { Swipeable } from 'react-native-gesture-handler';

import { CustomErrorAlert } from "../../public/customComponent/Basic_AlertComponent";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import BasicStylesPage from "../../public/cssStyles/Basic_Style";

import { useNavigation } from "@react-navigation/native";
import { TokenUserManager } from "../../utils/asyncStorage";

function ShowUsersScreen() {
  const { getData, error } = useGetData();
  const { deleteData } = useDeleteData();
  const { updateData } = useUpdateData();
  const { getToken, getInfoToken } = TokenUserManager();

  const navigation = useNavigation();
  const [isDeleted, setIsDeleted] = useState(false);
  const [dataArray, setDataArray] = useState([]);
  const [errorGet, setErrorGet] = useState(false);

  useEffect(() => {
    handleGetData();
  }, [handleGetData, handleDelete,handleReadAllNotifications]);

  /* every time the page open */
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      handleGetData();
    });
  }, [navigation]);

  useEffect(() => {
    // Cleanup function
    return () => {
      handleReadAllNotifications();
    };
  }, []);
  

  const handleGetData = async () => {
    const userId = await getInfoToken("user_id");
    const url = "/user/notification/" + userId;
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
    const url = `/user/notification/${id}`;
    const header = {
      Authorization: `Bearer ${await getToken()}`,
    };
    deleteData(url, (data) => {}, header);
  };

  const handleReadAllNotifications = async () => {
    const userId = await getInfoToken("user_id");
    const url = `/user/notification/markAllAsRead/${userId}`;
    const header = {
      Authorization: `Bearer ${await getToken()}`,
    };
    updateData(url, {}, header, (data) => {});
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
              <Card dataUser={dataUser} handleDelete={handleDelete} handleGetData={handleGetData} />
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function Card({ dataUser, handleDelete, handleGetData }) {
  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0, 50, 100],
      outputRange: [0, 0, 0, 1],
    });

    return (
      <Animated.View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: BasicStylesPage.colorWarning1,
          justifyContent: 'flex-end',
        }}>
        <Animated.View
          style={{
            paddingHorizontal: 10,
            transform: [{ translateX: trans }],
          }}>
          <Icon name="trash-can-outline" style={styleCard.cardIcon} color={BasicStylesPage.color3} size={45} />
        </Animated.View>

      </Animated.View>
    );
  };

  return (
    <View style={styleCard.containerCard}>
      <Swipeable
        renderRightActions={renderRightActions}
        onSwipeableRightOpen={() => {
          handleDelete(dataUser._id)
          handleGetData();

        }}
        >
        <View style={[styleCard.card, {backgroundColor: dataUser.read ? BasicStylesPage.color2 : BasicStylesPage.color2+10}]} 
        key={dataUser._id}>
          <View style={styleCard.header}>
            <Text style={styleCard.cardTittle}>{dataUser.title}</Text>
          </View>
          <View style={styleCard.body}>
            <Text style={styleCard.cardText}>{dataUser.message}</Text>
          </View>
          {/* date */}
          <View style={styleCard.footer}>
            <Text style={styleCard.cardText}>{dataUser.date}</Text>
          </View>
        </View>
      </Swipeable>
    </View>
  );
}


const styleCard = StyleSheet.create({
  containerCard : {
    margin: 2,
  },
  card: {
    borderColor: BasicStylesPage.color4+10,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
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
    fontSize: 18,
    fontWeight: "bold",
  },
  cardIcon: {
    right: 10,
  },
  cardTittle: {
    color: BasicStylesPage.color0,
    fontSize: 20,
    fontWeight: "bold",
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
