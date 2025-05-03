"use client";

import ParticipantInterviewerItem from "./ParticipantInterviewerItem";
import ParticipantCandidateItem from "./ParticipantCandidateItem";

const ParticipantItem = ({ participant }: any) => {
  if (participant.roles?.includes("host")) {
    return <ParticipantInterviewerItem participant={participant} />;
  }

  return <ParticipantCandidateItem participant={participant} />;
};

export default ParticipantItem;
