"use client";

import React, { useEffect, useState } from "react";
import ProfilePictureUploadModal from "@/components/profile/ProfilePictureUploadModal";
import { useAuth } from "@/contexts/AuthContext";
import Header from "../../components/shared/Header";
import { getUserById } from "@/handlers/userHandler";
import { getUserTransactions } from "@/handlers/transactionHandler";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileStatistics from "@/components/profile/ProfileStatistics";
import TransactionsList from "@/components/profile/TransactionsList";
import { User, Transaction } from "@/types/auth";

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
              <ProfileHeader user={user} onOpenModal={handleOpenModal} />
              <ProfileStatistics user={user} />
            </>
          ) : (
            <TransactionsList
              transactions={currentTransactions}
              currentPage={currentPage}
              totalPages={totalPages}
              handleNextPage={handleNextPage}
              handlePreviousPage={handlePreviousPage}
            />
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
