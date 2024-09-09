"use client";

import React, { useReducer } from "react";
import Header from "@/components/shared/Header";
import Chat from "@/components/shared/chat/Chat";
import CoinflipRooms from "@/components/coinflip/CoinflipRooms";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { reducer, initialState } from "@/contexts/stateManagement";
import CreateCoinflipRoom from "@/components/coinflip/CreateCoinflipRoom";

const CoinflipPage: React.FC = () => {
  const { user, loading: authLoading, logout } = useAuth();
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <Header
          balance={user?.balance || 0}
          loading={authLoading}
          user={user}
          logout={logout}
        />

        <div className="flex flex-1">
          <div className="w-full md:w-1/5 p-4 h-[90vh] overflow-y-auto bg-gray-800 rounded-lg">
            <Chat user={user} state={state} />
          </div>

          <div className="flex-1 px-4">
            <CreateCoinflipRoom />

            <CoinflipRooms />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CoinflipPage;
