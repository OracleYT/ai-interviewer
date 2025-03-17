"usec client";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import AppProvider from "../../../contexts/AppProvider";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "stream-chat-react/dist/css/v2/index.css";

export const metadata: Metadata = {
  title: "Interview with Abhinav Jain",
  description:
    "Real-time meetings by Moogle. Using your browser, share your video, desktop, and presentations with teammates and customers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider>
        <ClerkProvider>{children}</ClerkProvider>
      </AppProvider>
  );
}
