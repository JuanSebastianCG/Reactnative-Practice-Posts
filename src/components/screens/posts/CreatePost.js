import React, {useEffect, useState} from "react";
import { SafeAreaView, View, StyleSheet, ScrollView, ActivityIndicator, Text, Button,TextInput, Modal } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import CustomInTextField from "../../../public_styles/component_public_Styles/Basic_FormComponents_F";
import modelPost from "../../../models/Post"
import { useGetData,usePostData,useDeleteData } from "../../../utils/useAxios";

import axios from "axios";


function Posts(){
    const { getData, loading, error, data } = useGetData();
    const { postData, loadingPost, errorPost,dataPost } = usePostData();
    const { deleteData, loadingDelete, errorDelete, dataDelete } = useDeleteData();

    const [postList, setPostList] = useState([]);
    const [modalVisible, setModalVisible] = useState([]);
    const [newPost, setNewPost] = useState({
        title:"",
        subtitle:"",
        description:"",
        avatar:"",
        active:false,
    });

    useEffect(() => {
        const url = "https://apis-backend-dm.up.railway.app/api/v1/posts";
        getData(url, (data) => {
          console.log("Data from hook:", data);
          setPostList(data)
          });
          
    }, []);


    /* const removePost = async (req,res) => {
        const {id} = req.params
        try {
            const postdelete=await modelPost.findById(id);
            res.status(200).json(postdelete)
        } catch (error) {
            res.status(401).json({error:"error"})
        }

    }

    const createPost = async (req,res)=>{
        try {
            const{title, subtitle,avatar,description}=req.body
            const newPost = new modelPost(posts);
            console.log(newPost);
            await newPost.save();
            res.status(201).json({message:"post created"})
        } catch (error) {
            res.status(401).json({error:"error"})
        }
    } */

    const handleCreatePost =  () => {
        const url = "https://apis-backend-dm.up.railway.app/api/v1/posts";
        const headers = {
          "Content-Type": "application/json",
        };
        const body = {
          title: newPost.title,
          subtitle: newPost.subtitle,
          description: newPost.description,
          avatar: newPost.avatar,
        };
    
        postData(url, headers, body, (data) => {
          if (error || !data) {
            console.log("Error:", error);
          } else {
            console.log("Data:", data);
            
            navigation.navigate("HomeScreen");
          }
        });

        setPostList([...postList, body]);

        setModalVisible(false)


      };

      const handleGetData = async () => {
        const url = "https://apis-backend-dm.up.railway.app/api/v1/posts";
        getData(url, (data) => {
          setPostList(data);
          console.log(data)
        });
      };

    
      const handleDeletePost = (id) => {
        try {
            const url = `https://apis-backend-dm.up.railway.app/api/v1/posts/${id}`;
            console.log("id:", id);
            deleteData(url, (data) => {
                console.log("data:", data);
            });
            setPostList(postList.filter((item) => item._id !== id));
            console.log("eliminacion exitosa")
        } catch (error) {
            console.log(error)
            console.log("no se pudo eliminar")
        }
      }

    return (<View>
        <FlatList 
        style={styles.flatlistContainer}
        data={postList} 
        keyExtractor={(item)=>item.id}
        renderItem={({item})=>(
            <View style={styles.postListContainer}>
                {/* <Image source={{ uri:item.avatar }} style={{width:50  }}></Image> */}
                <Text> {item.title}</Text>
                <Text> {item.subtitle}</Text>
                <Text> {item.description}</Text>
                {/* <Text> {item.active? "y" : "n"}</Text> */}
                <Text> {item.avatar}</Text>
                <Button title="eliminar post" onPress={()=>handleDeletePost(item._id)}></Button>
            </View>
        )}>
        </FlatList>
        <Button title="Crear nuevo post" onPress={()=>setModalVisible(true)}></Button>
        <Modal visible={modalVisible} 
        
        onrequestClose={()=>setModalVisible(false)}
        animation="slide"
        >
            <View style={styles.modalContainer}>
                <CustomInTextField 
                label="title post" 
                style={styles.input} 
                onChangeText={(title_text)=>{
                    console.log("subtitulo publicacion", title_text)
                    setNewPost({...newPost, title: title_text})}}></CustomInTextField>
                    <CustomInTextField 
                label="subtitle post" 
                style={styles.input} 
                onChangeText={(subtitle_item)=>{
                    console.log("subtitulo publicacion", subtitle_item)
                    setNewPost({...newPost, subtitle: subtitle_item})}}></CustomInTextField>

                    <CustomInTextField 
                label="description post" 
                style={styles.input} 
                onChangeText={(description_item)=>{
                    console.log("subtitulo publicacion", description_item)
                    setNewPost({...newPost, description: description_item})}}></CustomInTextField>

                <CustomInTextField 
                label="avatar post" 
                style={styles.input} 
                onChangeText={(avatar_item)=>{
                    console.log("subtitulo publicacion", avatar_item)
                    setNewPost({...newPost, avatar: avatar_item})}}></CustomInTextField>

                <Button title="crear post" onPress={handleCreatePost}></Button>  
            </View>
            
        </Modal>
        
    </View>)
}


const styles= StyleSheet.create({
    input:{
        marginBottom:10,
        paddingVertical:5,
        paddingHorizontal:10,
        borderWidth:1,
        borderColor: "#ccc",
        borderRadius:3,
        color:'#ccc'
    },
    modalContainer:{
        flex:1,
        justifyContent:"center",
        alignContent:"center",
        alignItems:"center",
        width:200,
        height:150,
        marginLeft:100
    },
    flatlistContainer:{
        margin:30,
        alignContent:"center",
        textAlign:"center"

    },
    postListContainer:{
        alignItems:"center"
    }
})



export default Posts;
