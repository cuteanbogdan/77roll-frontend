import {
  getUserByIdService,
  updateUserByIdService,
  uploadProfilePictureService,
} from "../services/userService";

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

export const getUserById = async (userId: string) => {
  try {
    const user = await getUserByIdService(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error("Error fetching user", error);
    throw new Error("Error fetching user: " + error);
  }
};

export const updateUserById = async (userId: string, data: any) => {
  try {
    const updatedUser = await updateUserByIdService(userId, data);

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  } catch (error) {
    console.error("Error updating user", error);
    throw new Error("Error updating user: " + error);
  }
};
