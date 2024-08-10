// components/RouletteDisplay.tsx
import React from "react";

const RouletteDisplay: React.FC<{ numbers: number[] }> = ({ numbers }) => {
  return (
    <div className="flex justify-center space-x-2 mb-4">
      {numbers.map((number, index) => (
        <div
          key={index}
          className={`w-12 h-12 flex justify-center items-center rounded-full text-white font-bold
            ${
              number === 0
                ? "bg-green-500"
                : number % 2 === 0
                ? "bg-black"
                : "bg-red-500"
            }`}
        >
          {number}
        </div>
      ))}
    </div>
  );
};

export default RouletteDisplay;
