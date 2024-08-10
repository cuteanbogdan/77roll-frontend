"use client";

import React, { useEffect, useReducer, useState } from "react";
import Header from "../components/Header";
import GameInfo from "../components/GameInfo";
import RouletteDisplay from "../components/RouletteDisplay";
import BettingArea from "../components/BettingArea";
import HistoryArea from "../components/HistoryArea";
import BettingControl from "@/components/BettingControl";
import SocketService from "@/services/socketService";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";

type ActionType =
  | { type: "SET_BETS"; payload: any[] }
  | { type: "ADD_BET"; payload: any }
  | { type: "CLEAR_BETS" }
  | { type: "SET_HISTORY"; payload: number[] }
  | { type: "SET_TARGET_NUMBER"; payload: number };

const initialState: StateType = {
  bets: [],
  history: [7, 4, 13, 9, 0],
  targetNumber: 14,
};

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "SET_BETS":
      return { ...state, bets: action.payload };
    case "ADD_BET":
      return { ...state, bets: [...state.bets, action.payload] };
    case "CLEAR_BETS":
      return { ...state, bets: [] };
    case "SET_HISTORY":
      return { ...state, history: action.payload };
    case "SET_TARGET_NUMBER":
      return { ...state, targetNumber: action.payload };
    default:
      return state;
  }
}

const HomePage: React.FC = () => {
  const { user, loading, setUser } = useAuth();
  const [betAmount, setBetAmount] = useState(0.01);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    SocketService.connect(process.env.NEXT_PUBLIC_BACKEND_URL || "");

    SocketService.on(
      "roulette-result",
      (result: { winningNumber: number; updatedHistory: number[] }) => {
        dispatch({ type: "SET_TARGET_NUMBER", payload: result.winningNumber });
        dispatch({ type: "SET_HISTORY", payload: result.updatedHistory });
      }
    );

    SocketService.on("bet-updated", (updatedBets: any[]) => {
      if (updatedBets && updatedBets.length > 0) {
        dispatch({ type: "SET_BETS", payload: updatedBets });
      }
    });

    SocketService.on("new-bet", (newBet: any) => {
      if (newBet) {
        dispatch({ type: "ADD_BET", payload: newBet });
      }
    });

    SocketService.on("all-bets", (allBets: any[]) => {
      if (allBets && allBets.length > 0) {
        dispatch({ type: "SET_BETS", payload: allBets });
      }
    });

    SocketService.emit("get-all-bets", {});

    SocketService.on("balance-updated", (balance: number) => {
      if (balance !== undefined && user) {
        setUser((prevUser) => {
          if (!prevUser) return null;
          return {
            ...prevUser,
            balance: balance,
          };
        });
      }
    });

    SocketService.on("clear-bets", () => {
      dispatch({ type: "CLEAR_BETS" });
    });

    return () => {
      SocketService.off("roulette-result");
      SocketService.off("bet-updated");
      SocketService.off("new-bet");
      SocketService.off("all-bets");
      SocketService.off("balance-updated");
      SocketService.off("clear-bets");
      SocketService.disconnect();
    };
  }, [user, setUser]);

  const placeBet = (color: string) => {
    if (user) {
      SocketService.emit("place-bet", {
        color,
        amount: betAmount,
        userId: user._id,
      });
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

          <BettingArea bets={state.bets} placeBet={placeBet} />
          <HistoryArea history={state.history} />
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default HomePage;
