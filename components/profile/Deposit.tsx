import React, { useState } from "react";
import { User } from "@/types/auth";
import { createTransactionService } from "@/services/balanceService";

interface DepositProps {
  user: User | null;
}

const Deposit: React.FC<DepositProps> = ({ user }) => {
  const [amount, setAmount] = useState<string>("");
  const [currency, setCurrency] = useState<string>("BTC");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !user._id) {
      setError("User not authenticated");
      return;
    }

    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      setError("Invalid deposit amount");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const checkoutUrl = await createTransactionService(
        user._id,
        parseFloat(amount),
        currency
      );

      if (checkoutUrl) {
        console.log(checkoutUrl);
        // Redirect to the payment URL
        window.location.href = checkoutUrl;
      } else {
        setError("Failed to retrieve payment URL");
        setLoading(false);
      }
    } catch (error) {
      setError((error as Error).message);
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold text-white mb-6">Make a Deposit</h2>
      <form onSubmit={handleDeposit}>
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="currency"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Currency
          </label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            required
            className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="BTC">Bitcoin (BTC)</option>
            <option value="ETH">Ethereum (ETH)</option>
            <option value="LTC">Litecoin (LTC)</option>
            <option value="BNB.BSC">BNB BSC (BNB)</option>
          </select>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className={`w-full p-3 rounded-md text-white font-semibold ${
            loading ? "bg-gray-600" : "bg-blue-500 hover:bg-blue-600"
          } transition`}
          disabled={loading}
        >
          {loading ? "Processing..." : "Deposit"}
        </button>
      </form>
    </div>
  );
};

export default Deposit;
