"use client";
import React, { memo } from "react";

const BettingArea: React.FC<{
  bets: any[];
  placeBet: (color: string) => void;
}> = memo(({ bets, placeBet }) => {
  return (
    <div className="text-white">
      <div className="flex justify-between mb-4">
        <button
          onClick={() => placeBet("red")}
          className="w-1/3 bg-red-500 py-2 rounded text-center font-bold hover:bg-red-400"
        >
          Bet on Red
        </button>
        <button
          onClick={() => placeBet("green")}
          className="w-1/3 bg-green-500 py-2 rounded text-center font-bold hover:bg-green-400"
        >
          Bet on Green
        </button>
        <button
          onClick={() => placeBet("black")}
          className="w-1/3 bg-black py-2 rounded text-center font-bold hover:bg-gray-700"
        >
          Bet on Black
        </button>
      </div>
      <div className="flex justify-between">
        <div className="w-1/3 bg-red-600 p-4 rounded">
          <h3 className="font-bold mb-2">Red</h3>
          {bets
            .filter((bet) => bet.color === "red")
            .map((bet, index) => (
              <div key={index} className="flex justify-between">
                <span>{bet.userId.username}</span>
                <span>{bet.amount}</span>
              </div>
            ))}
        </div>
        <div className="w-1/3 bg-green-600 p-4 rounded">
          <h3 className="font-bold mb-2">Green</h3>
          {bets
            .filter((bet) => bet.color === "green")
            .map((bet, index) => (
              <div key={index} className="flex justify-between">
                <span>{bet.userId.username}</span>
                <span>{bet.amount}</span>
              </div>
            ))}
        </div>
        <div className="w-1/3 bg-gray-800 p-4 rounded">
          <h3 className="font-bold mb-2">Black</h3>
          {bets
            .filter((bet) => bet.color === "black")
            .map((bet, index) => (
              <div key={index} className="flex justify-between">
                <span>{bet.userId.username}</span>
                <span>{bet.amount}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
});

export default BettingArea;
