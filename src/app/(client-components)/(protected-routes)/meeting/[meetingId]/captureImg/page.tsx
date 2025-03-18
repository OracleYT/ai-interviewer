"use client";

import ToggleVideoButton from "@/components/ToggleVideoButton";
import { BrowserMediaContext } from "@/contexts/BrowserMediaProvider";
import React, { useContext, useRef, useState } from "react";

const WebcamCapture = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const {videoRef}= useContext(BrowserMediaContext);


  const captureImage = async () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        // Draw the video frame onto the canvas
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );

        // Get the base64 representation of the image
        const image = canvasRef.current.toDataURL("image/png");
        setImageData(image);

        // Create a unique filename based on the timestamp
        const filename = `image_${Date.now()}.png`;

        // Send the image data to the backend
        try {
          const response = await fetch("/api/captureImg/saveImage", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              imageBase64: image,
              filename: filename,
            }),
          });

          const result = await response.json();
          if (response.ok) {
            setStatusMessage("Image saved successfully!");
            console.log("Saved Image URL:", result.imageUrl);
          } else {
            setStatusMessage("Failed to save image.");
            console.error(result.error);
          }
        } catch (error) {
          setStatusMessage("Error sending image to the server.");
          console.error("Error:", error);
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative w-96 h-56 border-2 border-gray-400">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          playsInline
        />
      </div>
      <ToggleVideoButton/>
      <button
        onClick={captureImage}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Capture Image
      </button>

      {statusMessage && (
        <div className="mt-4 text-lg font-semibold text-green-600">
          {statusMessage}
        </div>
      )}

      {imageData && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Captured Image:</h3>
          <img src={imageData} alt="Captured" className="mt-2 w-96 h-auto" />
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default WebcamCapture;
