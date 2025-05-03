"use client";

import { VolumeLevelContext } from "@/contexts/VolumeLevelProvider";
import { MicOff } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import VolumeRipple from "./VolumeRipple";
import SpeechIndicator from "./SpeechIndicator";

const interviewer_video_play_duration: number = parseInt(
  process.env.INTERVIEW_VIDE_PLAY_DURATION_IN_SEC || "5",
  10
);

function ParticipantInterviewerItem({ participant }: any) {
  const { volumeLevel } = useContext(VolumeLevelContext);
  const [showVideo, setShowVideo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(false);
    }, interviewer_video_play_duration * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center border rounded-lg bg-[#303030] w-full select-none h-100">
      <div className="relative w-full h-full flex items-center justify-center rounded-lg overflow-hidden bg-gray-300">
        {showVideo ? (
          <div className="relative w-full h-full">
            <video
              className={`w-full h-full object-cover`}
              src="/screening.mp4"
              autoPlay
              muted
            />
            <MicOff className="absolute top-5 right-5 h-7 w-7 rounded-full bg-[#484848]/30 flex justify-center items-center" />
          </div>
        ) : (
          <div className="relative w-full h-full">
            <VolumeRipple volumeLevel={volumeLevel}>
              <img
                src={participant.image}
                alt={participant.name}
                className={`w-32 h-32 rounded-full object-cover`}
              />
            </VolumeRipple>

            <div className="z-2 absolute top-3.5 right-3.5 w-6.5 h-6.5 flex items-center justify-center bg-primary rounded-full">
              <SpeechIndicator isSpeaking={volumeLevel} />
            </div>

            {/* <Mic className="absolute top-5 right-5 h-10 w-10 rounded-full bg-[#484848]/30 flex justify-center items-center" /> */}
          </div>
        )}
        <div className={`absolute inset-0 flex items-center justify-center `}>
          <div className="absolute bottom-4 left-4 text-sm font-semibold text-white ">
            {participant.name}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParticipantInterviewerItem;
