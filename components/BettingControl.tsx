"use client";
import React, { useState } from "react";

const BettingControl: React.FC = () => {
  const [betAmount, setBetAmount] = useState(0.01);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setBetAmount(isNaN(value) ? 0 : value);
  };

  const handlePresetClick = (
    preset: number | "min" | "max" | "half" | "double"
  ) => {
    switch (preset) {
      case "min":
        setBetAmount(0.01);
        break;
      case "max":
        setBetAmount(100);
        break;
      case "half":
        setBetAmount((prev) => Math.max(0.01, prev / 2));
        break;
      case "double":
        setBetAmount((prev) => Math.min(100, prev * 2)); // Set 100 as max bet limit
        break;
      default:
        setBetAmount((prev) => Math.max(0.01, prev + preset));
        break;
    }
  };

  return (
    <div className="flex items-center space-x-2 bg-gray-800 p-2 rounded-lg">
      <div className="flex items-center bg-gray-700 p-2 rounded-lg flex-grow">
        <span className="text-yellow-500 mr-2">🪙</span>
        <input
          type="number"
          value={betAmount}
          onChange={handleInputChange}
          className="bg-gray-700 text-white flex-grow outline-none"
          step="0.01"
          min="0.01"
        />
      </div>
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
        onClick={() => handlePresetClick(100)}
        className="bg-gray-700 text-gray-400 px-4 py-2 rounded-lg"
      >
        +100
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
  );
};

export default BettingControl;
