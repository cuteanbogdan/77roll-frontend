"use client";

import React, { useState, useEffect, Suspense } from "react";
import ProfilePictureUploadModal from "@/components/profile/ProfilePictureUploadModal";
import { useAuth } from "@/contexts/AuthContext";
import Header from "../../components/shared/Header";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileStatistics from "@/components/profile/ProfileStatistics";
import TransactionsList from "@/components/profile/TransactionsList";
import { useTransactions } from "@/hooks/useTransactions";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import AccountSettings from "@/components/profile/AccountSettings";
import Deposit from "@/components/profile/Deposit";
import Withdraw from "@/components/profile/Withdraw";
import { useSearchParams } from "next/navigation";

const ProfileContent: React.FC = () => {
  const { user, logout, loading } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("details");

  const searchParams = useSearchParams();

  useEffect(() => {
    const section = searchParams.get("section");
    if (section) {
      setActiveSection(section);
    }
  }, [searchParams]);

  const {
    transactions,
    currentPage,
    totalPages,
    handleNextPage,
    handlePreviousPage,
  } = useTransactions(user?._id, activeSection === "transactions");

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
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto py-8">
        <div className="w-full lg:w-1/4 bg-gray-800 p-4 rounded-lg mb-4 lg:mb-0">
          <h2 className="text-lg font-bold mb-4">Profile</h2>
          <ul>
            <li className="mb-2">
              <button
                className={`block w-full text-left p-2 bg-gray-700 rounded hover:bg-gray-600 ${
                  activeSection === "details" ? "bg-gray-600" : ""
                }`}
                onClick={() => setActiveSection("details")}
              >
                Details
              </button>
            </li>
            <li className="mb-2">
              <button
                className={`block w-full text-left p-2 bg-gray-700 rounded hover:bg-gray-600 ${
                  activeSection === "transactions" ? "bg-gray-600" : ""
                }`}
                onClick={() => setActiveSection("transactions")}
              >
                Transactions
              </button>
            </li>
            <li className="mb-2">
              <button
                className={`block w-full text-left p-2 bg-gray-700 rounded hover:bg-gray-600 ${
                  activeSection === "deposit" ? "bg-gray-600" : ""
                }`}
                onClick={() => setActiveSection("deposit")}
              >
                Deposit
              </button>
            </li>
            <li className="mb-2">
              <button
                className={`block w-full text-left p-2 bg-gray-700 rounded hover:bg-gray-600 ${
                  activeSection === "withdraw" ? "bg-gray-600" : ""
                }`}
                onClick={() => setActiveSection("withdraw")}
              >
                Withdraw
              </button>
            </li>
          </ul>
        </div>
        <div className="w-full lg:ml-8 lg:w-3/4 bg-gray-800 p-6 rounded-lg">
          {activeSection === "details" && (
            <>
              <ProfileHeader user={user} onOpenModal={handleOpenModal} />
              <ProfileStatistics user={user} />
              <AccountSettings user={user} />
            </>
          )}
          {activeSection === "transactions" && (
            <TransactionsList
              transactions={transactions}
              currentPage={currentPage}
              totalPages={totalPages}
              handleNextPage={handleNextPage}
              handlePreviousPage={handlePreviousPage}
            />
          )}
          {activeSection === "deposit" && <Deposit user={user} />}
          {activeSection === "withdraw" && <Withdraw user={user} />}
          <ProfilePictureUploadModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        </div>
      </div>
    </div>
  );
};

const Profile: React.FC = () => (
  <ProtectedRoute>
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileContent />
    </Suspense>
  </ProtectedRoute>
);

export default Profile;
