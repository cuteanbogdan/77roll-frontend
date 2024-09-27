import api from "./api";

export const createTransactionService = async (
  userId: string,
  amount: number,
  currency: string
): Promise<string> => {
  try {
    const response = await api.post("api/balance/create", {
      userId,
      amount,
      currency,
    });

    const data = response.data;
    return data.checkout_url;
  } catch (error) {
    throw new Error("Failed to create a transaction.");
  }
};
