import React from "react";
import { Stack, Button, Surface } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";


function HomeScreen() {

  const navigation = useNavigation();
  const goToCategories = () => navigation.navigate("Categories");

  return (
    <Stack fill center spacing={4}>

      <Surface
        elevation={2}
        category="medium"
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 20,
          width: 200,
          height: 100,
        }}
      >
        <Button title="Ver categorias" onPress={goToCategories} />
      </Surface>
    </Stack>
  );
};

export default HomeScreen;
