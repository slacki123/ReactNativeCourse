import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {}
})

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();

  // useEffect not use here to prevent the flickering of the login scren during login

  function authenticate(token){
    setAuthToken(token);
    AsyncStorage.setItem('token', token);
  }

  function logout(){
    setAuthToken(null);
    AsyncStorage.removeItem('token');  
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout
  }

  return <AuthContext.Provider value={value} >{children}</AuthContext.Provider>
}

export default AuthContextProvider;