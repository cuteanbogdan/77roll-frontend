import axios from "axios";
import { AuthResponse } from "@/types/auth";
import {
  loginUser,
  registerUser,
  logoutUser,
  checkUserAuth,
} from "../services/authService";

export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await loginUser({ email, password });

    if (response.status === 200) {
      return { success: true };
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data.errors) {
        const errors: { [key: string]: string } = {};
        error.response.data.errors.forEach((err: any) => {
          errors[err.path] = err.msg;
        });
        return { success: false, errors };
      }
      return {
        success: false,
        message: error.response?.data.message || "Invalid email or password",
      };
    }
    return { success: false, message: "Something went wrong" };
  }
  return { success: false, message: "Something went wrong" };
};

export const register = async (
  email: string,
  password: string,
  username: string
): Promise<AuthResponse> => {
  try {
    const response = await registerUser({ email, password, username });

    if (response.status === 201) {
      return { success: true };
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data.errors) {
        const errors: { [key: string]: string } = {};
        error.response.data.errors.forEach((err: any) => {
          errors[err.path] = err.msg;
        });
        return { success: false, errors };
      }
      return {
        success: false,
        message: error.response?.data.message || "Invalid registration details",
      };
    }
    return { success: false, message: "Something went wrong" };
  }
  return { success: false, message: "Something went wrong" };
};

export const logout = async (): Promise<AuthResponse> => {
  try {
    const response = await logoutUser();

    if (response.status === 200) {
      return { success: true };
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data.message || "Logout failed",
      };
    }
    return { success: false, message: "Something went wrong" };
  }
  return { success: false, message: "Something went wrong" };
};

export const checkAuth = async (): Promise<AuthResponse> => {
  try {
    const response = await checkUserAuth();

    if (response.status === 200) {
      return { success: true, isAuthenticated: response.data.isAuthenticated };
    }
  } catch (error: unknown) {
    return { success: false, isAuthenticated: false };
  }
  return { success: false, isAuthenticated: false };
};
