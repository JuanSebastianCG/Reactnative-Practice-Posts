import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { NativeBaseProvider, Box } from "native-base";

import {useAxios} from "../../utils/useAxios";

const MovieScreen = () => {
  const { data, loading, error, handleCancelRequest } = useAxios(
    "https://fakestoreapi.com/products/"
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

  return (
    <NativeBaseProvider>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>{item.title}</Text>
            <Text>{item.price}</Text>
            <Text>{item.category}</Text>
          </View>
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
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default MovieScreen;
