"use client";

import AuthContextProvider from "@/contexts/AuthProvider";


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AuthContextProvider>{children}</AuthContextProvider>
    </div>
  );
}
