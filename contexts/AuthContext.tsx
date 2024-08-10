"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkAuth, login, logout, register } from "@/handlers/authHandler";
import { AuthResponse, User } from "@/types/auth";

interface AuthContextProps {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (
    email: string,
    password: string,
    username: string
  ) => Promise<AuthResponse>;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>; // Add setUser to the context
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUserAuth = async () => {
      const result = await checkAuth();
      setIsAuthenticated(result.isAuthenticated || false);
      setUser(result.user || null);
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
      setUser(null);
      router.push("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        user,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        setUser,
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
