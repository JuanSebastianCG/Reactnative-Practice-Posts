import React, { useEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet, ScrollView, ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { useGetData, useDeleteData  } from "../../../utils/useAxios";
import { useNavigation } from "@react-navigation/native";
import CustomInTextField from "../../../public_styles/component_public_Styles/Basic_FormComponents_F";
import BasicStylesPage from "../../../public_styles/css_public_Styles/Basic_Style";



function ShowPostsScreen() {
  const { getData, loading, error, data } = useGetData();
  const { deleteData, loadingDelete, errorDelete, dataDelete } = useDeleteData();

  const navigation = useNavigation(); // Mover la declaración de navigation aquí
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    handleGetData();

  }, []);

  const handleGetData = async () => {
	    const url = "https://apis-backend-dm.up.railway.app/api/v1/posts";
      getData(url, (data) => {    
        setPosts(data);   
      });
  };

  const handleDelete = async (id) => {
    const url = `https://apis-backend-dm.up.railway.app/api/v1/posts/${id}`;
    console.log("id:", id);
    deleteData(url, (data) => {
      // Si la eliminación es exitosa, actualiza el estado excluyendo el post eliminado
      if (data && data.success) {
        setPosts(posts.filter((post) => post._id !== id));
      }
    });
  }


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading && <ActivityIndicator size="large" color="#0000ff" />} 
        {error && <Text>Error: {error.message}</Text>}
        {data &&
          data.map((post, index) => (
            <View style={styles.card} key={index}>
              <View style={styles.cardHeader}>
                <Text style={styles.title}>{post.title}</Text>
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.subtitle}>{post.subtitle}</Text>
                <Text style={styles.description}>{post.description}</Text>
              </View>
              <View style={styles.cardFooter}>
                <Text style={styles.description}>{post.avatar}</Text>
                <TouchableOpacity style={styles.button} onPress={() => handleDelete(post._id)}>
                <Text style={styles.buttonText}>Eliminar</Text>
              </TouchableOpacity>
              </View>
            </View>
            
          ))}
          
          <TouchableOpacity style={styles.button} onPress={() => {
          navigation.navigate("CreatePostScreen");
        }}>  
          <Text style={styles.buttonText}>Crear</Text>
        </TouchableOpacity>
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    /* width:"90%" */
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
  },

  card: {
    backgroundColor: "#fff",
    marginBottom: 10,
    marginLeft: "2%",
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
  },
  cardHeader: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  cardBody: {
    padding: 10,
  },
  cardFooter: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#444",
  },
  description: {
    fontSize: 14,
    color: "#999",
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
  },
});

export default ShowPostsScreen;
