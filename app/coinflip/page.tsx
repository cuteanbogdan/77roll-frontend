"use client";

import React, { useReducer, useState } from "react";
import Header from "@/components/shared/Header";
import Chat from "@/components/shared/chat/Chat";
import CoinflipRooms from "@/components/coinflip/CoinflipRooms";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import {
  coinflipReducer,
  initialCoinflipState,
  initialMessagesState,
  messagesReducer,
} from "@/contexts/stateManagement";
import CreateCoinflipRoom from "@/components/coinflip/CreateCoinflipRoom";
import { useCoinflipSocketListeners } from "@/events/coinflipSocketEvents";
import { useMessageSocketListeners } from "@/events/messagesSocketEvents";

const CoinflipPage: React.FC = () => {
  const { user, loading: authLoading, logout, setUser } = useAuth();
  const [state, dispatch] = useReducer(coinflipReducer, initialCoinflipState);
  const [stateMessages, dispatchMessages] = useReducer(
    messagesReducer,
    initialMessagesState
  );

  const [betAmount, setBetAmount] = useState(0.01);
  const [choice, setChoice] = useState<"heads" | "tails">("heads");

  useCoinflipSocketListeners(dispatch, setUser, user);
  useMessageSocketListeners(dispatchMessages, user);

  const handleCreateRoom = () => {
    // Emit event to create room
  };

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
            <Chat user={user} state={stateMessages} />
          </div>

          <div className="flex-1 px-4">
            <CreateCoinflipRoom
              betAmount={betAmount}
              setBetAmount={setBetAmount}
              choice={choice}
              setChoice={setChoice}
              handleCreateRoom={handleCreateRoom}
            />

            <CoinflipRooms rooms={state.rooms} />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CoinflipPage;
