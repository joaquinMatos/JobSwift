import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthResponse } from '../interface/interface';
import { Navigate } from 'react-router';

interface AuthProviderProps {
  children: React.ReactNode;
}

// Estados globales
const AuthContext = createContext({
  isAuthenticated: false,
  getAccessToken: () => {},
  saveUser: (userData: AuthResponse) => {}, 
  getRefreshToken: () => {},
  logoutUser: () => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("Authorization");
    if (token) {
      const { accessToken, expiry } = JSON.parse(token);
      const isTokenValid = new Date().getTime() < new Date(expiry).getTime();
      if (isTokenValid) {
        setAccessToken(accessToken);
        setIsAuthenticated(true);
      } else {
        logoutUser();
      }
    }
  }, []);

  // Obtener el token de acceso
  function getAccessToken() {
    return accessToken;
  }

  // Obtener el token de refresco
  function getRefreshToken(): string | null {
    const token = localStorage.getItem("Authorization");
    if (token) {
      const { refreshToken } = JSON.parse(token);
      return refreshToken;
    }
    return null;
  }

  // Guardar el token de validación
  function saveUser(userData: AuthResponse) {
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 1); // Token válido por 1 hora

    const tokenData = {
      accessToken: userData.body.accessToken,
      expiry: expiry.toISOString(),
    };

    setAccessToken(userData.body.accessToken);
    localStorage.setItem("Authorization", JSON.stringify(tokenData));
    localStorage.setItem("Type", JSON.stringify(tokenData));
    setIsAuthenticated(true);
  }

  // Borrar el token de validación
  function logoutUser() {
    setAccessToken("");
    localStorage.removeItem("Authorization");
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, getAccessToken, saveUser, getRefreshToken, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
