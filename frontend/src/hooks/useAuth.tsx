import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { loginData, registerDataCustomer, registerDataDistributor, userRole } from '../types/UserType';
import Cookies from 'js-cookie';
import { _post, _get } from '../utils/api';
import * as jose from 'jose';

interface UserData {
  id: string;
  email: string;
  role: string;
  name: string;
}

interface AuthContextType {
  token: string | null;
  user: UserData | null;
  isAuthenticated: boolean;
  login: (data: loginData) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (data: registerDataCustomer | registerDataDistributor) => Promise<boolean>;
  refreshToken: () => Promise<boolean>;
  updateUser: (userData: Partial<UserData>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(Cookies.get('accessToken') || null);
  const [user, setUser] = useState<UserData | null>(null);

  const decodeToken = useCallback((token: string) => {
    try {
      return jose.decodeJwt(token) as UserData;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }, []);

  useEffect(() => {
    if (token) {
      const decodedUser :UserData = decodeToken(token) as UserData;
      setUser(decodedUser);
      localStorage.setItem('userRole', decodedUser?.role);
      localStorage.setItem('userId', decodedUser?.id);
    } else {
      setUser(null);
    }
  }, [token, decodeToken]);

  const login = async (data: loginData): Promise<boolean> => {
    try {
      await _post('/authUser/login', data, token, { credentials: 'include' });
      const newToken = Cookies.get('accessToken');
      if (!newToken) throw new Error('No token in response');
      setToken(newToken);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (data: registerDataDistributor | registerDataCustomer): Promise<boolean> => {
    try {
      await _post('/authUser/register', data,token, { credentials: 'include' });
      const newToken = Cookies.get('accessToken');
      if (!newToken) throw new Error('No token in response');
      setToken(newToken);
      return true;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await _post('/authUser/logout', {},token, { credentials: 'include' });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      Cookies.remove('accessToken');
      setToken(null);
      setUser(null);
    }
  };

  const refreshToken = async (): Promise<boolean> => {
    try {
      await _get('/authUser/refresh', { credentials: 'include' });
      const newToken = Cookies.get('accessToken');
      if (!newToken) throw new Error('No token in response');
      setToken(newToken);
      return true;
    } catch (error) {
      console.error('Token refresh error:', error);
      logout();
      return false;
    }
  };

  const updateUser = (userData: Partial<UserData>): void => {
    setUser(prevUser => prevUser ? { ...prevUser, ...userData } : null);
  };

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider value={{ 
      token, 
      user, 
      isAuthenticated, 
      login, 
      logout, 
      register, 
      refreshToken,
      updateUser
    }}>
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