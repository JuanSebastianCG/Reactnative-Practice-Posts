import React, {useState} from 'react'
import { View,Text,Button, StyleSheet, Switch } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { Checkbox } from "react-native-paper";


const RegisterScreen = () => {
    const [userName,setUserName]=useState('');
    const [documentType,setDocumentType]=useState('Cedula de ciudadania');
    const [documentNumber,setDocumentNumber]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [samePassword,setSamePassword]=useState(false);
    const [mayorEdad, setmayorEdad] = useState(false);
    const handleSwitchChange = () => {
        setmayorEdad(!mayorEdad);
      };
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
      };
    
    const handleSubmit= ()=>{
        console.log("informaicon del usuario", {userName,documentType,documentNumber,email,password,mayorEdad})
    };

    function confirmingPassword(){

        if(password==confirmPassword){
            setSamePassword(true)
        }else{
            setSamePassword(false)
        }
    }

  return (
    <View style={styles.container}>
        <Text style={styles.header}>Formulario de registro</Text>
        <TextInput style={styles.input} placeholder="Nombre" value={userName} onChangeText={setUserName} />
        <Picker selectedValue={documentType} onValueChange={(itemSelected)=>setDocumentType(itemSelected)}>
            <Picker.Item label="Cedula de ciudadania" value="Cedula de ciudadania" />
            <Picker.Item label="Cedula extranjera" value="Cedula extranjera" />
            <Picker.Item label="pasaporte" value="Pasaporte" />
        </Picker>
        <TextInput style={styles.input} placeholder="Numero de documento" value={documentNumber} onChangeText={setDocumentNumber} />
        <TextInput style={styles.input} placeholder="Correo electronico" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="Contraseña" value={password} onChangeText={setPassword} />
        <TextInput style={styles.input} placeholder="Confirmar Contraseña" onChangeText={setConfirmPassword} onKeyPress={confirmingPassword} />
        
        <View style={styles.switchContainer}>
          <Switch value={mayorEdad} onValueChange={handleSwitchChange} />
          <Text style={styles.switchText}>Eres mayor de edad?</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <Checkbox.Item
            label="CheckBox"
            status={isChecked ? "checked" : "unchecked"}
            onPress={handleCheckboxChange}
            color="#007AFF" // Puedes ajustar el color a tu preferencia
          />
        </View>

        <Button title="Registrarse" onPress={handleSubmit}/>
    </View>
  )
}


const styles =StyleSheet.create({
    input:{
        marginBottom:10,
        paddingVertical:5,
        paddingHorizontal:10,
        borderWidth:1,
        borderColor: "#ccc",
        borderRadius:3,
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
      },
    header:{
        fontSize:24,
        marginBottom:20,
        textAlign:"center",

    },
    container:{
        flex:1,
        justifyContent:"center",
        paddingHorizontal:20,

    },
    switchText: {
        marginLeft: 8,
        fontSize: 18,
      },

})

export default RegisterScreen