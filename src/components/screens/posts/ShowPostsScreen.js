import React, { useEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet, ScrollView, ActivityIndicator, Text } from "react-native";
import { useGetData } from "../../../utils/useAxios";

import CustomInTextField from "../../../public_styles/component_public_Styles/Basic_FormComponents_F";
import BasicStylesPage from "../../../public_styles/css_public_Styles/Basic_Style";

function ShowPostsScreen() {
  const { getData, loading, error, data } = useGetData(); // Update to use the data from the hook

  useEffect(() => {
    const url = "https://apis-backend-dm.up.railway.app/api/v1/posts";
    getData(url, (data) => {
      console.log("Data from hook:", data);
      });
}, []);

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
              </View>
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  
  card: {
    backgroundColor: "#fff",
    marginBottom: 10,
    marginLeft: "2%",
    width: "96%",
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
});

export default ShowPostsScreen;
