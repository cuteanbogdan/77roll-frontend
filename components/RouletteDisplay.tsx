"use client";
import React, { useEffect, useRef } from "react";

const RouletteDisplay: React.FC<{
  numbers: number[];
  targetNumber: number;
}> = ({ numbers, targetNumber }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const blockWidth = 96;

  const repeatedNumbers = [...numbers, ...numbers, ...numbers];

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    // Step 1: Calculate the direct target position for number x
    const targetIndex = repeatedNumbers.indexOf(targetNumber, numbers.length);
    const targetPosition =
      targetIndex * blockWidth - container.clientWidth / 2 + blockWidth / 2;

    // Step 2: Directly scroll to the target position
    setTimeout(() => {
      container.scrollTo({
        left: targetPosition,
        behavior: "smooth",
      });
    }, 200); // Short delay to ensure initial rendering
  }, [numbers, blockWidth, repeatedNumbers]);

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
