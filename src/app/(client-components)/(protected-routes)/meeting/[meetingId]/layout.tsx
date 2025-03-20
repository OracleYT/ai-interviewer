"use client";
import { ReactNode, useEffect, useState } from "react";

import MeetProvider from "@/contexts/MeetProvider";
import BrowserMediaProvider from "@/contexts/BrowserMediaProvider";
import { ParticipantsProvider } from "@/contexts/ParticipantsProvider";
import { usePathname, useRouter } from "next/navigation";
import { getInterviewDetails } from "@/action/interview-action";

type LayoutProps = {
  children: ReactNode;
  params: {
    meetingId: string;
  };
};

export default function Layout({ children, params }: LayoutProps) {
  const pathname = usePathname();
  const { meetingId } = params;

  const [meetingData, setMeetingData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!meetingData) {
      if (pathname === `/meeting/${meetingId}/meeting`) {
        router.push(`/meeting/${meetingId}`);
        return;
      }

      getInterviewDetails(meetingId).then((data) => {
        if (data.success) {
          setMeetingData(data.data);
        } else {
          router.push(`/meeting/${meetingId}/meeting-end?invalid=true`);
        }
        setLoading(false);
      });
    }
  }, [pathname]);

  return (
    <ParticipantsProvider meetingData={meetingData} loading={loading}>
      <BrowserMediaProvider>
        <MeetProvider meetingId={params.meetingId}>{children}</MeetProvider>
      </BrowserMediaProvider>
    </ParticipantsProvider>
  );
}
