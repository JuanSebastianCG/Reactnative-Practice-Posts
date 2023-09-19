import React, { useState }  from 'react'
import {  
  StyleSheet,
  View,
  ActivityIndicator,Image,
  FlatList, Button } from 'react-native'
  import { NativeBaseProvider, Box, Badge } from "native-base";
import { useAxios } from "../../utils/useAxios";
import axios from 'axios';

import { Stack, TextInput, IconButton,Text } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";



function PokemonScreen() {

  const [searchQuery, setSearchQuery] = useState(""); // Estado para almacenar la consulta de búsqueda

  const { data, loading, error, handleCancelRequest } = useAxios(
    `  https://apis-backend-dm.up.railway.app/api/v1/pokemon/${searchQuery}` // Usar la consulta como parte de la URL
    
  );

  if (loading) {
    return (
      <NativeBaseProvider>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      </NativeBaseProvider>
    );
  }

  if (error) {
    return (
      <NativeBaseProvider>
        <View style={styles.errorContainer}>
          <Text>Error: {error.message}</Text>
          <Button onPress={handleCancelRequest} title="Cancel Request" />
        </View>
      </NativeBaseProvider>
    );
  }

  /* data.forEach(item => {
    console.log(item.url)
  }); */


  /* function getSprite(url){
    console.log(url)
    const { pokemon} = useAxios(
      url // Usar la consulta como parte de la URL    
    );
    return pokemon.sprites.front_default
  } */


  return (
    <NativeBaseProvider>
      <View style={styles.searchContainer}>
        <TextInput
          label="Pokemon"
          variant="standard"
          placeholder="Buscar pokemon..."
          value={searchQuery}
          style={styles.input}
          onChangeText={(text) => setSearchQuery(text)} // Actualizar el estado
        />
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.url.toString()}
        renderItem={({ item }) => (
          /* card */
          <View>
            <Box
              bg="white"
              shadow={2}
              rounded="lg"
              maxWidth="90%"
              width="90%"
              mx="auto"
              mt={5}
            >
            {/* popularity */}
            
            <Box px={4} py={2} style={styles.textContainer}>
              <Text fontWeight="bold" color="#6200ee">
                {item.name}
              </Text>
              <Image
                source={{ uri: /* getSprite(item.url) */ item.url }} style={{ width: 100, height:100 }} 
              >
              </Image>
            </Box>
            </Box>
          </View>
        )}
      />
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  types: {
    position: "absolute",
    top: 2,
    right: 2,
    marginTop: 8,
    marginRight: 5,
    backgroundColor: "#6200ee",
    color: "#fff",
    padding: 2,
    borderRadius: 999, // Un valor alto para hacer que el Badge sea circular
  },
  textContainer: {
    color: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    marginVertical: 10,
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  searchButton: {
    marginLeft: 10,
    marginRight: 20,
  },
});

export default PokemonScreen