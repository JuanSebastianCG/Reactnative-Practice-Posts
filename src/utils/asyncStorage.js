import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";
import { decode, encode } from 'base-64'; // Agrega esta línea para importar las funciones base-64

// Sobrescribe las funciones nativas de base64
if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

const TokenUserManager = () => {
  const [token, setToken] = useState(null);

  const saveToken = async (accessToken) => {
    try {
      await AsyncStorage.setItem("accessToken", accessToken);
      setToken(accessToken);
    } catch (error) {
      console.log("Error al guardar el token en AsyncStorage:", error);
    }
  };

  const getToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("accessToken");
      if (storedToken !== null) {
        setToken(storedToken);
        return storedToken;
      } else {
        return null;
      }
    } catch (error) {
      console.log("Error al acceder al token desde AsyncStorage:", error);
      return null;
    }
  };

  const deleteToken = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      setToken(null);
    } catch (error) {
      console.log("Error al eliminar el token desde AsyncStorage:", error);
    }
  }

  const getInfoToken = async (nameId) => {
    try {
      const storedToken = await AsyncStorage.getItem("accessToken");
      if (storedToken !== null) {
        const decodedToken = jwtDecode(storedToken);
        if (nameId) {
          return decodedToken[nameId];
        }else{
          return decodedToken;
        }
      } else {
        return null;
      }
    } catch (error) {
      console.log("Error al acceder al token desde AsyncStorage:", error);
      return null;
    }
  };

  const getInfoToken2 = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("accessToken");
      if (storedToken !== null) {
        const decodedToken = jwtDecode(storedToken);
        console.log("Token decodificado:", decodedToken); // Agrega esta línea para imprimir el token decodificado
        return decodedToken.user_id;
      } else {
        return null;
      }
    } catch (error) {
      console.log("Error al acceder al token desde AsyncStorage:", error);
      return null;
    }
  };

  return { saveToken, getToken, deleteToken, getInfoToken, getInfoToken2 };
};

export {TokenUserManager};
