"use client";
import { useEffect, useState } from "react";

import MeetProvider from "@/contexts/MeetProvider";
import { ParticipantsProvider } from "@/contexts/ParticipantsProvider";
import { useParams, usePathname, useRouter } from "next/navigation";
import VolumeLevelProvider from "@/contexts/VolumeLevelProvider";
import { useInterviewDetails } from "@/contexts/InterviewContextProvider";
import { useAutoProctor } from "@/contexts/ProcterContextProvider";
import Popup from "@/components/Popup";
import LoadingOverlay from "@/components/LoadingOverlay";
import { FaceDetectionProvider } from "@/contexts/FaceDetectionProvider";

export default function Layout({ children }: any) {
  const pathname = usePathname();
  const params = useParams<any>();
  const meetingId = params.meetingId;
  const { interviewDetails: meetingData } = useInterviewDetails();
  const router = useRouter();
  const { modalConfig } = useAutoProctor();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!meetingData) {
      if (pathname === `/meeting/${meetingId}/meeting`) {
        router.push(`/meeting/${meetingId}`);
      }
    }
    const id = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => {
      clearTimeout(id);
    };
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
        <VolumeLevelProvider>
          <FaceDetectionProvider>
            <MeetProvider meetingId={meetingId}>{children}</MeetProvider>
          </FaceDetectionProvider>
        </VolumeLevelProvider>
      </ParticipantsProvider>
    </>
  );
}
