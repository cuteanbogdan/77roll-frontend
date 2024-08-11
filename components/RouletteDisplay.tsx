"use client";
import React, { useEffect, useRef } from "react";

const RouletteDisplay: React.FC<{
  numbers: RouletteNumber[];
  targetNumber: number;
}> = ({ numbers, targetNumber }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const blockWidth = 96;

  const repeatedNumbers = [...numbers, ...numbers, ...numbers];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const firstIndex = repeatedNumbers.indexOf(
      repeatedNumbers.find((item) => item.number === targetNumber)!
    );

    const targetIndex = repeatedNumbers.findIndex(
      (item, index) => item.number === targetNumber && index > firstIndex
    );

    const targetPosition =
      targetIndex * blockWidth - container.clientWidth / 2 + blockWidth / 2;

    setTimeout(() => {
      container.scrollTo({
        left: targetPosition,
        behavior: "smooth",
      });
    }, 100);
  }, [numbers, targetNumber, blockWidth, repeatedNumbers]);

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 z-10 w-1 bg-yellow-500"></div>

      <div
        ref={containerRef}
        className="flex items-center whitespace-nowrap overflow-x-hidden"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {repeatedNumbers.map((item, index) => (
          <div
            key={index}
            className={`flex-shrink-0 flex justify-center items-center w-24 h-24 text-white font-bold text-4xl
              ${
                item.color === "green"
                  ? "bg-green-500"
                  : item.color === "red"
                  ? "bg-red-500"
                  : "bg-gray-700"
              }`}
          >
            {item.number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouletteDisplay;
