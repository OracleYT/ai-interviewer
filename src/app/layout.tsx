import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { MobileMessageProvider } from "@/contexts/MobileMessageProvider";

export const metadata: Metadata = {
  title: "CAS Interview for Ulster University",
  description: "Start your journey to Ulster University with the CAS Interview",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://cdn.autoproctor.co/ap-entry.js"
          strategy="beforeInteractive"
        />
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#000000" />
        <link rel="favicon" href="favicon.png" />
      </head>
      <body className="element h-screen">
        <MobileMessageProvider>{children}</MobileMessageProvider>
      </body>
    </html>
  );
}
