"use client";

import React, { useReducer, useState } from "react";
import Header from "../components/Header";
import GameInfo from "../components/GameInfo";
import RouletteDisplay from "../components/RouletteDisplay";
import BettingArea from "../components/BettingArea";
import HistoryArea from "../components/HistoryArea";
import BettingControl from "@/components/BettingControl";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { reducer, initialState } from "../contexts/stateManagement";
import { useSocketListeners } from "../events/socketEvents";
import { placeBet } from "@/utils/bettingUtils";

const HomePage: React.FC = () => {
  const { user, loading, setUser } = useAuth();
  const [betAmount, setBetAmount] = useState(0.01);
  const [state, dispatch] = useReducer(reducer, initialState);

  useSocketListeners(dispatch, setUser, user);

  const handlePlaceBet = (color: string) => {
    if (user) {
      placeBet(user._id, color, betAmount);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-900">
        <Header balance={user?.balance || 0} loading={loading} />

        <main className="relative w-full max-w-5xl mx-auto bg-gray-900">
          <GameInfo roundNumber={1234567} countdown={6} />
          <div className="relative w-4/5 mx-auto overflow-hidden mb-8">
            <RouletteDisplay
              numbers={[1, 14, 2, 13, 3, 12, 4, 0, 11, 5, 10, 6, 9, 7, 8]}
              targetNumber={state.targetNumber}
            />
          </div>
          <div className="p-4 bg-gray-900 flex justify-center items-center mb-2">
            <BettingControl betAmount={betAmount} setBetAmount={setBetAmount} />
          </div>

          <BettingArea bets={state.bets} placeBet={handlePlaceBet} />
          <HistoryArea history={state.history} />
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default HomePage;
