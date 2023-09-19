import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { SafeAreaView, Text, FlatList, View, ActivityIndicator,Image } from 'react-native'
/* import {FlatList} from "react-native-gesture-handler" */

const ProductScreen = () => {
//declarar variable y metodo utilizando structuring
let [products, setProducts] = useState([]);
let [loading, setLoading] = useState([]);


useEffect(()=>{
  axios('https://fakestoreapi.com/products/')
  .then((response)=>{
    setProducts(response.data)
    console.log(response.data)
  })
  .catch((error)=>{console.error(error)})
},[])

/* getJsonData= () => {
    fetch('https://fakestoreapi.com/products/',
    {method:'GET'}).then((response)=> response.json())
    .then((responseJson)=>{
      console.log(responseJson);
      //setResponse(responseJson)
    })
    .catch((error)=>{
      console.error(error)
    })
  }

  componentDidMount=()=>{
    this.getJsonData()
  } */


    
  return (  
    <SafeAreaView>
      
      <FlatList 
      data={products}
      keyExtractor={(item)=>item.id.toString()}
      renderItem={({item})=>(
        <View>
          <Image
            source={{ uri: item.image }} style={{ width: 100, height:100 }} 
          >
          </Image>
          <Text>{item.title}</Text>
          <Text>{item.price}</Text>
          <Text>{item.category}</Text>
        </View>
      )}
   >        
   </FlatList>
   
       
    </SafeAreaView>
  )
}

export default ProductScreen
