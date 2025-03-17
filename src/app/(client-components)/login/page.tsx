"use client";

import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null); // Error state
  const auth = useAuth();

  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = { username: email, password };

      console.log("login in clicked", data);
      console.log("auth", auth);
      const res = await auth.login(data);
      console.log("res", res);
      if (!res.success) {
        setError(res.message);
      }
    } catch (err) {

      console.error(err);
    }
  };

  const forgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    // api call to send email
  };

  return (
    <div className="flex flex-col items-center justify-center border-3 border-dashed  py-4 w-[300px] mx-auto mt-20 bg-red-700">
      <h1 className="text-lg font-semibold text-pink-500">Login User</h1>
      <form onSubmit={loginUser} className="flex flex-col space-y-4 p-10">
        <div>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border py-2 px-3 text-grey-darkest"
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border py-2 px-3 text-grey-darkest"
          />
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <button
          type="submit"
          className="py-1 w-17 bg-blue-600 text-black rounded-sm"
        >
          Login
        </button>
      </form>

      <button onClick={forgotPassword}>Reset password?</button>
    </div>
  );
}
