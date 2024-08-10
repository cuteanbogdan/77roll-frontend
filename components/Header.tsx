import React from "react";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  balance: number;
  loading: boolean;
}

const Header: React.FC<HeaderProps> = ({ balance, loading }) => {
  const { logout } = useAuth();

  return (
    <header className="flex justify-between items-center p-4 bg-gray-900">
      <nav className="flex space-x-8 text-white">
        <a href="#" className="hover:text-red-500">
          Coinflip
        </a>
        <a href="#" className="text-red-500">
          Roulette
        </a>
        <a href="#" className="hover:text-red-500">
          Clan
        </a>
      </nav>
      <div className="flex items-center space-x-4">
        <span className="text-white">
          Balance:{" "}
          <span className="font-bold">
            {loading ? "Loading..." : balance.toFixed(2)}
          </span>
        </span>
        <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500">
          Deposit
        </button>
        <button
          onClick={logout}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
