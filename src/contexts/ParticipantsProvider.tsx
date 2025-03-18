"use client";
import { initialParticipants } from "@/app/(client-components)/(protected-routes)/meeting/[meetingId]/constants";
import { createContext, useState } from "react";

export const ParticipantsContext = createContext<any>(null);

export const ParticipantsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [participants, setParticipants] = useState<any>(initialParticipants);

  return (
    <ParticipantsContext.Provider value={{ participants }}>
      {children}
    </ParticipantsContext.Provider>
  );
};
