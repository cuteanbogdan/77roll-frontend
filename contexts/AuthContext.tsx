"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkAuth, login, logout, register } from "@/handlers/authHandler";
import { AuthResponse } from "@/types/auth";

interface AuthContextProps {
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (
    email: string,
    password: string,
    username: string
  ) => Promise<AuthResponse>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUserAuth = async () => {
      const result = await checkAuth();
      setIsAuthenticated(result.isAuthenticated || false);
      setLoading(false);
    };

    checkUserAuth();
  }, []);

  const handleLogin = async (
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      setIsAuthenticated(true);
    }
    return result;
  };

  const handleRegister = async (
    email: string,
    password: string,
    username: string
  ): Promise<AuthResponse> => {
    setLoading(true);
    const result = await register(email, password, username);
    setLoading(false);

    if (result.success) {
      setIsAuthenticated(true);
    }
    return result;
  };

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      setIsAuthenticated(false);
      router.push("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
