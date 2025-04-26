"use client";

import { useCallback } from "react";

/**
 * Hook for capturing photos from a camera stream
 * @returns Functions for capturing photos from a stream
 */
const useEvidanceSender = () => { 
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

  return {
    sendEvidence,
  };
};

export default useEvidanceSender;
