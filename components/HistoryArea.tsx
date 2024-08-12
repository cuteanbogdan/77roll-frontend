import React from "react";
import { getColorForNumber } from "@/utils/bettingUtils";

const HistoryArea: React.FC<{ history: number[] }> = ({ history }) => {
  return (
    <div className="bg-gray-800 p-4 rounded text-white mt-4">
      <h3 className="font-bold mb-2">Last 10 Bets</h3>
      <div className="flex space-x-1 overflow-x-auto">
        {history
          .slice()
          // .reverse()
          .map((result, index) => (
            <div
              key={index}
              className={`w-6 h-6 flex justify-center items-center rounded-full text-white font-bold
              ${
                getColorForNumber(result) === "green"
                  ? "bg-green-500"
                  : getColorForNumber(result) === "black"
                  ? "bg-black"
                  : "bg-red-500"
              }`}
            >
              {result}
            </div>
          ))}
      </div>
    </div>
  );
};

export default HistoryArea;
