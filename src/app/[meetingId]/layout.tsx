"use client";
import { ReactNode } from "react";

import MeetProvider from "@/contexts/MeetProvider";
import BrowserMediaProvider from "@/contexts/BrowserMediaProvider";
import { ParticipantsProvider } from "@/contexts/ParticipantsProvider";

type LayoutProps = {
  children: ReactNode;
  params: {
    meetingId: string;
  };
};

export default function Layout({ children, params }: LayoutProps) {
  return (
    <ParticipantsProvider>
      <BrowserMediaProvider>
        <MeetProvider meetingId={params.meetingId}>{children}</MeetProvider>
      </BrowserMediaProvider>
    </ParticipantsProvider>
  );
}
