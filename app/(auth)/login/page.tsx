"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/handlers/authHandler";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    const result = await login(email, password);

    if (result.success) {
      router.push("/");
    } else {
      setError(result.message || "An error occurred");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Login
        </h2>
        {error && (
          <div className="bg-red-600 text-white text-center p-2 mb-4 rounded">
            {error}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full py-2 bg-yellow-500 text-gray-900 font-bold rounded hover:bg-yellow-400 transition duration-200"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
