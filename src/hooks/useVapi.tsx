"use client";

import { useState, useEffect, useRef } from "react";
import Vapi from "@vapi-ai/web";

const useVapi = () => {
  const vapiRef = useRef<Vapi>();
  const [vapiInstance, setVapiInstance] = useState<Vapi>();
  const statusRef = useRef<"init" | "started">("init");

  useEffect(() => {
    if (!vapiRef.current) {
      if (!process.env.NEXT_PUBLIC_VAPI_KEY) {
        throw Error("Credential missing!☹️");
      }
      const vapi = (vapiRef.current = new Vapi(
        process.env.NEXT_PUBLIC_VAPI_KEY
      ));
    }
    vapiRef.current?.on("volume-level", (level) => {
      console.log("Volume Level: ", level);
    });
    setVapiInstance(vapiRef.current);
    return () => {
      if (vapiRef.current) {
        vapiRef.current.emit("call-end");
        vapiRef.current.stop();
      }
    };
  }, []);

  const startVapiSession = async (assistantId?: string) => {
    if (!vapiRef.current) {
      throw new Error("Vapi not Initialize");
    }
    if (!assistantId) {
      throw new Error("AssistantId is required!");
    }

    return await vapiRef.current.start(assistantId);
    // return call;
  };

  const stopVapiSession = () => {
    if (vapiRef.current) {
      vapiRef.current.emit("call-end");
      vapiRef.current.stop();
    } else {
      throw new Error("Vapi not initialized");
    }
  };

  return { startVapiSession, stopVapiSession, vapiInstance };
};

export default useVapi;
