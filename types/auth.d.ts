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
  profileImage: string;
  rank: string;
  experience: number;
  level: number;
  xpToNextLevel: number;
  totalBets: number;
  totalBetRoulette: number;
  totalBetCoinflip: number;
}

export interface Transaction {
  _id: string;
  userId: string;
  type: string;
  amount: number;
  date: Date;
}

export interface Message {
  userId: string;
  username: string;
  text: string;
  level: number;
  profileImage: string;
}
