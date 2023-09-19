import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  FlatList,
} from 'react-native';
import { NativeBaseProvider, Box, Badge, Text } from 'native-base';
import { useAxios } from '../../utils/useAxios';

import { Stack, TextInput } from '@react-native-material/core';

function PokemonScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [singlePokemon, setSinglePokemon] = useState(null);

  const { data, loading, error, handleCancelRequest } = useAxios(
    `https://apis-backend-dm.up.railway.app/api/v1/pokemon/${searchQuery}`,
    () => {
      //console.log(data.length == undefined);
      if (data.length === undefined) {
        setSinglePokemon(data);
      } else {
        setSinglePokemon(null);
      }
    }
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

 /*  if (error) {
    return (
      <NativeBaseProvider>
        <View style={styles.errorContainer}>
          <Text>Error: {error.message}</Text>
          <Button onPress={handleCancelRequest} title="Cancel Request" />
        </View>
      </NativeBaseProvider>
    );
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
          onChangeText={(text) => {
            setSearchQuery(text);
          }}
        />
      </View>

      {singlePokemon ? (
        <Text>{singlePokemon}</Text>
      ) : (
        <>
          <FlatList
            data={data}
            keyExtractor={(item) => item.name.toString()}
            renderItem={({ item }) => (
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
                  <Image
                    source={{ uri: item.image }}
                    style={styles.cardImage}
                  />

                  <Box px={4} py={2} style={styles.textContainer}>
                    <Text fontWeight="bold" color="#6200ee" fontSize="lg">
                      {item.name}
                    </Text>
                    <Text fontSize="sm" color="#333">
                      Weight: {item.weight}
                    </Text>
                    <Text fontSize="sm" color="#333">
                      Types: {item.types.join(", ")}
                    </Text>
                  </Box>
                </Box>
              </View>
            )}
          />
        </>
      )}
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
  cardImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  textContainer: {
    padding: 10,
    backgroundColor: "#fff",
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
});

export default PokemonScreen;