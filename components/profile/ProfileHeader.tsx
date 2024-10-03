import { User } from "@/types/auth";
import React from "react";

interface ProfileHeaderProps {
  user: User | null;
  onOpenModal: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, onOpenModal }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
      <div className="flex items-center mb-4 sm:mb-0">
        <img
          src={user?.profileImage || "/profile.png"}
          alt="Profile"
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mr-4 cursor-pointer object-cover border-2 border-gray-700 shadow-lg"
          onClick={onOpenModal}
        />
        <div>
          <h2 className="text-lg sm:text-xl font-bold">
            {user?.username || "User"}
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Level {user?.level} • Rank: {user?.rank}
          </p>
        </div>
      </div>
      <div className="w-full sm:max-w-xs">
        <div className="text-right text-xs sm:text-sm text-gray-400 mb-1">
          Experience: {user?.experience.toFixed(0)} /{" "}
          {((user?.xpToNextLevel ?? 0) + (user?.experience ?? 0)).toFixed(0)}
        </div>
        <div className="w-full bg-gray-600 rounded-full h-2">
          <div
            className="bg-red-500 h-2 rounded-full"
            style={{
              width: `${
                ((user?.experience || 0) /
                  ((user?.xpToNextLevel ?? 0) + (user?.experience ?? 0) || 1)) *
                100
              }%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
