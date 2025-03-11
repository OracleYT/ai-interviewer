import useUserColor from "@/hooks/useUserColor";
import { useContext } from "react";
import VolumeRipple from "./VolumeRipple";
import { VolumeLevelContext } from "@/contexts/VolumeLevelProvider";
import { BrowserMediaContext } from "@/contexts/BrowserMediaProvider";

export const ParticipantItem = ({ participant }: any) => {
  const firstNameLetter = participant.name.split(" ")[0][0];
  const color = useUserColor();
  const { volumeLevel } = useContext(VolumeLevelContext);
  const { videoRef, isCameraOn } = useContext(BrowserMediaContext);

  return (
    <div className="flex flex-col items-center justify-center border rounded-lg bg-[#303030] w-full select-none h-100">
      <div className="relative w-full h-full flex items-center justify-center rounded-lg overflow-hidden bg-gray-300">
        {participant.isVideoOn && isCameraOn ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted
            style={{ objectFit: "cover" }}
          />
        ) : participant.image ? (
          <VolumeRipple volumeLevel={volumeLevel}>
            <img
              src={participant.image}
              alt={participant.name}
              className={`w-32 h-32 rounded-full object-cover`}
            />
          </VolumeRipple>
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
