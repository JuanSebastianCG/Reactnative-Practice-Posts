import React from "react";
import { Stack, Button, Surface } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";


function HomeScreen() {

  const navigation = useNavigation();
  const goToMovies = () => navigation.navigate("Movie");
  const goToPokemons = () => navigation.navigate("Pokemon");
  const goToProducts = () => navigation.navigate("Product");
  return (
    <Stack fill center spacing={4}>
      <Surface
        elevation={2}
        category="medium"
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: 200,
          height: 100,
        }}
      >
        <Button title="Ver Productos" onPress={goToProducts} />
      </Surface>

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
        <Button title="Ver Pokemones" onPress={goToPokemons} />
      </Surface>

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
        <Button title="Ver Peliculas" onPress={goToMovies} />
      </Surface>
    </Stack>
  );
};

export default HomeScreen;
