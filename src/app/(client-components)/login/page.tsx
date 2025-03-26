"use client";

import React, { useState } from "react";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { resetPassword } from "@/action/user-action";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/AuthProvider";
import { throttle } from "lodash";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null); // Error state
  const [isLogingIn, setIsLogingIn] = useState<boolean>(false);
  const auth = useAuth();


  const loginUser = async () => {
    setIsLogingIn(true);
    setError(null);
    try {
      const data = { username: email, password };
      const res = await auth.login(data);
      if (!res.success) {
        setError(res.message);
      }
    } catch (err) {
      console.error(err);
    }finally{
      setIsLogingIn(false);
    }
  };

  const resetPasswordHandler = async (e: React.FormEvent) => {
    setError(null);
    e.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    }
    const response = await resetPassword(email);
    if (!response.success) {
      setError(response.message);
    } else {
      toast.success(response.message);
    }
  };

  return (
    <Card
      background="#000000"
      height="100vh"
      width="100vw"
      padding="30px"
      className="flex justify-between items-center "
    >
      <div className="w-[40%] flex flex-col mx-auto">
        <h1 className="text-[#ffffff] text-6xl font-bold ">
          Ulster University <br /> CAS Interview
        </h1>
        <p className="text-[20px] font-semibold text-[#ffffff]/50">
          Join your dream university with us
        </p>
      </div>
      <Card
        background="#ffffff"
        height="90vh"
        width="50%"
        borderRadius="30px"
        className="flex flex-col justify-center items-center gap-2 relative"
      >
        <div className="w-[320px] flex flex-col gap-2">
          <h3 className="text-4xl text-[#262A41] font-semibold">Hello! 👋</h3>
          <p className="text-sm text-[#101010]/50">
            Please enter your email and password you received on your respected
            email address
          </p>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="relative flex items-center">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-4"
            >
              <g opacity="0.6">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.375 4.8125L2.0625 4.125H19.9375L20.625 4.8125V17.1875L19.9375 17.875H2.0625L1.375 17.1875V4.8125ZM2.75 6.23562V16.5H19.25V6.237L11.4263 12.2375H10.5875L2.75 6.23562ZM17.9163 5.5H4.08375L11 10.8199L17.9163 5.5Z"
                  fill="#333333"
                />
              </g>
            </svg>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border py-2 pl-12 pr-4 w-[320px] border-[#EEEEEE] rounded-lg bg-transparent text-black focus:outline-slate-400"
            />
          </div>
          <div className="relative flex items-center">
            <svg
              width="16"
              height="20"
              viewBox="0 0 16 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-4"
            >
              <g opacity="0.6">
                <path
                  d="M15.3334 9.99998C15.3334 8.9889 14.5112 8.16665 13.5001 8.16665H12.5834V5.41665C12.5834 2.8894 10.5273 0.833313 8.00008 0.833313C5.47283 0.833313 3.41675 2.8894 3.41675 5.41665V8.16665H2.50008C1.489 8.16665 0.666748 8.9889 0.666748 9.99998V17.3333C0.666748 18.3444 1.489 19.1666 2.50008 19.1666H13.5001C14.5112 19.1666 15.3334 18.3444 15.3334 17.3333V9.99998ZM5.25008 5.41665C5.25008 3.90048 6.48391 2.66665 8.00008 2.66665C9.51625 2.66665 10.7501 3.90048 10.7501 5.41665V8.16665H5.25008V5.41665Z"
                  fill="#333333"
                />
              </g>
            </svg>

            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border py-2 pl-12 pr-4 w-[320px] border-[#EEEEEE] rounded-lg bg-transparent text-black  focus:outline-slate-400"
            />
          </div>
          {error && <div className="text-sm text-red-500">{error}</div>}
          <Button onClick={throttle(loginUser, 5_000)} variant="secondry" disabled={isLogingIn || !email || !password}>
            {isLogingIn ? "Login in..." : "Login"}
          </Button>
        </div>
        <span
          onClick={throttle(resetPasswordHandler, 60_000)}
          className="text-[#101010]/50 text-xs cursor-pointer"
        >
          Reset password ?
        </span>
        <span className="absolute bottom-4 text-[8px]">
          All rights reserved. Powered by Gateway International
        </span>
      </Card>
    </Card>
  );
}
