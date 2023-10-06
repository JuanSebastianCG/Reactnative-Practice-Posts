import React, {useState} from "react";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Modal } from "react-native-paper";

export const Posts=()=>{
    const [postList, setPostList] = usestate([]);
    const [modalVisible, setModalVisible] = usestate([]);
    const [newPost, setNewPost] = usestate({
        title:"",
        subtitles:"",
        description:"",
        avatar:"",
        active:false,
    });

    const handleCreatePost=()=>{
        axios.post("http://localhost:3000/api/v1/admin/posts/new-post").then((response=>{setNewPost()})).catch((error)=>{})
    }

    return (<View>
        <FlatList 
        data={postList} 
        keyExtractor={(post_item)=>post_item.id}
        renderItem={({post_item})=>(
            <View>
                <Image source={{ uri:post_item.avatar }} style={{width:50  }}></Image>
                <Text>{post_item.title}</Text>
                <Text>{post_item.subtitle}</Text>
                <Text>{post_item.description}</Text>
                <Text>{post_item.active? "y" : "n"}</Text>
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


