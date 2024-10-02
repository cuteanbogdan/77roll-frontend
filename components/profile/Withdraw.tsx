import React, { useState } from "react";
import { User } from "@/types/auth";
import { createWithdrawalService } from "@/services/balanceService";

interface WithdrawProps {
  user: User | null;
}

const Withdraw: React.FC<WithdrawProps> = ({ user }) => {
  const [amount, setAmount] = useState<string>("");
  const [currency, setCurrency] = useState<string>("BTC");
  const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !user._id) {
      setError("User not authenticated");
      return;
    }

    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      setError("Invalid withdrawal amount");
      return;
    }

    if (!address) {
      setError("Withdrawal address is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const withdrawalResponse = await createWithdrawalService(
        user._id,
        parseFloat(amount),
        currency,
        address
      );

      if (withdrawalResponse) {
        alert("Withdrawal initiated successfully");
      } else {
        setError("Failed to initiate withdrawal");
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold text-white mb-6">Withdraw Funds</h2>
      <form onSubmit={handleWithdraw}>
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Amount ($)
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

        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Withdrawal Address
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className={`w-full p-3 rounded-md text-white font-semibold ${
            loading ? "bg-gray-600" : "bg-blue-500 hover:bg-blue-600"
          } transition`}
          disabled={loading}
        >
          {loading ? "Processing..." : "Withdraw"}
        </button>
      </form>
    </div>
  );
};

export default Withdraw;
