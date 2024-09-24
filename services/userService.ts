import api from "./api";

export const uploadProfilePictureService = (userId: string, file: File) => {
  const formData = new FormData();
  formData.append("profileImage", file);

  return api.put<{ profileImageUrl: string }>(
    `/api/users/${userId}/upload-profile-image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const getUserByIdService = (userId: string) =>
  api.get(`/api/users/${userId}`);

export const updateUserByIdService = (userId: string, data: any) =>
  api.put(`/api/users/${userId}`, data);

export const deleteUserById = (userId: string) =>
  api.delete(`/api/users/${userId}`);
