"use client";

import { useState, useEffect, useRef, useContext, useCallback } from "react";
import Vapi from "@vapi-ai/web";
import { VolumeLevelContext } from "@/contexts/VolumeLevelProvider";
import useInterviewCall from "./useInterviewCall";
import { Call } from "@vapi-ai/web/dist/api";
import { BrowserMediaContext } from "@/contexts/BrowserMediaProvider";
import { useRouter } from "next/navigation";
import {throttle} from "lodash";

const useVapi = (meetingId: string) => {
  const vapiRef = useRef<Vapi>();
  const vapiCallRef = useRef<Call | null>();
  const router = useRouter();

  const [vapiInstance, setVapiInstance] = useState<Vapi>();
  // const statusRef = useRef<"init" | "started">("init");
  const { setVolumeLevel } = useContext(VolumeLevelContext);
  const { sendInterviewDataToBackend } = useInterviewCall();
  const { stopCamera } = useContext(BrowserMediaContext);

  const stopVapiSession = useCallback(async () => {
    const handleCallEnd = async () => {
      await sendInterviewDataToBackend({
        data: {
          name: localStorage.getItem("guest_name"),
          meetingId,
          vapiCallData: vapiCallRef.current,
        },
      });
    };

    if (vapiRef.current) {
      vapiRef.current.emit("call-end");
      stopCamera();
      await handleCallEnd();
      vapiRef.current.stop();
      router.push(`/${meetingId}/meeting-end?endCall=true`);
    } else {
      throw new Error("Vapi not initialized");
    }
  }, [sendInterviewDataToBackend, stopCamera]);

  const throttledStopVapiSession = useCallback(throttle(stopVapiSession, 2000), [stopVapiSession]);

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

    vapiRef.current?.on("volume-level", volumeLevelHandler);
    vapiRef.current?.on("call-end", () => {
      console.log("recived end call event from vapi");
      throttledStopVapiSession();
    });
    setVapiInstance(vapiRef.current);
    return () => {
      vapiRef.current?.removeAllListeners("volume-level");
      vapiRef.current?.removeAllListeners("call-end");
    };
  }, [throttledStopVapiSession, setVolumeLevel]);

  const startVapiSession = async (assistantId: string) => {
    if (!vapiRef.current) {
      throw new Error("Vapi not Initialize");
    }
    const call = await vapiRef.current.start(assistantId);
    vapiCallRef.current = call;
    return call;
  };

  return { startVapiSession, stopVapiSession: throttledStopVapiSession, vapiInstance };
};

export default useVapi;
