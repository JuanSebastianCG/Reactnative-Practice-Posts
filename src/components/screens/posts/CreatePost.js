import React, {useEffect, useState} from "react";
import { SafeAreaView, View, StyleSheet, ScrollView, ActivityIndicator, Text, Button,TextInput, Modal } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import CustomInTextField from "../../../public_styles/component_public_Styles/Basic_FormComponents_F";
import modelPost from "../../../models/Post"
import { useGetData } from "../../../utils/useAxios";


function Posts(){
    const { getData, loading, error, data } = useGetData();
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

    const removePost = async (req,res) => {
        const {id} = req.params
        try {
            const postdelete=await modelPost.findById(id);
            res.status(200).json(postdelete)
        } catch (error) {
            res.status(401).json({error:"error"})
        }

    }

    const handleCreatePost=()=>{
        useGetData.post("https://apis-backend-dm.up.railway.app/api/v1/posts").then((response=>{
            setNewPost(response.data)
            createPost()
            console.log("hola creando post")
        })).catch((error)=>{console.error(error)})
    }

    const handleDeletePost=(postId)=>{
        const updatePosts= postList.filter((post)=>post._id !== postId);
        setPostList(updatePosts)
        useGetData.delete(`https://apis-backend-dm.up.railway.app/api/v1/posts/${postId}`).then((response=>{removePost(response.data)})).catch((error)=>{console.error(error)})
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
    }

    

    return (<View>
        <FlatList 
        data={postList} 
        keyExtractor={(item)=>item.id}
        renderItem={({item})=>(
            <View>
                <Image source={{ uri:item.avatar }} style={{width:50  }}></Image>
                <Text>{item.title}</Text>
                <Text>{item.subtitle}</Text>
                <Text>{item.description}</Text>
                <Text>{item.active? "y" : "n"}</Text>
                <Button title="eliminar un post" onpress={()=>handleDeletePost(item.id)}></Button>
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
        alignItems:"center"
    }
})



export default Posts;
