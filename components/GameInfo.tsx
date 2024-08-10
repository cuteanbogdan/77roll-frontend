import React from "react";

const GameInfo: React.FC<{ roundNumber: number; countdown: number }> = ({
  roundNumber,
  countdown,
}) => {
  return (
    <div className="text-center text-white mb-4">
      <h2 className="text-lg">Round #{roundNumber}</h2>
      <p className="text-sm text-gray-400">
        The game starts in:{" "}
        <span className="text-red-500">{countdown} sec</span>
      </p>
    </div>
  );
};

export default GameInfo;
