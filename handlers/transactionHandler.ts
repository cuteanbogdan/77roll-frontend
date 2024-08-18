import { getUserTransactionsService } from "../services/transactionService";

export const getUserTransactions = async (userId: string) => {
  try {
    const transactions = await getUserTransactionsService(userId);

    if (!transactions) {
      throw new Error("Transactions not found");
    }

    return transactions;
  } catch (error) {
    console.error("Error fetching transactions", error);
    throw new Error("Error fetching transactions: " + error);
  }
};
