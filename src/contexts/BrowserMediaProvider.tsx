"use client";
import useFaceDetactionAlgo from "@/hooks/useFaceDetactionAlgo";
import React, {
  createContext,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

export const BrowserMediaContext = createContext<any>(null);

function BrowserMediaProvider({ children }: { children: ReactNode }) {
  // Camera state
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [hasCameraPermission, setHasCameraPermission] = useState(true);
  const [videoPreviewText, setVideoPreviewText] = useState("");
 const { startDetectingFace, started, stopDetectingFace } =
    useFaceDetactionAlgo();


  const videoRef = useRef(null);
  const streamRef = useRef(null);
  useEffect(() => {
    if (!isCameraOn) startCamera();
  }, []);
  // Camera controles
  const startCamera = async () => {
    try {
      setIsCameraOn(true);
      setVideoPreviewText("Camera is starting");

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        //@ts-ignore
        videoRef.current.srcObject = stream;
        startDetectingFace(stream);
      }
      setVideoPreviewText("");
      //@ts-ignore
      streamRef.current = stream;
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      setVideoPreviewText("Camera is off");
      //@ts-ignore
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      stopDetectingFace();
    }
    if (videoRef.current) {
      //@ts-ignore
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
  };
  return (
    <BrowserMediaContext.Provider
      value={{
        videoRef,
        isCameraOn,
        startCamera,
        stopCamera,
        videoPreviewText,
        setVideoPreviewText,
        hasCameraPermission,
      }}
    >
      {children}
    </BrowserMediaContext.Provider>
  );
}

export default BrowserMediaProvider;
