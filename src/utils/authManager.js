import React, { createContext, useContext, useState, useEffect } from "react";
import { TokenUserManager } from "../utils/asyncStorage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [logged, setLogged] = useState(false);
  const { getToken } = TokenUserManager();
  const navigation = useNavigation();

  const handleLoggin = () => {
    getToken().then((token) => {
      if (token) {
        setLogged(true);
      } else {
        setLogged(false);
      }
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      handleLoggin();
    }, [])
  );

  return (
    <AuthContext.Provider value={{ authData: { logged, handleLoggin } }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContext.authData;
}
