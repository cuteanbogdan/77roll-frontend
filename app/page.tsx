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

const HomePage: React.FC = () => {
  const roundNumber = 1234567;
  const countdown = 6;
  const initialRouletteNumbers = [
    1, 14, 2, 13, 3, 12, 4, 0, 11, 5, 10, 6, 9, 7, 8,
  ];

  const [rouletteNumbers, setRouletteNumbers] = useState(
    initialRouletteNumbers
  );
  const [targetNumber, setTargetNumber] = useState(14);
  const [bets, setBets] = useState<any[]>([]);
  const [history, setHistory] = useState([7, 4, 13, 9, 0]);
  const [betAmount, setBetAmount] = useState(0.01); // Default bet amount

  useEffect(() => {
    SocketService.connect(process.env.NEXT_PUBLIC_BACKEND_URL || "");

    SocketService.on(
      "roulette-result",
      (result: { winningNumber: number; updatedHistory: number[] }) => {
        setTargetNumber(result.winningNumber);
        setHistory(result.updatedHistory);
      }
    );

    SocketService.on("all-bets", (allBets: any[]) => {
      setBets(allBets);
      console.log(allBets);
    });

    SocketService.emit("get-all-bets", roundNumber);

    SocketService.on("bet-updated", (updatedBets: any[]) => {
      setBets(updatedBets);
    });

    SocketService.on("clear-bets", () => {
      setBets([]);
    });

    return () => {
      SocketService.off("roulette-result");
      SocketService.off("all-bets");
      SocketService.off("bet-updated");
      SocketService.off("clear-bets");
      SocketService.disconnect();
    };
  }, [roundNumber]);

  const placeBet = (color: string) => {
    SocketService.emit("place-bet", {
      color,
      amount: betAmount,
      userId: "66b73b485dcac28cda156efa",
    });
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-900">
        <Header />
        <main className="relative w-full max-w-5xl mx-auto bg-gray-900">
          <GameInfo roundNumber={roundNumber} countdown={countdown} />
          <div className="relative w-4/5 mx-auto overflow-hidden mb-8">
            <RouletteDisplay
              numbers={rouletteNumbers}
              targetNumber={targetNumber}
            />
          </div>
          <div className="p-4 bg-gray-900 flex justify-center items-center mb-2">
            <BettingControl betAmount={betAmount} setBetAmount={setBetAmount} />
          </div>

          <BettingArea bets={bets} placeBet={placeBet} />
          <HistoryArea history={history} />
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default HomePage;
