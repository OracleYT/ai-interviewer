"use client";
import { initialParticipants } from "@/app/(client-components)/(protected-routes)/meeting/[meetingId]/constants";
import { createContext, useMemo } from "react";
import { useInterviewDetails } from "./InterviewContextProvider";

export const ParticipantsContext = createContext<any>(null);

export const ParticipantsProvider = ({
  children,
  meetingId,
}: {
  children: React.ReactNode;
  meetingId: string;
}) => {
  const { interviewDetails: meetingData, fetchingInterviewDetails: loading } =
    useInterviewDetails();

  const participants = useMemo(() => {
    return [
      {
        ...initialParticipants[0],
        ...(meetingData?.interviewer || {}),
      },
      {
        ...initialParticipants[1],
        ...(meetingData?.user || {}),
      },
    ];
  }, [meetingData]);

  return (
    <ParticipantsContext.Provider
      value={{ participants, meetingData, loading }}
    >
      {children}
    </ParticipantsContext.Provider>
  );
};
