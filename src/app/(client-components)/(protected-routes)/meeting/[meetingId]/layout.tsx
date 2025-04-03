"use client";
import { ReactNode, useEffect, useState } from "react";

import MeetProvider from "@/contexts/MeetProvider";
// import BrowserMediaProvider from "@/contexts/BrowserMediaProvider";
import { ParticipantsProvider } from "@/contexts/ParticipantsProvider";
import { useParams, usePathname, useRouter } from "next/navigation";
import VolumeLevelProvider from "@/contexts/VolumeLevelProvider";
import { useInterviewDetails } from "@/contexts/InterviewContextProvider";
import { useAutoProctor } from "@/contexts/ProcterContextProvider";
import Popup from "@/components/Popup";
import LoadingOverlay from "@/components/LoadingOverlay";

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
  const { interviewDetails: meetingData, fetchingInterviewDetails } =
    useInterviewDetails();
  const router = useRouter();
  const { modalConfig } = useAutoProctor();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!meetingData) {
      if (pathname === `/meeting/${meetingId}/meeting`) {
        router.push(`/meeting/${meetingId}`);
      }
    }
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [pathname]);

  if (loading) {
    return <LoadingOverlay />;
  }

  return (
    <>
      {modalConfig?.showModel && (
        <Popup
          open={modalConfig?.showModel}
          title={modalConfig?.title}
          height={400}
          ctaAction={modalConfig?.ctaAction}
          ctaText={modalConfig?.ctaText}
          onClose={() => {
            modalConfig?.onClose && modalConfig?.onClose();
          }}
        >
          <div className="text-center p-4">{modalConfig?.content}</div>
        </Popup>
      )}
      <ParticipantsProvider meetingId={meetingId}>
        {/* <BrowserMediaProvider> */}
        <VolumeLevelProvider>
          <MeetProvider meetingId={meetingId}>{children}</MeetProvider>
        </VolumeLevelProvider>
        {/* </BrowserMediaProvider> */}
      </ParticipantsProvider>
    </>
  );
}
