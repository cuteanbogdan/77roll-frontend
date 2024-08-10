"use client";
import React from "react";

const BettingControl: React.FC<{
  betAmount: number;
  setBetAmount: (amount: number) => void;
}> = ({ betAmount, setBetAmount }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setBetAmount(isNaN(value) ? 0 : Math.max(0.01, Math.min(value, 100)));
  };

  const handlePresetClick = (
    preset: "min" | "max" | "half" | "double" | number
  ) => {
    let newBetAmount = betAmount;

    switch (preset) {
      case "min":
        newBetAmount = 0.01;
        break;
      case "max":
        newBetAmount = 100;
        break;
      case "half":
        newBetAmount = Math.max(0.01, betAmount / 2);
        break;
      case "double":
        newBetAmount = Math.min(100, betAmount * 2);
        break;
      default:
        newBetAmount = Math.min(100, betAmount + preset);
        break;
    }

    setBetAmount(newBetAmount);
  };

  return (
    <div className="flex items-center space-x-2 bg-gray-800 p-4 rounded-lg">
      <div className="flex items-center bg-gray-700 p-2 rounded-lg flex-grow">
        <span className="text-yellow-500 mr-2">🪙</span>
        <input
          type="number"
          value={betAmount}
          onChange={handleInputChange}
          className="bg-gray-700 text-white flex-grow rounded-lg outline-none"
          step="0.01"
          min="0.01"
          max="100"
        />
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => handlePresetClick("min")}
          className="bg-gray-700 text-gray-400 px-4 py-2 rounded-lg"
        >
          Min
        </button>
        <button
          onClick={() => handlePresetClick(1)}
          className="bg-gray-700 text-gray-400 px-4 py-2 rounded-lg"
        >
          +1
        </button>
        <button
          onClick={() => handlePresetClick(5)}
          className="bg-gray-700 text-gray-400 px-4 py-2 rounded-lg"
        >
          +5
        </button>
        <button
          onClick={() => handlePresetClick(10)}
          className="bg-gray-700 text-gray-400 px-4 py-2 rounded-lg"
        >
          +10
        </button>
        <button
          onClick={() => handlePresetClick("half")}
          className="bg-gray-700 text-gray-400 px-4 py-2 rounded-lg"
        >
          1/2
        </button>
        <button
          onClick={() => handlePresetClick("double")}
          className="bg-gray-700 text-gray-400 px-4 py-2 rounded-lg"
        >
          x2
        </button>
        <button
          onClick={() => handlePresetClick("max")}
          className="bg-gray-700 text-gray-400 px-4 py-2 rounded-lg"
        >
          Max
        </button>
      </div>
    </div>
  );
};

export default BettingControl;
