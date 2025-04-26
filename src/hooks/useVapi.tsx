"use client";

import { useState, useEffect, useRef, useContext, useCallback } from "react";
import Vapi from "@vapi-ai/web";
import { VolumeLevelContext } from "@/contexts/VolumeLevelProvider";
import { Call } from "@vapi-ai/web/dist/api";
import { useRouter } from "next/navigation";
import {
  ProctorState,
  useAutoProctor,
} from "@/contexts/ProcterContextProvider";
import { VapiDomEvents } from "@/constatnts/vapi-const";
import { updateInterviewStatusById } from "@/action/interview-action";
import { useAuth } from "@/contexts/AuthProvider";
import { useCallStateHooks } from "@stream-io/video-react-sdk";
import { fetchUserById } from "@/action/user-action";

const useVapi = (meetingId: string) => {
  const vapiRef = useRef<Vapi>();
  const vapiCallRef = useRef<Call | null>();
  const router = useRouter();
  const { user } = useAuth();

  const { procterState, stopProctering } = useAutoProctor();
  const useCallStatus = useRef<
    "init" | "started" | "starting" | "ending" | "ended"
  >("init");

  const [vapiInstance, setVapiInstance] = useState<Vapi>();
  const { setVolumeLevel } = useContext(VolumeLevelContext);
  // const { stopCamera } = useContext(BrowserMediaContext);
  const { useCameraState, useMicrophoneState } = useCallStateHooks();

  const { camera } = useCameraState();
  const { microphone } = useMicrophoneState();

  useEffect(() => {
    const handleProctoringStop = async () => {
      if (procterState === ProctorState.PROCTING_STOPED) {
        try {
          await stopMedia();
          router.push(`/meeting/${meetingId}/meeting-end?endCall=true`);
        } catch (error) {
          console.error("Error while updating interview status", error);
        }
      }
    };
    handleProctoringStop();
  }, [procterState, router]);

  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      const message = "Are you sure you want to leave Interview?";
      event.preventDefault();
      event.returnValue = message;
      return message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const stopVapiSession = useCallback(async () => {
    if (vapiCallRef.current?.status === "ended") {
      return;
    }
    if (vapiRef.current) {
      useCallStatus.current = "ended";
      await vapiRef.current.stop();
      await updateInterviewStatusById({
        interviewId: meetingId,
        callId: vapiCallRef.current?.id!,
        status: "COMPLETED",
      });
      await stopProctering();
      router.push(`/meeting/${meetingId}/meeting-end?endCall=true`);
    }
  }, []);

  const stopMedia = useCallback(async () => {
    try {
      await Promise.allSettled([microphone.disable(), camera.disable()]);
    } catch (error) {
      console.error("Error stopping media stream", error);
    }
  }, [microphone, camera]);

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

    const endCallEventHandler = async () => {
      if (useCallStatus.current === "ended") {
        return;
      }
      useCallStatus.current = "ended";
      await updateInterviewStatusById({
        interviewId: meetingId,
        callId: vapiCallRef.current?.id!,
        status: "COMPLETED",
      });
      // await sendInterviewDoneEvent(meetingId);
      stopProctering();
    };

    const speakAssistantHandler = async (e: any) => {
      const { message } = e.detail;
      vapiRef.current?.send({
        type: "add-message",
        message: {
          role: "system",
          content: message,
        },
      });
    };

    vapiRef.current?.on("volume-level", volumeLevelHandler);
    vapiRef.current?.on("call-end", endCallEventHandler);

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
    if (["starting", "started"].includes(useCallStatus.current)) {
      return;
    }

    let userData = {
      name: user?.name || "",
      course: user?.course || "",
      university: user?.university || "",
      userSummary: user?.userSummary || "",
      passportNumber: user?.passportNumber || "",
    };

    const userNewData = await fetchUserById(user?.id!);
    if (userNewData.success) {
      userData = {
        name: userNewData?.data?.name || "",
        course: userNewData?.data?.course || "",
        university: userNewData?.data?.university || "",
        userSummary: userNewData?.data?.userSummary || "",
        passportNumber: userNewData?.data?.passportNumber || "",
      };
    }
    useCallStatus.current = "starting";

    console.log(userData);
    const assistantOverrides = {
      transcriber: {
        provider: "deepgram" as const,
        model: "nova-2" as const,
        language: "en-US" as const,
      },
      recordingEnabled: false,
      variableValues: userData,
    };

    vapiCallRef.current = await vapiRef.current.start(
      assistantId,
      assistantOverrides
    );
    useCallStatus.current = "started";

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
