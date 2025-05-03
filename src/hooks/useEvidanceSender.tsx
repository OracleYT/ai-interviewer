"use client";

import { useCallback, useRef } from "react";

/**
 * Hook for capturing photos from a camera stream
 * @returns Functions for capturing photos from a stream
 */
const useEvidanceSender = () => { 
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const sendEvidence = useCallback(
    async (
      img: Blob,
      meetingId: string,
      title: string,
      isViolation: boolean = true
    ) => {
      try {
        console.log(
          "[captureAndSendEvidence] Capturing photo from camera stream"
        );

        // Create a file from the blob
        const fileName = `evidence-${Date.now()}.jpg`;
        const photoFile = new File([img], fileName, {
          type: "image/jpeg",
        });

        // Create FormData to send to API
        const formData = new FormData();
        formData.append("file", photoFile);
        formData.append("interviewId", meetingId);
        formData.append("title", title);
        formData.append("voilation", isViolation.toString());

        console.log("[captureAndSendEvidence] Sending evidence to API", {
          interviewId: meetingId,
          title,
          isViolation,
          fileSize: photoFile.size,
        });

        // Send to API
        const response = await fetch("/api/save-evidance", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        console.log("[captureAndSendEvidence] API response:", result);

        return result;
      } catch (error) {
        console.error(
          "[captureAndSendEvidence] Failed to capture and send evidence:",
          error
        );
        return null;
      }
    },
    []
  );

    const captureImageFromVideo = async (meetingId: string, videElem: HTMLVideoElement, message: string) => {
      if (!videElem || !videElem.srcObject) return;
  
      if (!canvasRef.current) {
        canvasRef.current = document.createElement("canvas");
      }
      // get size of video element
      canvasRef.current.width = videElem.videoWidth;
      canvasRef.current.height = videElem.videoHeight;
  
      canvasRef.current
        .getContext("2d")
        ?.drawImage(
          videElem,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
      // Convert the canvas to a data URL
      const blob = await new Promise<Blob>((resolve) => {
        canvasRef.current?.toBlob(
          (blob) => resolve(blob ?? new Blob()),
          "image/jpeg",
          1
        );
      });
  
      sendEvidence(blob, meetingId, message, true);
      canvasRef.current = null;
    };

  return {
    captureImageFromVideo,
  };
};

export default useEvidanceSender;
