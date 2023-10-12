import React, {useState} from 'react'
import { View,Text,Button, StyleSheet, Switch,ScrollView } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { Checkbox } from "react-native-paper";
import CustomInTextField from "../../public_styles/component_public_Styles/Basic_FormComponents_F";
import BasicStylesPage from "../../public_styles/css_public_Styles/Basic_Style";
import {
  CustomButton,
  ErrorBanner,
  Logo,
} from "../../public_styles/component_public_Styles/Basic_Coponents_F";
import { Polygon, Svg } from "react-native-svg";

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
       <ScrollView contentContainerStyle={styles.scrollContainer}>
       <Svg height="580" width="700" style={styles.footer}>
          <Polygon points="0,0 600,450 0,250" fill={BasicStylesPage.color2} />
        </Svg>
        <Svg height="340" width="700" style={styles.footer}>
          <Polygon points="0,0 800,280 0,500" fill={BasicStylesPage.color0} />
        </Svg>
        <View>
          <Logo styleLogo={styles.logoContainer} />
        </View>
        <View  style={styles.fieldContainer}>
        <Text style={styles.header}>Formulario de registro</Text>
          <CustomInTextField style={styles.input} label="Nombre" placeholder="Nombre" value={userName} onChangeText={setUserName} />
          <Picker selectedValue={documentType} onValueChange={(itemSelected)=>setDocumentType(itemSelected)}>
              <Picker.Item label="Cedula de ciudadania" value="Cedula de ciudadania" />
              <Picker.Item label="Cedula extranjera" value="Cedula extranjera" />
              <Picker.Item label="pasaporte" value="Pasaporte" />
          </Picker>
          <CustomInTextField style={styles.input} label="Numero de documento" placeholder="Numero de documento" value={documentNumber} onChangeText={setDocumentNumber} />
          <CustomInTextField style={styles.input} label="Correo electronico" placeholder="Correo electronico" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <CustomInTextField style={styles.input} label="Contraseña" placeholder="Contraseña" value={password} onChangeText={setPassword} />
          <CustomInTextField style={styles.input} label="Confirmar Contraseña" placeholder="Confirmar Contraseña" onChangeText={setConfirmPassword} onKeyPress={confirmingPassword} />
          
          <View style={styles.switchContainer}>
            <Switch value={mayorEdad} onValueChange={handleSwitchChange} />
            <Text style={styles.switchText}>Eres mayor de edad?</Text>
          </View>

          <View style={styles.checkboxContainer}>
            <Checkbox.Item
              label="Aceptas terminos y condiciones"
              status={isChecked ? "checked" : "unchecked"}
              onPress={handleCheckboxChange}
              color="#007AFF" // Puedes ajustar el color a tu preferencia
            />
          </View>

          <CustomButton text="Registrarse" onPress={handleSubmit}/>
        </View>
       </ScrollView>
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

      footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: "center",
      },
      container: {
        flex: 1,
        backgroundColor: BasicStylesPage.color3,
      },
      formContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },
      fieldContainer: {
        backgroundColor: BasicStylesPage.color3,
        borderRadius: 60,
        width: "90%",
        height: "90%",
        marginBottom: "30%",
        marginTop: 20,
        paddingTop: 20,
        justifyContent:"center",
        alignItems: "center",
        marginLeft:20,
      },
      
      button: {
        padding: 10,
        marginTop: 8,
      },
    
      logoContainer: {
        position: 'absolute',
        top: 0,      // Alinea el componente en la parte superior
        right: 0,    // Alinea el componente en la esquina derecha
        width: 120,
        height: 120,
      },
    
      loginLogo: {
        marginTop: 90,
        width: 120,
        height: 120,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: BasicStylesPage.color0,
        alignItems: "center",
        justifyContent: "center",
      },

})

export default RegisterScreen