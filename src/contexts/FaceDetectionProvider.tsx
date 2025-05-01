"use client";
import { VapiDomEvents } from "@/constatnts/vapi-const";
import { createContext, ReactNode, useContext, useMemo, useRef, useState } from "react";

import { FaceDetectionProcessor } from "@videosdk.live/videosdk-media-processor-web";
import useCache from "../hooks/useCache";

const MESSAGE_MAP: Record<
  "attention" | "you-moved-away" | "more-people" | "eye-contact",
  any
> = {
  attention: {
    "message":"user is looking here and there and seems distracted, tell them to focus and look straight (try to add human touch as well some different content based on the current conversation, reply should look like real.(if it's second or third time then you can warn them as it might affect their results)",
    "title":"Attention Broken",
  },
  "you-moved-away": {
    "message":"user moved away from the camera and not visible, tell them to please come back to the camera (if it's the second or third time then you can warn them as it might affect their results)",
    "title":"useer moved away",
  },
  "more-people":{
    "title":"more people",
    "message": "user has someone else in the camera, tell them I'm noticing someone else in the frame—this interview is just for you. Please continue alone. (if it's second or third time then you can warn them as it might affect their results)",
  },
  "eye-contact": {
    "title":"eye contact",
    "message": "user is looking here and there and seems distracted, tell them You're looking around quite a bit. Let's stay focused here.",
  }
};

type FaceDetectionContextType = {
  startDetectingFace: (stream: any) => void;
  stopDetectingFace: () => void;
  started: boolean;
};

const FaceDetectionContext = createContext<FaceDetectionContextType | null>(null);

interface FaceDetectionProviderProps {
  children: ReactNode;
}

export function FaceDetectionProvider({ children }: FaceDetectionProviderProps) {
  const [started, setStarted] = useState(false);
  const { addKey, hasKey } = useCache(10_000);

  const dataRef = useRef<{
    thresholds: any;
    lastViolationTime: Record<string, number | null>;
    currentAttentionDirection: string | null;
  }>({
    thresholds: { attention: 54, eyeContact: 90, peopleCount: 1 },
    lastViolationTime: {
      attention: null,
      eyeContact: null,
      moreThanOnePeople: null,
      movedAway: null,
    },
    currentAttentionDirection: null,
  });

  const faceDetectionProcessor = useMemo(
    () => new FaceDetectionProcessor(),
    []
  );

  const emitSpeakEvent = (
    type: "attention" | "you-moved-away" | "more-people" | "eye-contact"
  ) => {
    const message = MESSAGE_MAP[type];
    const eventData = {  
      message: message,
      timestamp: Date.now(),
    };

    const event = new CustomEvent(VapiDomEvents.SPEAK_ASSISTANT, {
      detail: eventData,
    });

    document.dispatchEvent(event);
  };

  const processFaceDetection = (data: any) => {
    const { faceLandMark, faceDetected } = data;

    const { thresholds } = dataRef.current;
    const attentionThreshold = thresholds.attention;
    const eyeContactThreshold = thresholds.eyeContact;
    const peopleCountThreshold = thresholds.peopleCount;

    let detectedAttentionDirection: string | null = null;

    if (faceLandMark.eyeLookOutLeft > attentionThreshold) {
      detectedAttentionDirection = "left";
    } else if (faceLandMark.eyeLookOutRight > attentionThreshold) {
      detectedAttentionDirection = "right";
    } else if (
      faceLandMark.eyeLookUpLeft > attentionThreshold ||
      faceLandMark.eyeLookUpRight > attentionThreshold
    ) {
      detectedAttentionDirection = "up";
    } else if (
      faceLandMark.eyeLookDownLeft > attentionThreshold ||
      faceLandMark.eyeLookDownRight > attentionThreshold
    ) {
      detectedAttentionDirection = "down";
    }

    processAttentionIssue(detectedAttentionDirection);

    // Check for eye contact
    const eyeContactIssue =
      faceLandMark.eyeBlinkLeft > eyeContactThreshold ||
      faceLandMark.eyeBlinkRight > eyeContactThreshold;

    // Check number of people
    const noOneInFrame = faceDetected === 0;
    const moreThanOnePeopleInFrame = faceDetected > peopleCountThreshold;

    handleViolation("eye-contact", eyeContactIssue);
    handleViolation("you-moved-away", noOneInFrame);
    handleViolation("more-people", moreThanOnePeopleInFrame);
  };

  const processAttentionIssue = (detectedDirection: string | null) => {
    const currentTime = Date.now();
    const { lastViolationTime } = dataRef.current;

    if (hasKey("attention")) {
      return;
    }

    if (!detectedDirection) {
      dataRef.current.currentAttentionDirection = null;
      lastViolationTime["attention"] = null;
      return;
    }

    if (!dataRef.current.currentAttentionDirection) {
      dataRef.current.currentAttentionDirection = detectedDirection;
      lastViolationTime["attention"] = currentTime;
    } else if (
      dataRef.current.currentAttentionDirection !== detectedDirection
    ) {
      dataRef.current.currentAttentionDirection = detectedDirection;
      lastViolationTime["attention"] = currentTime;
    } else {
      // Emit event after sustained attention issue
      lastViolationTime["attention"] = null;
      dataRef.current.currentAttentionDirection = null;
      addKey("attention");
      emitSpeakEvent("attention");
    }
  };

  const handleViolation = (
    type: "attention" | "you-moved-away" | "more-people" | "eye-contact",
    issueDetected: boolean
  ) => {
    const currentTime = Date.now();

    if (hasKey(type)) {
      return;
    }

    if (issueDetected) {
      if (!dataRef.current.lastViolationTime[type]) {
        dataRef.current.lastViolationTime[type] = currentTime;
      } else {
        // Issue persists, trigger event
        dataRef.current.lastViolationTime[type] = null;
        addKey(type);
        emitSpeakEvent(type);
      }
    } else {
      dataRef.current.lastViolationTime[type] = null;
    }
  };

  const startDetectingFace = (stream: any) => {
    if (started) {
      return;
    }
    if (!stream) {
      return;
    }
    faceDetectionProcessor.start({
      options: {
        interval: 200,
      },
      stream: stream,
      callback: processFaceDetection,
    });
    setStarted(true);
  };

  const stopDetectingFace = () => {
    setStarted(false);
    if (started) {
      faceDetectionProcessor.stop();
    }
  };

  const contextValue = useMemo(() => ({
    startDetectingFace,
    stopDetectingFace,
    started,
  }), [started]);

  return (
    <FaceDetectionContext.Provider value={contextValue}>
      {children}
    </FaceDetectionContext.Provider>
  );
}

// Custom hook to use the face detection context
function useFaceDetactionAlgo() {
  const context = useContext(FaceDetectionContext);
  
  if (!context) {
    throw new Error("useFaceDetactionAlgo must be used within a FaceDetectionProvider");
  }
  
  return context;
}

export default useFaceDetactionAlgo;
