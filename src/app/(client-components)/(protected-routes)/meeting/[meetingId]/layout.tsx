"use client";
import { ReactNode, useEffect, useState } from "react";

import MeetProvider from "@/contexts/MeetProvider";
import BrowserMediaProvider from "@/contexts/BrowserMediaProvider";
import { ParticipantsProvider } from "@/contexts/ParticipantsProvider";
import { useParams, usePathname, useRouter } from "next/navigation";
import VolumeLevelProvider from "@/contexts/VolumeLevelProvider";
import { useInterviewDetails } from "@/contexts/InterviewContextProvider";

type LayoutProps = {
  children: ReactNode;
  params: {
    meetingId: string;
  };
};

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const params = useParams<{ meetingId: string }>();
  const meetingId = params.meetingId;
  const { interviewDetails: meetingData } = useInterviewDetails();
  const router = useRouter();

  useEffect(() => {
    if (!meetingData) {
      if (pathname === `/meeting/${meetingId}/meeting`) {
        router.push(`/meeting/${meetingId}`);
      }
    }
  }, [pathname]);

  return (
    <ParticipantsProvider meetingId={meetingId}>
      <BrowserMediaProvider>
        <VolumeLevelProvider>
          <MeetProvider meetingId={meetingId}>{children}</MeetProvider>
        </VolumeLevelProvider>
      </BrowserMediaProvider>
    </ParticipantsProvider>
  );
}
