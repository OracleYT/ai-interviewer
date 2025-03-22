"usec client";
import { ClerkProvider } from "@clerk/nextjs";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "stream-chat-react/dist/css/v2/index.css";
import AppProvider from "@/contexts/AppProvider";
import ProcterContextProvider from "@/contexts/ProcterContextProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProcterContextProvider>
      <AppProvider>
        <ClerkProvider>{children}</ClerkProvider>
      <div id="test-container" className="-z-50 w-0 h-0" />
      </AppProvider>
    </ProcterContextProvider>
  );
}
