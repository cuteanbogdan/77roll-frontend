"use client";

import React, { useEffect, useState } from "react";
import ProfilePictureUploadModal from "@/components/profile/ProfilePictureUploadModal";
import { useAuth } from "@/contexts/AuthContext";
import Header from "../../components/shared/Header";
import { FaCoins } from "react-icons/fa";
import { getUserById } from "@/handlers/userHandler";
import { User, Transaction } from "@/types/auth";
import { getUserTransactions } from "@/handlers/transactionHandler";

const Profile: React.FC = () => {
  const { user, setUser, logout, loading } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);
  const [viewingTransactions, setViewingTransactions] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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

  useEffect(() => {
    if (viewingTransactions && user?._id) {
      const fetchTransactions = async () => {
        try {
          const response = await getUserTransactions(user._id);
          setTransactions(response.data);
        } catch (error) {
          console.error("Failed to fetch transactions", error);
        }
      };

      fetchTransactions();
    }
  }, [viewingTransactions, user?._id]);

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
                onClick={() => setViewingTransactions(false)}
              >
                Details
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                className="block p-2 bg-gray-700 rounded hover:bg-gray-600"
                onClick={() => setViewingTransactions(true)}
              >
                Transactions
              </a>
            </li>
          </ul>
        </div>

        <div className="w-3/4 ml-8 bg-gray-800 p-6 rounded-lg">
          {!viewingTransactions ? (
            <>
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
                    {(
                      (user?.xpToNextLevel ?? 0) + (user?.experience ?? 0)
                    ).toFixed(0)}
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{
                        width: `${
                          ((user?.experience || 0) /
                            ((user?.xpToNextLevel ?? 0) +
                              (user?.experience ?? 0) || 1)) *
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
            </>
          ) : (
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4">Transactions</h3>
              {currentTransactions.length > 0 ? (
                currentTransactions.map((transaction) => (
                  <div
                    key={transaction._id}
                    className="bg-gray-700 p-2 rounded-lg mb-2"
                  >
                    <div className="flex justify-between">
                      <span>{transaction.type}</span>
                      <span
                        className={`flex items-center ${
                          transaction.amount > 0
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {transaction.amount.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-gray-400 text-sm">
                      {new Date(transaction.date).toLocaleDateString()}{" "}
                      {new Date(transaction.date).toLocaleTimeString()}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No transactions found.</p>
              )}

              <div className="flex justify-between mt-4">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-gray-400">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}

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
