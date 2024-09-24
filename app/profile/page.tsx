"use client";

import React, { useState } from "react";
import ProfilePictureUploadModal from "@/components/profile/ProfilePictureUploadModal";
import { useAuth } from "@/contexts/AuthContext";
import Header from "../../components/shared/Header";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileStatistics from "@/components/profile/ProfileStatistics";
import TransactionsList from "@/components/profile/TransactionsList";
import { useTransactions } from "@/hooks/useTransactions";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import AccountSettings from "@/components/profile/AccountSettings";

const Profile: React.FC = () => {
  const { user, logout, loading } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);
  const [viewingTransactions, setViewingTransactions] = useState(false);

  const {
    transactions,
    currentPage,
    totalPages,
    handleNextPage,
    handlePreviousPage,
  } = useTransactions(user?._id, viewingTransactions);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <ProtectedRoute>
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
                <AccountSettings user={user} />
              </>
            ) : (
              <TransactionsList
                transactions={transactions}
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
    </ProtectedRoute>
  );
};

export default Profile;
