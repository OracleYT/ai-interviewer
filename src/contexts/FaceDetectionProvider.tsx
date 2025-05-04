"use client";
import { VapiDomEvents } from "@/constatnts/vapi-const";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

import useCache from "../hooks/useCache";
import { MESSAGE_MAP } from "@/constatnts/face-detection-cosnt";


type FaceDetectionContextType = {
  startDetectingFace: (stream: any) => void;
  stopDetectingFace: () => void;
  started: boolean;
};

const FaceDetectionContext = createContext<FaceDetectionContextType | null>(
  null
);

interface FaceDetectionProviderProps {
  children: ReactNode;
}

export function FaceDetectionProvider({
  children,
}: FaceDetectionProviderProps) {
  const [started, setStarted] = useState(false);
  const { addKey, hasKey } = useCache(10_000);

  const dataRef = useRef<{
    thresholds: any;
    lastViolationTime: Record<string, number | null>;
    violationDuration: number;
    currentAttentionDirection: string | null;
  }>({
    thresholds: { attention: 54, eyeContact: 90, peopleCount: 1 },
    lastViolationTime: {
      attention: null,
      eyeContact: null,
      moreThanOnePeople: null,
      movedAway: null,
    },
    violationDuration: 1800,
    currentAttentionDirection: null,
  });

  const faceDetectionProcessor = useRef<any>(null);

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
    const { lastViolationTime, violationDuration } = dataRef.current;

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
      if (
        currentTime - (lastViolationTime["attention"] ?? 0) >=
        violationDuration
      ) {
        lastViolationTime["attention"] = null;
        dataRef.current.currentAttentionDirection = null;
        addKey("attention");

        emitSpeakEvent("attention");
      }
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
      } else if (
        currentTime - dataRef.current.lastViolationTime[type]! >=
        dataRef.current.violationDuration
      ) {
        dataRef.current.lastViolationTime[type] = null;
        addKey(type);
        emitSpeakEvent(type);
      }
    } else {
      dataRef.current.lastViolationTime[type] = null;
    }
  };

  const startDetectingFace = async (stream: any) => {
    if (started) {
      return;
    }
    if (!stream) {
      return;
    }

    if (!faceDetectionProcessor.current) {
      console.error("FaceDetectionProcessor is not initialized");

      const { FaceDetectionProcessor } = await import(
        "@videosdk.live/videosdk-media-processor-web"
      );

      console.log("FaceDetectionProcessor", FaceDetectionProcessor);
      if (!FaceDetectionProcessor) {
        console.log("FaceDetectionProcessor not found");
        return;
      }
      faceDetectionProcessor.current = new FaceDetectionProcessor();
    }
    faceDetectionProcessor.current?.start({
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
  };

  const contextValue = useMemo(
    () => ({
      startDetectingFace,
      stopDetectingFace,
      started,
    }),
    [started]
  );

  return (
    <FaceDetectionContext.Provider value={contextValue}>
      {children}
    </FaceDetectionContext.Provider>
  );
}

// Custom hook to use the face detection context
export function useFaceDetactionAlgo() {
  const context = useContext(FaceDetectionContext);

  if (!context) {
    throw new Error(
      "useFaceDetactionAlgo must be used within a FaceDetectionProvider"
    );
  }

  return context;
}
