// import useUserColor from "@/hooks/useUserColor";
import { useContext, useEffect, useRef, useState } from "react";
import VolumeRipple from "./VolumeRipple";
import { VolumeLevelContext } from "@/contexts/VolumeLevelProvider";
// import { BrowserMediaContext } from "@/contexts/BrowserMediaProvider";
import clsx from "clsx";
// import MicOffFilled from "./icons/MicOffFilled";
import { useCallStateHooks } from "@stream-io/video-react-sdk";
// import Mic from "./icons/Mic";
import MicOff from "./icons/MicOff";
import useFaceDetactionAlgo from "@/hooks/useFaceDetactionAlgo";
import useSoundDetected from "@/hooks/useSoundDetected";
import SpeechIndicator from "./SpeechIndicator";

const interviewer_video_play_duration: number = parseInt(
  process.env.INTERVIEW_VIDE_PLAY_DURATION_IN_SEC || "5",
  10
);

export const ParticipantItem = ({ participant }: any) => {
  const firstNameLetter = participant.name.split(" ")[0][0]?.toUpperCase();
  // const color = useUserColor()(participant.name);
  const { volumeLevel } = useContext(VolumeLevelContext);
  // const { videoRef, isCameraOn } = useContext(BrowserMediaContext);
  const [showVideo, setShowVideo] = useState(true);
  const soundDetected = useSoundDetected();

  const { useCameraState, useMicrophoneState } = useCallStateHooks();
  const { mediaStream, isMute, camera } = useCameraState();

  const { microphone, status: microphoneStatus } = useMicrophoneState();
  const vidRef = useRef<HTMLVideoElement>(null);
  const { startDetectingFace, started, stopDetectingFace } =
    useFaceDetactionAlgo();

  useEffect(() => {
    camera.enable();
    microphone.enable();
    const timer = setTimeout(() => {
      setShowVideo(false);
    }, interviewer_video_play_duration * 1000);

    return () => {
      clearTimeout(timer);
      camera.disable();
      microphone.disable();
      if (vidRef.current) {
        vidRef.current.srcObject = null;
      }
      stopDetectingFace();
    };
  }, []);

  useEffect(() => {
    if (vidRef.current && mediaStream) {
      vidRef.current.srcObject = mediaStream;
      startDetectingFace(mediaStream);
    }
    () => {
      if (started) {
        stopDetectingFace();
      }
    };
  }, [mediaStream]);

  if (participant.roles?.includes("host")) {
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
};
