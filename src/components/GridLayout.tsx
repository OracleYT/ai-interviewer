import { useEffect, useMemo, useState, useRef } from "react";

import clsx from "clsx";

// import ParticipantViewUI from "./ParticipantViewUI";
import useAnimateVideoLayout from "../hooks/useAnimateVideoLayout";
// import VideoPlaceholder from "./VideoPlaceholder";
import { meeting_participant } from "@/app/[meetingId]/constants";
// import { Avatar } from "@stream-io/video-react-sdk";
import useUserColor from "@/hooks/useUserColor";

const GROUP_SIZE = 6;

// const AVATAR_SIZE = 100;
const GridLayout = ({}) => {
  // const call = useCall();
  // const { useParticipants } = useCallStateHooks();
  // const participants = useParticipants();
  const participants = meeting_participant;
  const [page, setPage] = useState(0);

  const { ref } = useAnimateVideoLayout(false);

  const pageCount = useMemo(
    () => Math.ceil(participants.length / GROUP_SIZE),
    [participants]
  );

  const participantGroups = useMemo(() => {
    // divide participants into groups of 6
    const groups = [];
    for (let i = 0; i < participants.length; i += GROUP_SIZE) {
      groups.push(participants.slice(i, i + GROUP_SIZE));
    }

    return groups;
  }, [participants]);

  // const selectedGroup = participantGroups[page];
  const selectedGroup = participantGroups[page];

  // useEffect(() => {
  //   if (!call) return;
  //   const customSortingPreset = getCustomSortingPreset();
  //   call.setSortParticipantsBy(customSortingPreset);
  // }, [call]);

  useEffect(() => {
    if (page > pageCount - 1) {
      setPage(Math.max(0, pageCount - 1));
    }
  }, [page, pageCount]);

  // const getCustomSortingPreset = (): Comparator<StreamVideoParticipant> => {
  //   return combineComparators(screenSharing, pinned);
  // };

  return (
    <div
      ref={ref}
      className={clsx(
        "w-full relative overflow-hidden",
        "str-video__paginated-grid-layout h-full"
      )}
    >
      {/* {pageCount > 1 && (
        <IconButton
          icon="caret-left"
          disabled={page === 0}
          onClick={() => setPage((currentPage) => Math.max(0, currentPage - 1))}
        />
      )} */}
      <div
        className={clsx("str-video__paginated-grid-layout__group h-full", {
          "str-video__paginated-grid-layout--one": selectedGroup.length === 1,
          "str-video__paginated-grid-layout--two-four":
            selectedGroup.length >= 2 && selectedGroup.length <= 4,
          "str-video__paginated-grid-layout--five-nine":
            selectedGroup.length >= 5 && selectedGroup.length <= 9,
        })}
      >
        {selectedGroup.length > 0 && (
          <div className="flex justify-between gap-4 w-full p-10 py-42">
            {selectedGroup.map((p) => (
              <ParticipantItem key={p.userId} participant={p} />
            ))}
          </div>
        )}
      </div>
      {/* {pageCount > 1 && (
        <IconButton
          disabled={page === pageCount - 1}
          icon="caret-right"
          onClick={() =>
            setPage((currentPage) => Math.min(pageCount - 1, currentPage + 1))
          }
        />
      )} */}
    </div>
  );
};

export default GridLayout;

// Participant Item Component
const ParticipantItem = ({ participant }: any) => {
  const firstNameLetter = participant.name.split(" ")[0][0];
  const videoRef = useRef<HTMLVideoElement>(null);
  // const [volumeLevel, setVolumeLevel] = useState(0);
  const color = useUserColor()

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startVideo = async () => {
      if (participant.isVideoOn && videoRef.current) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: true });
          videoRef.current.srcObject = stream;
        } catch (error) {
          console.error("Error accessing camera:", error);
        }
      }
    };

    startVideo();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [participant.isVideoOn]);

  return (
    <div className="flex flex-col items-center justify-center border rounded-lg bg-[#303030] w-full select-none h-100">
      <div className="relative w-full h-full flex items-center justify-center rounded-lg overflow-hidden bg-gray-300">
        {participant.isVideoOn ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted
            style={{ objectFit: "cover" }}
          />
        ) : participant.image ? (
          <img
            src={participant.image}
            alt={participant.name}
            className={`w-32 h-32 rounded-full object-cover`}
          />
        ) : (
          <div
            className={`${color(
              participant?.name
            )} w-24 h-24 text-white text-4xl font-extrabold flex items-center justify-center rounded-full`}
          >
            {firstNameLetter}
          </div>
        )}
        <div className={`absolute inset-0 flex items-center justify-center `}>
          <div className="absolute bottom-4 left-4 text-sm font-semibold text-white">
            {participant.name}
          </div>
        </div>
      </div>
    </div>
  );
};
