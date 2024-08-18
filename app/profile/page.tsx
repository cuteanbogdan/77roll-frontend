"use client";

import React, { useEffect, useState } from "react";
import ProfilePictureUploadModal from "@/components/profile/ProfilePictureUploadModal";
import { useAuth } from "@/contexts/AuthContext";
import Header from "../../components/Header";
import { FaCoins } from "react-icons/fa";
import { getUserById } from "@/handlers/userHandler";
import { User } from "@/types/auth";

const Profile: React.FC = () => {
  const { user, setUser, logout, loading } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?._id) {
        try {
          const response = await getUserById(user._id);
          const fetchedUser: User = response.data;
          if (fetchedUser) {
            setUser(fetchedUser);
          }
        } catch (error) {
          console.error("Failed to fetch user data", error);
        }
      }
    };

    fetchUserData();
  }, [user?._id, setUser]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header
        balance={user?.balance || 0}
        loading={loading}
        user={user}
        logout={logout}
      />
      <div className="flex max-w-7xl mx-auto py-8">
        <div className="w-1/4 bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-bold mb-4">Profile</h2>
          <ul>
            <li className="mb-2">
              <a
                href="#"
                className="block p-2 bg-gray-700 rounded hover:bg-gray-600"
              >
                Details
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                className="block p-2 bg-gray-700 rounded hover:bg-gray-600"
              >
                Transactions
              </a>
            </li>
          </ul>
        </div>

        <div className="w-3/4 ml-8 bg-gray-800 p-6 rounded-lg">
          {/* Profile Info */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <img
                src={user?.profileImage || "/profile.png"}
                alt="Profile"
                className="w-24 h-24 rounded-full mr-4 cursor-pointer object-cover border-2 border-gray-700 shadow-lg"
                onClick={handleOpenModal}
              />
              <div>
                <h2 className="text-xl font-bold">
                  {user?.username || "User"}
                </h2>
                <p className="text-gray-400">
                  Level {user?.level} • Rank: {user?.rank}
                </p>
              </div>
            </div>
            <div className="w-full max-w-xs">
              <div className="text-right text-sm text-gray-400 mb-1">
                Experience: {user?.experience.toFixed(0)} /{" "}
                {((user?.xpToNextLevel ?? 0) + (user?.experience ?? 0)).toFixed(
                  0
                )}
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{
                    width: `${
                      ((user?.experience || 0) / (user?.xpToNextLevel || 1)) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4">Statistics</h3>
            <div className="bg-gray-700 p-4 rounded-lg mb-4">
              <div className="flex justify-between">
                <span>Total Bets</span>
                <span className="flex items-center">
                  <FaCoins className="text-yellow-500 mr-2" />
                  {user?.totalBets?.toFixed(2) || "0.00"}
                </span>
              </div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg mb-4">
              <div className="flex justify-between">
                <span>Total Bet Roulette</span>
                <span className="flex items-center">
                  <FaCoins className="text-yellow-500 mr-2" />
                  {user?.totalBetRoulette?.toFixed(2) || "0.00"}
                </span>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div>
            <h3 className="text-lg font-bold mb-4">Account settings</h3>
            <div className="bg-gray-700 p-4 rounded-lg mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold">Two-Factor Authentication (2FA)</h4>
                  <p className="text-gray-400">2FA enabled</p>
                </div>
                <div>
                  <button className="bg-gray-600 text-white px-4 py-2 rounded mr-2 hover:bg-gray-500">
                    Disable
                  </button>
                  <button className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400">
                    View Recovery
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold">Take a break</h4>
                  <p className="text-gray-400">
                    If you think you have been playing for too long, it might be
                    a good option to take a break.
                  </p>
                </div>
                <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500">
                  Enable
                </button>
              </div>
            </div>
          </div>
          <ProfilePictureUploadModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
