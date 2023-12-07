import React, {useState, useEffect} from "react";
import {
  View,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
  Image
} from "react-native";
import {Svg,  Polygon , Circle} from "react-native-svg";
import { Text, Stack } from "@react-native-material/core";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import BasicStylesPage from "../../public/cssStyles/Basic_Style";
import { CustomLogo } from "../../public/customComponent/Basic_PageInterface";
import AnimatedTriangleRain from "../../public/animations/AnimatedTriangleRain";
import { TokenUserManager } from "../../utils/asyncStorage";
import {
  useGetData,
  useDeleteData,
  basicEndpointApi,
  imageEndpointApi
} from "../../utils/useAxios";
import { CustomCarrousel } from "../../public/customComponent/Basic_CarrouselComponent";
import Carousel from "react-native-reanimated-carousel";
import VideoPlayer from "../../components/cameraAndGalery/VideoPLayer";

function WelcomeScreen() {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const { getToken } = TokenUserManager();
  const { getData, loading, error, data } = useGetData();



  useEffect(() => {
    handleGetData();
    
  },[] );

  const handleGetData = async () => {
    const url = "/posts";
    const header = {
      Authorization: `Bearer ${await getToken()}`,
    };
    getData(
      
      url,
      (data) => {
        
        if (!data) {
          console.log("error obteniendo post")
          return;
        }else{
          
          for (let i = 0; i < data.length; i++) {
            
            photos = data[i].photos.map((photo) => {
              return {
                uri: `${imageEndpointApi}/${photo}`,
  
              };
            });
            
            /* add videos */
            videos = data[i].videos.map((video) => {
              return {
                uri: `${imageEndpointApi}/${video}`,
              };
            });
            data[i].media = [...photos, ...videos];
          }
        setPosts(data);
      }
        
      },
      header
    );
   
  };


  return (
    <Stack spacing={4} style={styles.container}>
      <CustomLogo width={120} height={250} styleLogo={styles.logoContainer} />

      <View style={{marginTop: "55%"}}>
        <Text style={styles.text_tittle}>Welcome to Apis </Text>

        <Carousel
          data={posts}
          renderItem={({ item }) => (
            <View >
              <Card post={item} />
            </View>
          )}
          width={320}
          height={250}
          autoplay={true}
          autoplayInterval={3000}
        />
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate("IndexTabbar");
          }}>
          <View style={styles.buttonContainer}>
            <MaterialCommunityIcons
              name="arrow-right-circle"
              color={BasicStylesPage.color1}
              size={125}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>

      <Svg height="200" width="300" style={styles.footer}>
        <Polygon points="0,0 300,200 0,200" fill={BasicStylesPage.color1} />
      </Svg>
    </Stack>
  );
}


function Card({ post }) {
  return (
    <View style={styleCard.card} key={post._id}>
      <View style={styleCard.cardHeader}>
      <CustomCarrousel
          data={post.media}
          renderItem={(index, focused) => {
            return (
              <View style={{ width: "100%", height: "100%" }}>
                {post.media[index].uri.includes(".mp4") ? (
                  <VideoPlayer uri_Video={post.media[index].uri} />
                ) : (
                  <Image
                    source={{ uri: post.media[index].uri }}
                    style={styleCard.avatarImage}
                  />
                )}
              </View>
            );
          }}
        />

        <View style={styleCard.titleHeader}>
          <Text style={styleCard.title}>{post.title}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:"center"
  },

  footer: {
    position: Platform.OS === "android" ? "absolute" : "relative",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
  },

  text_tittle: {
    color: BasicStylesPage.color1,
    fontWeight: BasicStylesPage.fontWeightTitle,
    fontFamily: BasicStylesPage.fontText,
    fontSize: 30,
    textAlign: "center",
    marginTop: "2%",
    marginLeft: "10%",
    marginRight: "10%",
  },

  logoContainer: {
    flexDirection: "row",
    right: 78,
    top: 20,
   
  },

  buttonContainer: {
    alignItems: "center",
    marginTop: "5%",
    zIndex: 2,
  },


});



const styleCard = StyleSheet.create({
  card: {
    marginBottom: 10,
    marginLeft: "5%",
    width: "96%",
    height:"30%",
    borderRadius: 50,
    backgroundColor: BasicStylesPage.color4 + 90,
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
    alignItems:"center",
  },
  cardCircle: {
    position: "absolute",
    alignSelf: "center",
  },
  titleHeader: {
    backgroundColor: BasicStylesPage.color6,
    position: "absolute",
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: "flex-start",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: BasicStylesPage.color3,
  },
  
});

export default WelcomeScreen;
