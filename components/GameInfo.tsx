import React, { useState, useEffect } from "react";
import SocketService from "@/services/socketService";

const GameInfo: React.FC<{ roundNumber: number }> = ({ roundNumber }) => {
  const [countdown, setCountdown] = useState<number>(15);

  useEffect(() => {
    SocketService.on("timer-update", (newCountdown: number) => {
      setCountdown(newCountdown);
    });

    return () => {
      SocketService.off("timer-update");
    };
  }, []);

  return (
    <div className="text-center text-white mb-4">
      <h2 className="text-lg">Round #{roundNumber}</h2>
      <p className="text-sm text-gray-400">
        {countdown > 0 ? (
          <>
            The game starts in:{" "}
            <span className="text-red-500">{countdown} sec</span>
          </>
        ) : (
          <span className="text-yellow-500">Rolling...</span>
        )}
      </p>
    </div>
  );
};

export default GameInfo;
