import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginData, registerData } from '../src/types/UserType';

interface AuthContextType {
  token: string | null;
  userId: string | null;
  login: (userData : loginData) => void;
  register: (userData: registerData) => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(sessionStorage.getItem("token"));
    const login = async (data) => {
      try {
        const response = await fetch("http://localhost:3001/api/authUser/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const res = await response.json();
        if (res.user) {
          setUserId(res.user._id);
          setToken(res.accessToken);
          sessionStorage.setItem("token", res.accessToken);
          localStorage.setItem("userId", res.user._id);
          return 'success';
        }
        throw new Error(res.message);
      } catch (err) {
        console.error(err);
      }
    };
    const register = async (data) => {
      try {
        const response = await fetch("http://localhost:3001/api/authUser/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const res = await response.json();
        if (res.user) {
          setUserId(res.user._id);
          setToken(res.accessToken);
         
          sessionStorage.setItem("token", res.accessToken);
          localStorage.setItem("userId", res.user._id);
          return 'success';
        }
        if(res.hasOwnProperty('keyValue') && res.keyValue.hasOwnProperty('email'))
        {
          throw new Error('Email already exists');
        }
        else{
          throw new Error('Something went wrong');
        }
      } catch (err) {
        return err;
      }
    };
  
    const logout = () => {
      
      setToken("");
      sessionStorage.removeItem("token");
      localStorage.removeItem("userId");
    
    };
  
    return (
      <AuthContext.Provider value={{ token, userId, login, logout ,register }}>
        {children}
      </AuthContext.Provider>
    );
  
  };
  
  export default AuthProvider;
  
  export const useAuth = () => {
    return useContext(AuthContext);
  };