import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    /* if (token !== null) {
      return token;
    } */
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


  return { saveToken, getToken, deleteToken };
};



export {TokenUserManager};
