import type { Metadata } from "next";
import "./globals.css";
import { MobileMessageProvider } from "@/contexts/MobileMessageProvider";
import { UNIVERSITY_NAME } from "@/constatnts/content-const";
import Script from "next/script";

export const metadata: Metadata = {
  title: "CAS Interview for " + UNIVERSITY_NAME,
  description: `Start your journey to ${UNIVERSITY_NAME} with the CAS Interview`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#000000" />
        <link rel="favicon" href="favicon.png" />
        <Script
          src="https://cdn.autoproctor.co/ap-entry.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="element h-screen">
        <MobileMessageProvider>{children}</MobileMessageProvider>
      </body>
    </html>
  );
}
