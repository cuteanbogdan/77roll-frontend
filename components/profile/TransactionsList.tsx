import React from "react";
import { Transaction } from "@/types/auth";

interface TransactionsListProps {
  transactions: Transaction[];
  currentPage: number;
  totalPages: number;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
}

const TransactionsList: React.FC<TransactionsListProps> = ({
  transactions,
  currentPage,
  totalPages,
  handleNextPage,
  handlePreviousPage,
}) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold mb-4">Transactions</h3>
      {transactions.length > 0 ? (
        transactions.map((transaction) => (
          <div
            key={transaction._id}
            className="bg-gray-700 p-2 rounded-lg mb-2"
          >
            <div className="flex justify-between">
              <span>{transaction.type}</span>
              <span
                className={`flex items-center ${
                  transaction.amount > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {transaction.amount.toFixed(2)}
              </span>
            </div>
            <div className="text-gray-400 text-sm">
              {new Date(transaction.date).toLocaleDateString()}{" "}
              {new Date(transaction.date).toLocaleTimeString()}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400">No transactions found.</p>
      )}

      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-400">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionsList;
