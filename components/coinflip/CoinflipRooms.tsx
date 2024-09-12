import React from "react";
import CoinflipRoomDisplay from "./CoinflipRoomDisplay";

const CoinflipRooms: React.FC<{
  rooms: any[];
  onJoinRoom: (roomId: string) => void;
}> = ({ rooms, onJoinRoom }) => {
  return (
    <div className="flex-1 p-4 h-[80.4vh] overflow-y-auto bg-gray-800 rounded-lg">
      <h2 className="text-white text-xl mb-4">Coinflip Rooms</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div key={room._id} className="max-w-lg w-full">
            <CoinflipRoomDisplay room={room} onJoinRoom={onJoinRoom} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoinflipRooms;
