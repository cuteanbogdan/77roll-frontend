// components/RouletteDisplay.tsx
import React from "react";

const RouletteDisplay: React.FC<{ numbers: number[] }> = ({ numbers }) => {
  const repeatedNumbers = [...numbers, ...numbers, ...numbers];

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      <div className="absolute inset-y-0 left-1/2 z-10 w-1 bg-yellow-500"></div>

      <div className="flex items-center whitespace-nowrap">
        {repeatedNumbers.map((number, index) => (
          <div
            key={index}
            className={`flex-shrink-0 flex justify-center items-center w-24 h-24 text-white font-bold text-4xl
              ${
                number === 0
                  ? "bg-green-500"
                  : index % 2 === 0
                  ? "bg-red-500"
                  : "bg-gray-700"
              }`}
          >
            {number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouletteDisplay;
