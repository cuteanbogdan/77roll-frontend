import { uploadProfilePictureService } from "../services/userService";

export const uploadProfilePicture = async (
  userId: string,
  file: File
): Promise<{ profileImageUrl: string } | null> => {
  try {
    const response = await uploadProfilePictureService(userId, file);

    if (response.status === 200) {
      return { profileImageUrl: response.data.profileImageUrl };
    }
    return null;
  } catch (error) {
    console.error("Error uploading the image", error);
    return null;
  }
};
