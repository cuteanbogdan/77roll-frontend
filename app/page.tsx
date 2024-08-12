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
import { placeBet, rouletteNumbers } from "@/utils/bettingUtils";

const HomePage: React.FC = () => {
  const { user, loading, setUser } = useAuth();
  const [betAmount, setBetAmount] = useState(0.01);
  const [state, dispatch] = useReducer(reducer, initialState);

  useSocketListeners(dispatch, setUser, user);

  const handlePlaceBet = (color: string) => {
    if (user && state.bettingOpen) {
      placeBet(user._id, color, betAmount);
    } else {
      alert("Betting is currently closed! Please wait for the next round.");
    }
  };

  const handleAnimationComplete = () => {
    dispatch({
      type: "SET_HISTORY",
      payload: [state.targetNumber, ...state.history], //Temporary, needs fix
    });
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-900">
        <Header balance={user?.balance || 0} loading={loading} />

        <main className="relative w-full max-w-5xl mx-auto bg-gray-900">
          <GameInfo roundNumber={state.roundNumber + 1} />
          <div className="flex justify-center mx-auto overflow-hidden mb-8">
            <RouletteDisplay
              numbers={rouletteNumbers}
              targetNumber={state.targetNumber}
              roundNumber={state.roundNumber}
              onAnimationComplete={handleAnimationComplete}
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
