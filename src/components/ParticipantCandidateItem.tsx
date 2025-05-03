"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useCallback } from "react";
import clsx from "clsx";

import { useCallStateHooks } from "@stream-io/video-react-sdk";
import { VapiDomEvents } from "@/constatnts/vapi-const";
import useFaceDetactionAlgo from "@/contexts/FaceDetectionProvider";
import useEvidanceSender from "@/hooks/useEvidanceSender";
import { getFirstNameLetter } from "@/utils/string-utils";

function ParticipantCandidateItem({ participant }: any) {
  const firstNameLetter = getFirstNameLetter(participant?.name);
  
  const { useCameraState, useMicrophoneState } = useCallStateHooks();
  const { mediaStream, isMute, camera } = useCameraState();
  const { microphone } = useMicrophoneState();

  const vidRef = useRef<HTMLVideoElement>(null);
  const { startDetectingFace, started, stopDetectingFace } =
    useFaceDetactionAlgo();
  const { captureImageFromVideo } = useEvidanceSender();

  const params = useParams<{ meetingId: string }>();
  const meetingId = params.meetingId;

  useEffect(() => {
    if (mediaStream && !started) {
      startDetectingFace(mediaStream);
    }

    return () => {
      if (started) {
        stopDetectingFace();
      }
    };
  }, [startDetectingFace, stopDetectingFace, mediaStream, started]);

  useEffect(() => {
    if (vidRef.current && mediaStream) {
      vidRef.current.srcObject = mediaStream;
    }

    return () => {
      if (vidRef.current?.srcObject) {
        vidRef.current.srcObject = null;
      }
    };
  }, [mediaStream]);

  useEffect(() => {
    camera.enable();

    return () => {
      camera.disable();
    };
  }, [camera]);

  useEffect(() => {
    microphone.enable();
    return () => {
      microphone.disable();
    };
  }, [microphone]);

  const handleEvidanceEvent = useCallback(
    (e: any) => {
      const { message } = e.detail;
      captureImageFromVideo(meetingId, vidRef.current!, message?.title);
    },
    [captureImageFromVideo, meetingId]
  );

  useEffect(() => {
    document.addEventListener(
      VapiDomEvents.SPEAK_ASSISTANT,
      handleEvidanceEvent
    );
    return () => {
      document.removeEventListener(
        VapiDomEvents.SPEAK_ASSISTANT,
        handleEvidanceEvent
      );
    };
  }, [handleEvidanceEvent]);

  return (
    <div className="flex flex-col items-center justify-center border rounded-lg bg-[#303030] w-full select-none h-100">
      <div className="relative w-full h-full flex items-center justify-center rounded-lg overflow-hidden bg-gray-300">
        {participant.isVideoOn && !isMute ? (
          <video
            ref={vidRef}
            className="w-full h-full object-cover"
            autoPlay
            muted
            style={{ transform: "scaleX(-1)" }}
            playsInline
          />
        ) : (
          <div
            className={clsx(
              `w-32 h-32 text-white text-6xl font-medium flex items-center justify-center rounded-full`,
              `bg-[#1d1d1d]`
            )}
          >
            {firstNameLetter}
          </div>
        )}
        <div className={`absolute inset-0 flex items-center justify-center`}>
          <div className="absolute bottom-4 left-4 text-sm font-semibold text-white ">
            {participant.name}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParticipantCandidateItem;
