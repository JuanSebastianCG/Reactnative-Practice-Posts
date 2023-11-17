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
  basicEndpoint,
} from "../../utils/useAxios";

import { CustomCarrousel } from "../../public/customComponent/Basic_CarrouselComponent";
import { CustomErrorAlert } from "../../public/customComponent/Basic_AlertComponent";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import BasicStylesPage from "../../public/cssStyles/Basic_Style";

import { useNavigation } from "@react-navigation/native";
import { TokenUserManager } from "../../utils/asyncStorage";
/* const mongoose = require('mongoose');

const UserNotificationSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        require: true,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now()
    },
    read: {
        type: Boolean,
        default: false
    }

});
module.exports = mongoose.model('UserNotification', UserNotificationSchema);


 */


function NotificationScreen() {
  const { getData, loading, error, data } = useGetData();
  const { deleteData } = useDeleteData();
  const { updateData } = useUpdateData();
  const { getToken } = TokenUserManager();

  const [isDeleted, setIsDeleted] = useState(false);
  const [errorPost, setErrorPost] = useState(false);

  const navigation = useNavigation();
  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    handleGetData();
    setIsDeleted(false);
  }, [isDeleted, data]);

  const handleGetData = async () => {
    const url = "/user/:id";
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

  const handleVerify = async (id) => {
    const url = `/user/${id}`;
    const header = {
      Authorization: `Bearer ${await getToken()}`,
    };
    updateData(
      url,
      { active: true },
      (data) => {
        if (error && !data) {
          setErrorPost(true);
          return;
        }
        setIsDeleted(true);
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
          {/* {loading && <ActivityIndicator size="large" color={BasicStylesPage.color2} />} */}
          {error && (
            <CustomErrorAlert
              isVisible={true}
              message="¿estas logueado  0.0?  "
              onConfirm={setErrorPost(false)}
            />
          )}
          {dataArray.map((dataUser, index) => (
            <View style={styles.cards} key={index}>
              <Card
                post={dataUser}
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
    <View style={styleCard.card} key={post._id}>
      <Svg width="400" height="500" style={styleCard.cardCircle}>
        <Circle cx="200" cy="160" r="140" fill={BasicStylesPage.color2 + 90} />
      </Svg>
      <View style={styleCard.cardContent}>
        <View style={styleCard.cardHeader}>
          <Text style={styleCard.cardTitle}>
            {dataUser.firstname + " " + dataUser.lastname}
          </Text>
          <Text style={styleCard.cardDate}>{dataUser.email}</Text>
        </View>
        <View style={styleCard.cardBody}>
          <Text style={styleCard.cardText}>{dataUser.typeOfDocument}</Text>
          <Text style={styleCard.cardText}>{dataUser.documentNumber}</Text>
          <View style={styleCard.cardFooter}>
            <TouchableOpacity
              style={styleCard.deleteButton}
              onPress={() => handleDelete(dataUser._id)}>
              <Icon
                name="trash-can-outline"
                size={30}
                color={BasicStylesPage.color0}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styleCard.editButton}
              onPress={(state) => handleVerify(dataUser._id)}>
              <Icon
                name="account-check-outline"
                size={30}
                color={BasicStylesPage.color0}
              />
            </TouchableOpacity>
          </View>
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
  cardCircle: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  cardContent: {
    margin: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTitle: {
    color: BasicStylesPage.color0,
    fontWeight: "bold",
    fontSize: 30,
  },
  cardDate: {
    color: BasicStylesPage.color0,
  },
  cardBody: {
    marginTop: 10,
  },
  cardText: {
    color: BasicStylesPage.color0,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
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

export default NotificationScreen;
