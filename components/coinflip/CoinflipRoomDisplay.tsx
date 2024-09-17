import React, { useEffect, useState } from "react";
import { getUserById } from "@/handlers/userHandler";

const CoinflipRoomDisplay: React.FC<{
  room: any;
  onJoinRoom: (roomId: string) => void;
}> = ({ room, onJoinRoom }) => {
  const [creator, setCreator] = useState<any>(null);
  const [opponent, setOpponent] = useState<any>(null);
  const [winner, setWinner] = useState<any>(null);

  useEffect(() => {
    const fetchCreator = async () => {
      const creatorData = await getUserById(room.creatorId);
      setCreator(creatorData.data);
    };

    const fetchOpponent = async () => {
      if (room.opponentId) {
        const opponentData = await getUserById(room.opponentId);
        setOpponent(opponentData.data);
      }
    };

    const fetchWinner = async () => {
      if (room.winnerId) {
        const winnerData = await getUserById(room.winnerId);
        setWinner(winnerData.data);
      }
    };

    fetchCreator();
    fetchOpponent();
    fetchWinner();
  }, [room.creatorId, room.opponentId, room.winnerId]);

  return (
    <div className="p-4 mb-2 bg-gray-700 rounded-lg flex justify-between items-center text-sm max-w-md mx-auto">
      <div className="flex flex-col items-center">
        {creator ? (
          <>
            <img
              src={creator.profileImage || "/default-avatar.png"}
              alt="creator-avatar"
              className="w-16 h-16 rounded-full mb-2 object-cover"
            />
            <p className="text-white">{creator.username}</p>
            <p className="text-yellow-500">Level: {creator.level}</p>
            <p className="text-yellow-500">Choice: {room.creatorChoice}</p>
          </>
        ) : (
          <p className="text-white">Loading creator...</p>
        )}
      </div>

      <div className="flex flex-col items-center">
        {room.status === "finished" && winner ? (
          <p className="text-white">Winner: {winner.username}</p>
        ) : room.status === "playing" ? (
          <p className="text-white">Coin is flipping...</p>
        ) : opponent ? (
          <p className="text-white">Coinflip started...</p>
        ) : (
          <>
            <button
              onClick={() => onJoinRoom(room._id)}
              className="bg-yellow-500 text-white px-3 py-1 rounded-lg"
            >
              Join
            </button>
            <p className="text-white mt-2">Bet Amount: {room.betAmount}</p>
          </>
        )}
      </div>

      <div className="flex flex-col items-center">
        {opponent ? (
          <>
            <img
              src={opponent.profileImage || "/default-avatar.png"}
              alt="opponent-avatar"
              className="w-16 h-16 rounded-full mb-2 object-cover"
            />
            <p className="text-white">{opponent.username}</p>
            <p className="text-yellow-500">Level: {opponent.level}</p>
            <p className="text-yellow-500">Choice: {room.opponentChoice}</p>
          </>
        ) : (
          <>
            <img
              src="/default-avatar.png"
              alt="opponent-avatar"
              className="w-16 h-16 rounded-full mb-2 object-cover"
            />
            <p className="text-white">-</p>
            <p className="text-yellow-500">Level: -</p>
          </>
        )}
      </div>
    </div>
  );
};

export default CoinflipRoomDisplay;
