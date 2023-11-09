import { StyleSheet, StatusBar, View } from "react-native";
import React from "react";
import Index from "./src/screens/routeIndex/IndexScreen";
import { NavigationContainer } from "@react-navigation/native";



export default function App() {
  return (

      <NavigationContainer>
        <View style={styles.headerStyle}>
          <StatusBar
            backgroundColor="#2181CD" // Establece el color del encabezado
            barStyle="light-content" // Configura el estilo de los iconos (light o dark)
            translucent={true} // Hace que el encabezado sea translúcido (opcional)
          />
        </View>
        <Index/>
      </NavigationContainer>
  
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#2181CD",
    paddingTop: StatusBar.currentHeight, // Asegura que el encabezado tome en cuenta la barra de estado
  },
});
