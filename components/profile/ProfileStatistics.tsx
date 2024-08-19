import React from "react";
import { FaCoins } from "react-icons/fa";
import { User } from "@/types/auth";

interface ProfileStatisticsProps {
  user: User | null;
}

const ProfileStatistics: React.FC<ProfileStatisticsProps> = ({ user }) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold mb-4">Statistics</h3>
      <div className="bg-gray-700 p-4 rounded-lg mb-4">
        <div className="flex justify-between">
          <span>Total Bets</span>
          <span className="flex items-center">
            <FaCoins className="text-yellow-500 mr-2" />
            {user?.totalBets?.toFixed(2) || "0.00"}
          </span>
        </div>
      </div>
      <div className="bg-gray-700 p-4 rounded-lg mb-4">
        <div className="flex justify-between">
          <span>Total Bet Roulette</span>
          <span className="flex items-center">
            <FaCoins className="text-yellow-500 mr-2" />
            {user?.totalBetRoulette?.toFixed(2) || "0.00"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileStatistics;
