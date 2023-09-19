import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  Image
} from "react-native";
import { NativeBaseProvider, Box, Badge, Text } from "native-base";
import { useAxios } from "../../utils/useAxios";

import { Stack, TextInput, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";


const MovieScreen = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Estado para almacenar la consulta de búsqueda

  const { data, loading, error, handleCancelRequest } = useAxios(
    `https://apis-backend-dm.up.railway.app/api/v1/peliculas/${searchQuery}` // Usar la consulta como parte de la URL
  );

  /* const handleSearch = () => {
    // Llamar a la API con el valor de búsqueda
    // Aquí puedes realizar la llamada a la API nuevamente con el nuevo valor de búsqueda
  }; */

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

  return (
    <NativeBaseProvider>
      <View style={styles.searchContainer}>
        <TextInput
          label="Pelicula"
          variant="standard"
          placeholder="Buscar película..."
          value={searchQuery}
          style={styles.input}
          onChangeText={(text) => setSearchQuery(text)} // Actualizar el estado
        />
        {/* <IconButton
          style={styles.searchButton}
          icon={(props) => <Icon name="magnify" {...props} />}
          onPress={handleSearch}
        /> */}
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.poster_path}
        renderItem={({ item }) => (
          /* card */
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
            <Badge style={styles.popularityBadge}>
              <Text color="#fff" fontSize="xs">
                {item.popularity}
              </Text>
            </Badge>
            <Box px={4} py={2} style={styles.textContainer}>
              <Text fontWeight="bold" color="#6200ee">
                {item.original_title}
              </Text>
              <Text fontSize="sm" mt={1}>
                {item.release_date}
              </Text>
              <Image
                source={{ uri: item.poster_path }} style={{ width: 100, height:100 }} 
              >
              </Image>
            </Box>
          </Box>
        )}
      />
    </NativeBaseProvider>
  );
};

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
  popularityBadge: {
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

export default MovieScreen;
