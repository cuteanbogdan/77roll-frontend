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
import socketService from "@/services/socketService";

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
    if (user && betAmount > 0 && choice) {
      socketService.emit("create-room-coinflip", {
        userId: user._id,
        choice,
        betAmount,
      });
    } else {
      alert("Invalid bet or choice");
    }
  };

  const handleJoinRoom = (roomId: string) => {
    if (user && roomId) {
      socketService.emit("join-room-coinflip", {
        roomId,
        userId: user._id,
      });

      socketService.on("room-joined", (updatedRoom) => {
        dispatch({ type: "UPDATE_ROOM", payload: updatedRoom });
      });
    } else {
      alert("Unable to join the room.");
    }
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

            <CoinflipRooms rooms={state.rooms} onJoinRoom={handleJoinRoom} />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CoinflipPage;
