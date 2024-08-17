import React, { useState, ChangeEvent } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { uploadProfilePicture } from "@/handlers/userHandler";

interface ProfilePictureUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfilePictureUploadModal: React.FC<ProfilePictureUploadModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useAuth();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !user?._id) return;

    setLoading(true);
    const result = await uploadProfilePicture(user._id, selectedFile);

    if (result) {
      setUser((prevUser) => {
        if (!prevUser) return null;
        return {
          ...prevUser,
          profileImage: result.profileImageUrl,
        };
      });
      onClose();
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-lg font-bold text-white mb-4">
          Upload Profile Picture
        </h3>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4 text-white"
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded mr-2 hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            className={`bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePictureUploadModal;
