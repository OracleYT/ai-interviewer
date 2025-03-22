"use client";

import { useState, useEffect, useRef, useContext, useCallback } from "react";
import Vapi from "@vapi-ai/web";
import { VolumeLevelContext } from "@/contexts/VolumeLevelProvider";
import { Call } from "@vapi-ai/web/dist/api";
import { BrowserMediaContext } from "@/contexts/BrowserMediaProvider";
import { useRouter } from "next/navigation";
import { sendInterviewDataToBackend } from "@/action/server";
import {
  ProctorState,
  useAutoProctor,
} from "@/contexts/ProcterContextProvider";
import { VapiDomEvents } from "@/constatnts/vapi-const";
import { sendInterviewDoneEvent, updateInterviewStatusById } from "@/action/interview-action";
import axios from "axios";

const useVapi = (meetingId: string) => {
  const vapiRef = useRef<Vapi>();
  const vapiCallRef = useRef<Call | null>();
  const router = useRouter();
  const { procterState, stopProctering } = useAutoProctor();
  const useCallStatus = useRef<"init" | "started" | "ended">("init");

  const [vapiInstance, setVapiInstance] = useState<Vapi>();
  // const statusRef = useRef<"init" | "started">("init");
  const { setVolumeLevel } = useContext(VolumeLevelContext);
  const { stopCamera } = useContext(BrowserMediaContext);

  useEffect(() => {
    if (procterState === ProctorState.PROCTING_STOPED) {
      router.push(`/meeting/${meetingId}/meeting-end?endCall=true`);
    }
  }, [procterState, router]);

  const stopVapiSession = useCallback(async () => {
    if (vapiRef.current) {
      stopCamera();
      if (useCallStatus.current === "ended") return;
      useCallStatus.current = "ended";
      vapiRef.current.stop();
    } else {
      throw new Error("Vapi not initialized");
    }
  }, [sendInterviewDataToBackend, stopCamera]);

  useEffect(() => {
    if (!vapiRef.current) {
      if (!process.env.NEXT_PUBLIC_VAPI_KEY) {
        throw Error("Credential missing!☹️");
      }
      const vapi = (vapiRef.current = new Vapi(
        process.env.NEXT_PUBLIC_VAPI_KEY
      ));
    }
    const volumeLevelHandler = (level: number) => {
      setVolumeLevel(level);
    };
    const endCallHandler = async () => {
      await stopVapiSession();
      await updateInterviewStatusById({
        interviewId: meetingId,
        callId: vapiCallRef.current?.id!,
        status: "COMPLETED",
      });
      await sendInterviewDoneEvent(meetingId)
      stopProctering();
    };

    const speakAssistantHandler = (e: any) => {
      const { detail } = e;
      const { message, endSession } = detail;
      vapiRef.current?.say(message, endSession);
    };

    vapiRef.current?.on("volume-level", volumeLevelHandler);
    vapiRef.current?.on("call-end", endCallHandler);

    document.addEventListener(
      VapiDomEvents.SPEAK_ASSISTANT,
      speakAssistantHandler
    );

    setVapiInstance(vapiRef.current);
    return () => {
      vapiRef.current?.removeAllListeners("volume-level");
      vapiRef.current?.removeAllListeners("call-end");
      document.removeEventListener(
        VapiDomEvents.SPEAK_ASSISTANT,
        speakAssistantHandler
      );
    };
  }, [stopVapiSession, setVolumeLevel]);

  const startVapiSession = async (assistantId: string) => {
    if (!vapiRef.current) {
      throw new Error("Vapi not Initialize");
    }
    if (useCallStatus.current === "started") {
      return;
    }
    useCallStatus.current = "started";
    vapiCallRef.current = await vapiRef.current.start(assistantId);
    updateInterviewStatusById({
      interviewId: meetingId,
      callId: vapiCallRef.current?.id!,
      status: "ONGOING",
    });
    return vapiCallRef.current;
  };

  return {
    startVapiSession,
    stopVapiSession,
    vapiInstance,
  };
};

export default useVapi;
