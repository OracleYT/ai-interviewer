import clsx from "clsx";

import CallControlButton from "./CallControlButton";
import ToggleButtonContainer from "./ToggleButtonContainer";
import Videocam from "./icons/Videocam";
import VideocamOff from "./icons/VideocamOff";
import VisualEffects from "./icons/VisualEffects";
import { VideoInputDeviceSelector } from "./DeviceSelector";
import { useCallStateHooks } from "@stream-io/video-react-sdk";
// import { useContext } from "react";
// import { BrowserMediaContext } from "@/contexts/BrowserMediaProvider";

const ICON_SIZE = 20;

const ToggleVideoButton = () => {
  // const { isCameraOn, startCamera, stopCamera } =
  //   useContext(BrowserMediaContext);

  const toggleCamera = async () => {
    camera.toggle();
  };

  const { useCameraState } = useCallStateHooks();
  const { camera, hasBrowserPermission, isMute } = useCameraState();

  return (
    <ToggleButtonContainer
      deviceSelectors={
        <VideoInputDeviceSelector
          className="w-[23.125rem]"
          dark
          // disabled={!hasBrowserPermission}
        />
      }
      icons={
        <div title="Apply visual effects">
          <VisualEffects width={ICON_SIZE} height={ICON_SIZE} />
        </div>
      }
    >
      <CallControlButton
        icon={
          isMute ? (
            <VideocamOff width={ICON_SIZE} height={ICON_SIZE} />
          ) : (
            <Videocam width={ICON_SIZE} height={ICON_SIZE} />
          )
        }
        title={isMute ? "Turn on camera" : "Turn off camera"}
        // onClick={toggleCamera}
        active={!isMute}
        alert={!hasBrowserPermission}
        className={clsx("cursor-not-allowed")}
      />
    </ToggleButtonContainer>
  );
};

export default ToggleVideoButton;
