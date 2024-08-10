export interface AuthResponse {
  success: boolean;
  message?: string;
  errors?: { [key: string]: string };
  isAuthenticated?: boolean;
}
