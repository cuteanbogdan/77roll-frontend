import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaCoins, FaSignOutAlt, FaDice, FaUserCircle } from "react-icons/fa";
import { PiCoinVerticalFill } from "react-icons/pi";
import { MdAccountBalanceWallet } from "react-icons/md";
import { User } from "@/types/auth";

interface HeaderProps {
  balance: number;
  loading: boolean;
  user: User | null;
  logout: () => void;
}

const Header: React.FC<HeaderProps> = ({ balance, loading, user, logout }) => {
  const pathname = usePathname();

  return (
    <header className="flex justify-between items-center p-4 bg-gray-900">
      <div className="flex items-center">
        <div
          className="text-red-500 text-2xl font-bold font-logo tracking-wide"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          77ROLL
        </div>
        <nav className="flex space-x-8 ml-8 text-white">
          <Link
            href="/coinflip"
            className={`flex items-center ${
              pathname === "/coinflip" ? "text-red-500" : "hover:text-red-500"
            }`}
          >
            <PiCoinVerticalFill className="mr-2" />
            Coinflip
          </Link>
          <Link
            href="/roulette"
            className={`flex items-center ${
              pathname === "/roulette" ? "text-red-500" : "hover:text-red-500"
            }`}
          >
            <FaDice className="mr-2" />
            Roulette
          </Link>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <span className="flex items-center text-white">
          <MdAccountBalanceWallet className="mr-2 text-yellow-500" />
          Balance:{" "}
          <span className="font-bold ml-1">
            {loading ? "Loading..." : balance.toFixed(2)}
          </span>
        </span>
        <button className="flex items-center bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500">
          <FaCoins className="mr-2 text-yellow-400" />
          Deposit
        </button>
        <Link
          href={pathname !== "/profile" ? "/profile" : "#"}
          className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden"
        >
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <FaUserCircle className="text-white text-2xl" />
          )}
        </Link>
        <button
          onClick={logout}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
