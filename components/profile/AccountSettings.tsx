import React, { useState, useEffect } from "react";
import { User } from "@/types/auth";
import { updateUserById } from "@/handlers/userHandler";
import { useAuth } from "@/contexts/AuthContext";

interface AccountSettingsProps {
  user: User | null;
}

const AccountSettings: React.FC<AccountSettingsProps> = ({ user }) => {
  const [clientSeed, setClientSeed] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { setUser } = useAuth();

  useEffect(() => {
    if (user && user.clientSeed) {
      setClientSeed(user.clientSeed);
    }
  }, [user]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    if (!user || !user._id) {
      console.error("User ID not found");
      return;
    }

    try {
      const result = await updateUserById(user._id, { clientSeed });

      if (result) {
        setUser((prevUser) => {
          if (!prevUser) return null;
          return {
            ...prevUser,
            clientSeed: result.data.clientSeed,
          };
        });
      }

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating client seed:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientSeed(e.target.value);
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold mb-4">Account Settings</h3>
      <div className="bg-gray-700 p-4 rounded-lg mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Client Seed
        </label>
        <div className="flex">
          <input
            type="text"
            value={clientSeed}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`w-full px-3 py-2 rounded-l-md bg-gray-800 text-white border border-gray-600 focus:outline-none ${
              isEditing ? "focus:ring-2 focus:ring-blue-500" : ""
            }`}
          />
          {!isEditing ? (
            <button
              onClick={handleEditClick}
              className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none"
            >
              Modify
            </button>
          ) : (
            <button
              onClick={handleSaveClick}
              className="px-4 py-2 bg-green-500 text-white rounded-r-md hover:bg-green-600 focus:outline-none"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
