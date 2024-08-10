import api from "./api";

export const loginUser = (data: any) => api.post("/api/auth/login", data);

export const registerUser = (data: any) => api.post("/api/auth/register", data);

export const logoutUser = () => api.post("/api/auth/logout");

export const checkUserAuth = () => api.get("/api/auth/check");
