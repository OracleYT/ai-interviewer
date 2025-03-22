"use client";

import AuthContextProvider from "@/contexts/AuthProvider";
import { InterviewContextProvider } from "@/contexts/InterviewContextProvider";
import { Toaster } from "react-hot-toast";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthContextProvider>
      <InterviewContextProvider>
        <Toaster />
        {children}
      </InterviewContextProvider>
    </AuthContextProvider>
  );
}
