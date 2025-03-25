import clsx from "clsx";

import CallControlButton from "./CallControlButton";
import ToggleButtonContainer from "./ToggleButtonContainer";
import Videocam from "./icons/Videocam";
import VideocamOff from "./icons/VideocamOff";
import VisualEffects from "./icons/VisualEffects";
import { VideoInputDeviceSelector } from "./DeviceSelector";
import { useContext } from "react";
import { BrowserMediaContext } from "@/contexts/BrowserMediaProvider";

const ICON_SIZE = 20;

const ToggleVideoButton = () => {
  const { isCameraOn, startCamera, stopCamera } =
    useContext(BrowserMediaContext);

  const toggleCamera = async () => {
    if (isCameraOn) {
      stopCamera();
    } else {
      startCamera();
    }
  };

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
          isCameraOn ? (
            <Videocam width={ICON_SIZE} height={ICON_SIZE} />
          ) : (
            <VideocamOff width={ICON_SIZE} height={ICON_SIZE} />
          )
        }
        title={isCameraOn ? "Turn off camera" : "Turn on camera"}
        // onClick={}
        active={isCameraOn}
        // alert={!hasBrowserPermission}
        className={clsx(!isCameraOn && "toggle-button-alert", "cursor-not-allowed")}
      />
    </ToggleButtonContainer>
  );
};

export default ToggleVideoButton;
