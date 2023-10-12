import React, {useEffect, useState} from "react";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Modal } from "react-native-paper";
import modelPost from "../models/Post"

export const Posts=()=>{
    const [postList, setPostList] = usestate([]);
    const [modalVisible, setModalVisible] = usestate([]);
    const [newPost, setNewPost] = usestate({
        title:"",
        subtitle:"",
        description:"",
        avatar:"",
        active:false,
    });

    const removePost = async (req,res) => {
        const {id} = req.params
        try {
            const postdelete=await modelPost.findById(id);
            res.status(200).json(postdelete)
        } catch (error) {
            res.status(401).json({error:"error"})
        }

    }


    const listPost=()=>{
        axios.get("http://localhost:3000/api/v1/admin/posts").then((response=>{setPostList(response.data)})).catch((error)=>{console.error(error)})
    
    }

    useEffect(()=>{
        listPost();
    }, [postList])

    const handleCreatePost=()=>{
        axios.post("http://localhost:3000/api/v1/admin/posts/new-post").then((response=>{setNewPost()})).catch((error)=>{console.error(error)})
    }

    const handleDeletePost=(postId)=>{
        const updatePosts= postList.filter((post)=>post._id !== postId);
        setPostList(updatePosts)
        axios.delete(`http://localhost:3000/api/v1/admin/posts/${postId}`).then((response=>{setNewPost(response.data)})).catch((error)=>{console.error(error)})
    }

    const createPost = async (req,res)=>{
        try {
            const{title, subtitle,avatar,description}=req.body
            const newPost = new modelPost(posts);
            console.log(newPost);
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
        <Button title="new post" onPress={()=>setModalVisible(true)}></Button>
        <Modal visible={modalVisible} 
        onrequestClose={()=>setModalVisible(false)}
        animation="slide"
        >
            <View style={styles.modalContainer}>
                <TextInput 
                palceholder="title post" 
                style={styles.input} 
                onChangeText={(title_text)=>{
                    console.log("subtitulo publicacion", title_text)
                    setNewPost({...newPost, title: title_text})}}></TextInput>
                    <TextInput 
                palceholder="subtitle post" 
                style={styles.input} 
                onChangeText={(subtitle_item)=>{
                    console.log("subtitulo publicacion", subtitle_item)
                    setNewPost({...newPost, title: subtitle_item})}}></TextInput>

                    <TextInput 
                palceholder="description post" 
                style={styles.input} 
                onChangeText={(description_item)=>{
                    console.log("subtitulo publicacion", description_item)
                    setNewPost({...newPost, title: description_item})}}></TextInput>

                <TextInput 
                palceholder="avatar post" 
                style={styles.input} 
                onChangeText={(avatar_item)=>{
                    console.log("subtitulo publicacion", avatar_item)
                    setNewPost({...newPost, title: avatar_item})}}></TextInput>

                <Button title="creacion de un post" onpress={handleCreatePost}></Button>
                
            </View>
        </Modal>
    </View>)
}


const styles= StyleSheet.create({
    input:{
        marginBottom:10,
    },
    modalContainer:{
        flex:1,
        justifyContent:"center",
        alignContent:"center",
        alignItems:"center"
    }
})


