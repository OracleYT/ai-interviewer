"use client";
import { VapiDomEvents } from "@/constatnts/vapi-const";
import { useMemo, useRef, useState } from "react";

import { FaceDetectionProcessor } from "@videosdk.live/videosdk-media-processor-web";
import useCache from "./useCache";

const MESSAGE_MAP: Record<
  "attention" | "you-moved-away" | "more-people" | "eye-contact",
  string
> = {
  attention: "You're looking away a lot. Stay focused here.",
  "you-moved-away": "Please come back to the camera.",
  "more-people":
    "I'm noticing someone else in the frame—this interview is just for you. Please continue alone.",
  "eye-contact": "You're looking around quite a bit. Let's stay focused here.",
};

function useFaceDetactionAlgo() {
  const [started, setStarted] = useState(false);
  const { addKey, hasKey } = useCache(10_000);

  const dataRef = useRef<{
    thresholds: any;
    lastViolationTime: Record<string, number | null>;
    violationDuration: number;
  }>({
    thresholds: { attention: 30, eyeContact: 38, peopleCount: 1 },
    lastViolationTime: {
      attention: null,
      eyeContact: null,
      moreThanOnePeople: null,
      movedAway: null,
    },
    violationDuration: 2000,
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

    // Check if user is not looking at the camera
    const attentionIssue =
      faceLandMark.eyeLookOutLeft > attentionThreshold ||
      faceLandMark.eyeLookOutRight > attentionThreshold ||
      faceLandMark.eyeLookUpLeft > attentionThreshold ||
      faceLandMark.eyeLookUpRight > attentionThreshold ||
      faceLandMark.eyeLookDownLeft > attentionThreshold ||
      faceLandMark.eyeLookDownRight > attentionThreshold;

    // Check for eye contact
    const eyeContactIssue =
      faceLandMark.eyeBlinkLeft > eyeContactThreshold ||
      faceLandMark.eyeBlinkRight > eyeContactThreshold;

    // Check number of people
    const noOneInFrame = faceDetected === 0;
    const moreThanOnePeopleInFrame = faceDetected > peopleCountThreshold;

    handleViolation("attention", attentionIssue);
    handleViolation("eye-contact", eyeContactIssue);
    handleViolation("you-moved-away", noOneInFrame);
    handleViolation("more-people", moreThanOnePeopleInFrame);
  };

  const handleViolation = (
    type: "attention" | "you-moved-away" | "more-people" | "eye-contact",
    issueDetected: boolean
  ) => {
    const currentTime = Date.now();

    if (hasKey(type)) {
      return;
    }
    addKey(type);

    if (issueDetected) {
      if (!dataRef.current.lastViolationTime[type]) {
        dataRef.current.lastViolationTime[type] = currentTime;
      } else if (
        currentTime - dataRef.current.lastViolationTime[type] >=
        dataRef.current.violationDuration
      ) {
        dataRef.current.lastViolationTime[type] = null;
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
  };

  return { startDetectingFace, started, stopDetectingFace };
}

export default useFaceDetactionAlgo;
