"use client";

import React, { useEffect, useState } from "react";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { resetPassword } from "@/action/user-action";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/AuthProvider";
import { throttle } from "lodash";
import EmailIcon from "@/components/icons/EmailIcon";
import useLocalStorage from "@/hooks/useLocalStorage";
import LockIcon from "@/components/icons/LockIcon";
import { UNIVERSITY_NAME } from "@/constatnts/content-const";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null); // Error state
  const [isLogingIn, setIsLogingIn] = useState<boolean>(false);
  const [countdown, setCountdown] = useLocalStorage(
    "resetPasswordCountdown",
    0
  ); 

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
    } finally {
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
    setCountdown(60);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else {
      if (timer) clearInterval(timer);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown, setCountdown]);

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
          {UNIVERSITY_NAME} <br /> CAS Interview
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
            Please enter your email and password you received on your respective
            email address
          </p>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="relative flex items-center">
            <EmailIcon />
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
            <LockIcon />

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
          <Button
            onClick={throttle(loginUser, 5_000)}
            variant="secondry"
            disabled={isLogingIn || !email || !password}
          >
            {isLogingIn ? "Login in..." : "Login"}
          </Button>
        </div>
        {countdown > 0 ? (
          <div className="text-xs">
            Please wait {countdown} seconds before resetting your password
            again.
          </div>
        ) : (
          <span
            onClick={throttle(resetPasswordHandler, 60_000)}
            className="text-[#101010]/50 text-xs cursor-pointer"
          >
            Reset password ?
          </span>
        )}
        <span className="absolute bottom-4 text-[8px]">
          All rights reserved. Powered by Gateway International
        </span>
      </Card>
    </Card>
  );
}
