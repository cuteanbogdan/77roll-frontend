import React from "react";

const CoinflipRooms: React.FC<{ rooms: any[] }> = ({ rooms }) => {
  return (
    <div className="flex-1 p-4 h-[80.4vh] overflow-y-auto bg-gray-800 rounded-lg">
      <h2 className="text-white text-xl mb-4">Coinflip Rooms</h2>
      {rooms.map((room) => (
        <div
          key={room._id}
          className="p-4 mb-4 bg-gray-700 rounded-lg flex justify-between items-center"
        >
          <div>
            <p className="text-white">Room ID: {room._id}</p>
            <p className="text-white">Bet Amount: {room.betAmount}</p>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Join
          </button>
        </div>
      ))}
    </div>
  );
};

export default CoinflipRooms;
