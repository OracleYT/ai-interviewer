"use client";
import { initialParticipants } from "@/app/(client-components)/(protected-routes)/meeting/[meetingId]/constants";
import { createContext, useMemo } from "react";

export const ParticipantsContext = createContext<any>(null);

export const ParticipantsProvider = ({
  children,
  meetingData,
}: {
  children: React.ReactNode;
  meetingData: any;
}) => {
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
    <ParticipantsContext.Provider value={{ participants, meetingData }}>
      {children}
    </ParticipantsContext.Provider>
  );
};
