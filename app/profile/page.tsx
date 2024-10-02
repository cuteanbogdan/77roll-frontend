"use client";

import React, { useState, useEffect } from "react";
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

const Profile: React.FC = () => {
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
                  className={`block p-2 bg-gray-700 rounded hover:bg-gray-600 ${
                    activeSection === "details" ? "bg-gray-600" : ""
                  }`}
                  onClick={() => setActiveSection("details")}
                >
                  Details
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className={`block p-2 bg-gray-700 rounded hover:bg-gray-600 ${
                    activeSection === "transactions" ? "bg-gray-600" : ""
                  }`}
                  onClick={() => setActiveSection("transactions")}
                >
                  Transactions
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className={`block p-2 bg-gray-700 rounded hover:bg-gray-600 ${
                    activeSection === "deposit" ? "bg-gray-600" : ""
                  }`}
                  onClick={() => setActiveSection("deposit")}
                >
                  Deposit
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className={`block p-2 bg-gray-700 rounded hover:bg-gray-600 ${
                    activeSection === "withdraw" ? "bg-gray-600" : ""
                  }`}
                  onClick={() => setActiveSection("withdraw")}
                >
                  Withdraw
                </a>
              </li>
            </ul>
          </div>

          <div className="w-3/4 ml-8 bg-gray-800 p-6 rounded-lg">
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
    </ProtectedRoute>
  );
};

export default Profile;
