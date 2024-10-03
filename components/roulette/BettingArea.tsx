"use client";
import React, { memo } from "react";
import { FaCoins, FaUser } from "react-icons/fa";

const BettingArea: React.FC<{
  bets: any[];
  placeBet: (color: string) => void;
  bettingOpen: boolean;
}> = memo(({ bets, placeBet, bettingOpen }) => {
  const betAreas = [
    {
      color: "red",
      label: "Red",
      bgColor: "bg-red-500",
      borderColor: "border-red-600",
      multiplier: "2x",
    },
    {
      color: "green",
      label: "Green",
      bgColor: "bg-green-500",
      borderColor: "border-green-600",
      multiplier: "14x",
    },
    {
      color: "black",
      label: "Black",
      bgColor: "bg-gray-700",
      borderColor: "border-gray-800",
      multiplier: "2x",
    },
  ];

  return (
    <div className="text-white">
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        {betAreas.map((area) => (
          <div
            key={area.color}
            className={`w-full lg:w-1/3 rounded border-2 ${
              area.borderColor
            } mb-4 lg:mb-0 ${
              !bettingOpen ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <button
              onClick={() => bettingOpen && placeBet(area.color)}
              disabled={!bettingOpen}
              className={`w-full flex justify-between items-center p-4 ${
                area.bgColor
              } rounded-t-md font-bold ${
                !bettingOpen ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <span>{area.label}</span>
              <div className="flex items-center">
                <span className="flex items-center gap-1">
                  <FaUser className="text-lg" />{" "}
                  {bets.filter((bet) => bet.color === area.color).length}
                </span>
              </div>
              <div className="px-2 py-1 rounded bg-opacity-25 bg-black text-white">
                {area.multiplier}
              </div>
            </button>
            <div className="bg-black-500 bg-opacity-50 p-2 rounded-b-md h-48 overflow-y-auto">
              {bets
                .filter((bet) => bet.color === area.color)
                .map((bet, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2"
                  >
                    <span className="flex items-center gap-2">
                      <img
                        src={bet.userId.profileImage}
                        alt="avatar"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      {bet.userId.username}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaCoins className="text-yellow-500" />{" "}
                      {bet.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default BettingArea;
