import React from "react";
import { getColorForNumber } from "@/utils/bettingUtils";

const HistoryArea: React.FC<{ history: number[] }> = ({ history }) => {
  return (
    <div className="pb-4 text-white">
      <h3 className="font-bold mb-2 text-center">Last 10 Bets</h3>
      <div className="flex space-x-1 overflow-x-auto">
        {history
          .slice()
          // .reverse()
          .map((result, index) => (
            <div
              key={index}
              className={`w-10 h-10 flex justify-center items-center rounded-full text-white font-bold
              ${
                getColorForNumber(result) === "green"
                  ? "bg-green-500"
                  : getColorForNumber(result) === "black"
                  ? "bg-gray-700"
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
