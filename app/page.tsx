// src/app/page.tsx
import React from "react";
import Header from "../components/Header";
import GameInfo from "../components/GameInfo";
import RouletteDisplay from "../components/RouletteDisplay";
import BettingArea from "../components/BettingArea";
import HistoryArea from "../components/HistoryArea";

const HomePage: React.FC = () => {
  // Example state; replace with actual state from your application
  const roundNumber = 1234567;
  const countdown = 6;
  const numbers = [16, 6, 7, 12, 8, 6, 4, 13, 32, 9, 24, 0];
  const bets = [
    { username: "automotive", color: "red", amount: 10.566 },
    { username: "gandolf", color: "red", amount: 8.695 },
    { username: "roma232", color: "black", amount: 12.654 },
    { username: "my_name", color: "green", amount: 250 },
    // other bets...
  ];
  const history = [7, 4, 13, 9, 0];

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="max-w-5xl mx-auto p-4">
        <GameInfo roundNumber={roundNumber} countdown={countdown} />
        <RouletteDisplay numbers={numbers} />
        <BettingArea bets={bets} />
        <HistoryArea history={history} />
      </main>
    </div>
  );
};

export default HomePage;
