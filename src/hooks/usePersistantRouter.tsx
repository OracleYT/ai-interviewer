"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const usePersistantRouter = () => {
  const router = useRouter();
  const [redirectState, setRedirectState] = useState<Record<
    string,
    any
  > | null>(null);

  const push = (route: string, state: Record<string, any> = {}) => {
    setRedirectState(state);
    router.push(route); 
    setTimeout(() => { 
      setRedirectState(null); 
    }, 5000);
  };

  return { push, redirectState };
};

export default usePersistantRouter;
