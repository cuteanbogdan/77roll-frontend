"use client";

import React, { useReducer, useState, useEffect } from "react";
import Header from "@/components/shared/Header";
import GameInfo from "@/components/roulette/GameInfo";
import RouletteDisplay from "@/components/roulette/RouletteDisplay";
import BettingArea from "@/components/roulette/BettingArea";
import HistoryArea from "@/components/roulette/HistoryArea";
import BettingControl from "@/components/roulette/BettingControl";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import {
  reducer,
  initialState,
  initialMessagesState,
  messagesReducer,
} from "@/contexts/stateManagement";
import { useSocketListeners } from "@/events/socketEvents";
import { placeBet, rouletteNumbers } from "@/utils/bettingUtils";
import SocketService from "@/services/socketService";
import Chat from "@/components/shared/chat/Chat";
import { useMessageSocketListeners } from "@/events/messagesSocketEvents";

const HomePage: React.FC = () => {
  const { user, loading: authLoading, setUser, logout } = useAuth();
  const [betAmount, setBetAmount] = useState(0.01);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [stateMessages, dispatchMessages] = useReducer(
    messagesReducer,
    initialMessagesState
  );
  const [loading, setLoading] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useSocketListeners(dispatch, setUser, user);
  useMessageSocketListeners(dispatchMessages, user);
  useEffect(() => {
    if (isFirstLoad) {
      setLoading(true);
    }
  }, [isFirstLoad]);

  const handlePlaceBet = (color: string) => {
    if (user && state.bettingOpen && !loading) {
      placeBet(user._id, color, betAmount);
    } else if (loading) {
      alert("Please wait until the current round finishes loading.");
    } else {
      alert("Betting is currently closed! Please wait for the next round.");
    }
  };

  const handleAnimationComplete = () => {
    setLoading(false);
    setIsFirstLoad(false);
    SocketService.emit("get-history", {});
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

          <div className="flex flex-col w-full md:w-3/4">
            <main className="relative w-full max-w-5xl mx-auto bg-gray-900">
              <GameInfo roundNumber={state.roundNumber + 1} />
              <div className="flex justify-center mx-auto overflow-hidden mb-8">
                <RouletteDisplay
                  numbers={rouletteNumbers}
                  targetNumber={state.targetNumber}
                  roundNumber={state.roundNumber}
                  onAnimationComplete={handleAnimationComplete}
                  loading={loading}
                />
              </div>
              <div className="flex justify-center">
                <HistoryArea history={state.history} />
              </div>

              <div className="py-4 bg-gray-900 flex justify-center items-center mb-2 w-full">
                <BettingControl
                  betAmount={betAmount}
                  setBetAmount={setBetAmount}
                />
              </div>
              <BettingArea
                bets={state.bets}
                placeBet={handlePlaceBet}
                bettingOpen={state.bettingOpen && !loading}
              />
            </main>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default HomePage;
