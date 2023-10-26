import React, { useState } from "react";
import { SafeAreaView, Switch, Text, View, StyleSheet } from "react-native";
import { Checkbox } from "react-native-paper";
import { Stack, TextInput, Button } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

function RegisterSwitchScreen() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [estaActivo, setEstaActivo] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleSwitchChange = () => {
    setEstaActivo(!estaActivo);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = () => {
    console.log("Nombre:", nombre);
    console.log("Email:", email);
    console.log("Activo:", estaActivo);
    console.log("CheckBox:", isChecked);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack spacing={16} style={styles.form}>
        <TextInput
          label="Nombre"
          leading={props => <Icon name="account" {...props} />}
          value={nombre}
          onChangeText={setNombre}
          renderFloatingLabel={() => <Text style={styles.floatingLabel}>Nombre</Text>}
        />
        <TextInput
          label="Email"
          leading={props => <Icon name="email" {...props} />}
          value={email}
          onChangeText={setEmail}
          renderFloatingLabel={() => <Text style={styles.floatingLabel}>Email</Text>}
        />
        <TextInput
          label="Contraseña"
          leading={props => <Icon name="contraseña" {...props} />}
          value={password}
          onChangeText={setPassword}
          renderFloatingLabel={() => <Text style={styles.floatingLabel}>Email</Text>}
        />
{/*         <View style={styles.switchContainer}>
          <Switch value={estaActivo} onValueChange={handleSwitchChange} />
          <Text style={styles.switchText}>Activo</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <Checkbox.Item
            label="CheckBox"
            status={isChecked ? "checked" : "unchecked"}
            onPress={handleCheckboxChange}
            color="#007AFF" // Puedes ajustar el color a tu preferencia
          />
        </View> */}

        <Button
          title="Enviar"
          trailing={props => <Icon name="send" {...props} />}
          onPress={handleSubmit}
          style={styles.button}
        />
      </Stack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    width: "80%",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  switchText: {
    marginLeft: 8,
    fontSize: 18,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  floatingLabel: {
    position: "absolute",
    left: 12,
    top: -6,
    backgroundColor: "white",
    paddingHorizontal: 4,
    fontSize: 12,
  },
});

export default RegisterSwitchScreen;
