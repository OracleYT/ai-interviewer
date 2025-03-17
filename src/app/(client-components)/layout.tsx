"use client";

import AuthContextProvider from "@/contexts/AuthProvider";
import { Toaster } from "react-hot-toast";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div>
      <AuthContextProvider>
        <Toaster />
        {children}
      </AuthContextProvider>
    </div>
  );
}
