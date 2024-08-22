import { useState, useEffect } from "react";
import { getUserTransactions } from "@/handlers/transactionHandler";
import { Transaction } from "@/types/auth";

export const useTransactions = (
  userId: string | undefined,
  viewingTransactions: boolean
) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  useEffect(() => {
    const fetchTransactions = async () => {
      if (viewingTransactions && userId) {
        try {
          const response = await getUserTransactions(userId);
          setTransactions(response.data);
        } catch (error) {
          console.error("Failed to fetch transactions", error);
        }
      }
    };

    fetchTransactions();
  }, [viewingTransactions, userId]);

  const totalPages = Math.ceil(transactions.length / transactionsPerPage);
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return {
    transactions: currentTransactions,
    currentPage,
    totalPages,
    handleNextPage,
    handlePreviousPage,
  };
};
