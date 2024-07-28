import React, { createContext, useState, useContext } from 'react';
import { loginData, registerDataDistributor, registerDataUser } from '../types/UserType';

interface AuthContextType {
  token: string | null;
  userId: string | null;
  userRole: string | null;
  loginUser: (data: loginData) => Promise<string | undefined>;
  loginDistributor: (data: loginData) => Promise<string | undefined>;
  loginAdmin: (data: loginData) => Promise<string | undefined>;
  registerUser: (data: registerDataUser) => Promise<string | undefined>;
  registerDistributor: (data: registerDataDistributor) => Promise<string | undefined>;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(sessionStorage.getItem("token"));
    const [userRole, setUserRole] = useState<string | null>(null);
   
    const loginUser = async (data:loginData) => {
      return await loginHelper(data,'User',"http://localhost:3001/api/authUser/login");
    }
    const loginDistributor = async (data:loginData) => {
      return await loginHelper(data,'Distributor',"http://localhost:3001/api/authDistributor/login");
    }
    const loginAdmin = async (data:loginData) => {
      return await loginHelper(data,'Admin',"http://localhost:3001/api/authAdmin/login");
    }
    const loginHelper = async (data:loginData,role:string,url:string) => {
      try {
        const response = await fetch(url, {
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
          setUserRole(role);
          
          localStorage.setItem("userRole", role);
          sessionStorage.setItem("token", res.accessToken);
          localStorage.setItem("userId", res.user._id);
          return "success";
        }
        throw new Error(res.message);
      } catch (err) {
        console.error(err);
      }
    };


    const registerUser = async (data:registerDataUser) => {
      return await registerHelper(data,'User',"http://localhost:3001/api/authUser/register");
    }
    const registerDistributor = async (data:registerDataDistributor) => {
      return await registerHelper(data,'Distributor',"http://localhost:3001/api/authDistributor/register");
    }

    const registerHelper = async (data: registerDataUser | registerDataDistributor,role:string,url:string) => {
      try {
        const response = await fetch(url, {
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
          setUserRole(role);
         
          localStorage.setItem("userRole", role);
          sessionStorage.setItem("token", res.accessToken);
          localStorage.setItem("userId", res.user._id);
          return "success";
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
      localStorage.removeItem("userRole");
    
    };
  
    return (
      <AuthContext.Provider value={{ token, userId,userRole,loginUser,loginDistributor,loginAdmin, logout ,registerUser,registerDistributor }}>
        {children}
      </AuthContext.Provider>
    );
  
  };
  
  export default AuthProvider;
  
  export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;

  };