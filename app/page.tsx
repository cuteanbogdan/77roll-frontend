"use client";

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import GameInfo from "../components/GameInfo";
import RouletteDisplay from "../components/RouletteDisplay";
import BettingArea from "../components/BettingArea";
import HistoryArea from "../components/HistoryArea";
import BettingControl from "@/components/BettingControl";
import SocketService from "@/services/socketService";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";

const HomePage: React.FC = () => {
  const { user, loading, setUser } = useAuth();
  const [rouletteNumbers, setRouletteNumbers] = useState([
    1, 14, 2, 13, 3, 12, 4, 0, 11, 5, 10, 6, 9, 7, 8,
  ]);
  const [targetNumber, setTargetNumber] = useState(14);
  const [bets, setBets] = useState<any[]>([]);
  const [history, setHistory] = useState([7, 4, 13, 9, 0]);
  const [betAmount, setBetAmount] = useState(0.01);

  useEffect(() => {
    SocketService.connect(process.env.NEXT_PUBLIC_BACKEND_URL || "");

    SocketService.on(
      "roulette-result",
      (result: { winningNumber: number; updatedHistory: number[] }) => {
        setTargetNumber(result.winningNumber);
        setHistory(result.updatedHistory);
      }
    );

    SocketService.on("bet-updated", (updatedBets: any[]) => {
      setBets(updatedBets);
    });

    SocketService.on("all-bets", (allBets: any[]) => {
      setBets(allBets);
    });
    SocketService.emit("get-all-bets", {});

    SocketService.on("balance-updated", (balance: number) => {
      console.log("Balance updated event received with balance:", balance);
      if (balance !== undefined && user) {
        setUser((prevUser) => {
          if (!prevUser) return null;

          console.log("Updating user balance in state:", balance);
          return {
            ...prevUser,
            balance: balance,
          };
        });
      } else {
        console.error("Received undefined balance, not updating user state.");
      }
    });

    SocketService.on("clear-bets", () => {
      setBets([]);
    });

    return () => {
      SocketService.off("roulette-result");
      SocketService.off("bet-updated");
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
              numbers={rouletteNumbers}
              targetNumber={targetNumber}
            />
          </div>
          <div className="p-4 bg-gray-900 flex justify-center items-center mb-2">
            <BettingControl betAmount={betAmount} setBetAmount={setBetAmount} />
          </div>

          <BettingArea
            bets={Array.isArray(bets) ? bets : []}
            placeBet={placeBet}
          />
          <HistoryArea history={history} />
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default HomePage;
