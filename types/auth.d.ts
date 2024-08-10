export interface AuthResponse {
  success: boolean;
  message?: string;
  errors?: { [key: string]: string };
  isAuthenticated?: boolean;
  user?: User;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  balance: number;
}
