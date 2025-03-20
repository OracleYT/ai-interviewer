"usec client";
import { ClerkProvider } from "@clerk/nextjs";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "stream-chat-react/dist/css/v2/index.css";
import AppProvider from "@/contexts/AppProvider";

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
