import React, { createContext, useState, useContext, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { AuthResponse } from '../interface/interface';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthResponse | null;
  getAccessToken: () => string | null;
  saveUser: (userData: AuthResponse) => void;
  getRefreshToken: () => string | null;
  logoutUser: () => void;
}

// Estados globales
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthResponse | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const { accessToken, expiry } = JSON.parse(token);
      const isTokenValid = new Date().getTime() < new Date(expiry).getTime();
      if (isTokenValid) {
        setAccessToken(accessToken);
        setIsAuthenticated(true);
        // Decodificar el token para establecer el usuario
        const decodedToken = jwtDecode(accessToken);
        setUser({ body: { accessToken }, ...decodedToken });
      } else {
        logoutUser();
      }
    }
  }, []);

  // Obtener el token de acceso
  function getAccessToken(): string | null {
    return accessToken;
  }

  // Obtener el token de refresco
  function getRefreshToken(): string | null {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const { refreshToken } = JSON.parse(token);
      return refreshToken;
    }
    return null;
  }

  // Guardar el token de validación
  function saveUser(userData: AuthResponse) {
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 5); // Token válido por 5 horas

    const tokenData = {
      accessToken: userData.body.accessToken,
      expiry: expiry.toISOString(),
    };

    setAccessToken(userData.body.accessToken);
    localStorage.setItem("accessToken", JSON.stringify(tokenData));
    setIsAuthenticated(true);

    // Decodificar el token para establecer el usuario
    const decodedToken = jwtDecode(userData.body.accessToken);
    setUser({ body: { accessToken: userData.body.accessToken }, ...decodedToken });
  }

  // Borrar el token de validación
  function logoutUser() {
    setAccessToken(null);
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, getAccessToken, saveUser, getRefreshToken, logoutUser, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
