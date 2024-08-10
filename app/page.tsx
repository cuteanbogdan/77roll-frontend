// src/app/page.tsx
import React from "react";
import Header from "../components/Header";
import GameInfo from "../components/GameInfo";
import RouletteDisplay from "../components/RouletteDisplay";
import BettingArea from "../components/BettingArea";
import HistoryArea from "../components/HistoryArea";
import BettingControl from "@/components/BettingControl";

const HomePage: React.FC = () => {
  const roundNumber = 1234567;
  const countdown = 6;
  const rouletteNumbers = [1, 14, 2, 13, 3, 12, 4, 0, 11, 5, 10, 6, 9, 7, 8];

  const bets = [
    { username: "automotive", color: "red", amount: 10.566 },
    { username: "gandolf", color: "red", amount: 8.695 },
    { username: "roma232", color: "black", amount: 12.654 },
    { username: "my_name", color: "green", amount: 250 },
  ];
  const history = [7, 4, 13, 9, 0];

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="relative w-full max-w-5xl mx-auto bg-gray-900">
        <GameInfo roundNumber={roundNumber} countdown={countdown} />
        <div className="relative w-4/5 mx-auto overflow-hidden mb-8">
          <RouletteDisplay numbers={rouletteNumbers} targetNumber={14} />
        </div>
        <div className="p-4 bg-gray-900 flex justify-center items-center mb-2">
          <BettingControl />
        </div>

        <BettingArea bets={bets} />
        <HistoryArea history={history} />
      </main>
    </div>
  );
};

export default HomePage;
