import { StyleSheet, StatusBar, View } from "react-native";
import React from "react";
import Index from "./src/components/IndexScreen";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base"; 

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <View style={styles.headerStyle}>
          <StatusBar
            backgroundColor="#2181CD" // Establece el color del encabezado
            barStyle="light-content" // Configura el estilo de los iconos (light o dark)
            translucent={true} // Hace que el encabezado sea translúcido (opcional)
          />
        </View>
        <Index />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#2181CD",
    paddingTop: StatusBar.currentHeight, // Asegura que el encabezado tome en cuenta la barra de estado
  },
});
