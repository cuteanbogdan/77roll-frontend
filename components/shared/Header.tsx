import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  FaCoins,
  FaSignOutAlt,
  FaDice,
  FaUserCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleDepositClick = () => {
    router.push("/profile?section=deposit");
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-900 flex-col md:flex-row">
      <div className="flex items-center justify-between w-full md:w-auto">
        <div
          className="text-red-500 text-2xl font-bold font-logo tracking-wide"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          77ROLL
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 ml-8 text-white">
          <a
            href="/coinflip"
            className={`flex items-center ${
              pathname === "/coinflip" ? "text-red-500" : "hover:text-red-500"
            }`}
          >
            <PiCoinVerticalFill className="mr-2" />
            Coinflip
          </a>
          <a
            href="/roulette"
            className={`flex items-center ${
              pathname === "/roulette" ? "text-red-500" : "hover:text-red-500"
            }`}
          >
            <FaDice className="mr-2" />
            Roulette
          </a>
        </nav>

        <div className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? (
            <FaTimes className="text-white text-2xl" />
          ) : (
            <FaBars className="text-white text-2xl" />
          )}
        </div>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        <span className="flex items-center text-white">
          <MdAccountBalanceWallet className="mr-2 text-yellow-500" />
          Balance:{" "}
          <span className="font-bold ml-1">
            {loading ? "Loading..." : balance.toFixed(2)}
          </span>
        </span>
        <button
          onClick={handleDepositClick}
          className="flex items-center bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
        >
          <FaCoins className="mr-2 text-yellow-400" />
          Deposit
        </button>
        <a
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
        </a>
        <button
          onClick={logout}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-0 right-0 w-3/4 h-full bg-gray-900 text-white z-50 flex flex-col p-6">
          <div className="flex justify-end w-full mb-4">
            <FaTimes className="text-white text-2xl" onClick={toggleMenu} />
          </div>

          <a
            href="/coinflip"
            className={`mb-4 w-full text-left flex items-center ${
              pathname === "/coinflip" ? "text-red-500" : "hover:text-red-500"
            }`}
            onClick={toggleMenu}
          >
            <PiCoinVerticalFill className="mr-2" />
            Coinflip
          </a>
          <a
            href="/roulette"
            className={`mb-4 w-full text-left flex items-center ${
              pathname === "/roulette" ? "text-red-500" : "hover:text-red-500"
            }`}
            onClick={toggleMenu}
          >
            <FaDice className="mr-2" />
            Roulette
          </a>
          <div className="mb-4 w-full flex items-center">
            <MdAccountBalanceWallet className="mr-2 text-yellow-500" />
            Balance: {loading ? "Loading..." : balance.toFixed(2)}
          </div>
          <button
            onClick={() => {
              handleDepositClick();
              toggleMenu();
            }}
            className="mb-4 w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
          >
            Deposit
          </button>
          <a
            href={pathname !== "/profile" ? "/profile" : "#"}
            className="mb-4 w-full flex items-center"
            onClick={toggleMenu}
          >
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <FaUserCircle className="text-white text-2xl" />
            )}
            <span className="ml-2">Profile</span>
          </a>
          <button
            onClick={() => {
              logout();
              toggleMenu();
            }}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
