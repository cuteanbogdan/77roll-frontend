import api from "./api";

export const getUserTransactionsService = (userId: string) =>
  api.get(`/api/transactions/user/${userId}`);
