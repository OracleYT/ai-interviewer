"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import useCache from "../hooks/useCache";
import {
  AP_VOILATION_WARNINGS,
  PROCTORING_OPTIONS,
} from "../constatnts/auto-procter-const";
import { fetchAutoProctorHashedTestAttemptId } from "../action/auto-proctor";
import { NEXT_AUTO_PROCTOR_CLIENT_ID, NEXT_AUTO_PROCTOR_ENABLE } from "@/constatnts/env-const";

/* eslint-disable no-unused-vars*/
type ProcterContextType = {
  initAutoProctor: (
    testAttemptId: string,
    onForceExitCallback: Function
  ) => void;
  startAutoProctor: (callback?: Function) => void;
  isProctorStarted?: () => boolean;
};
/* eslint-enable no-unused-vars*/

export const ProcterContext =
  // @ts-ignore
  createContext<ProcterContextType>();

export enum ProctorState {
  /* eslint-disable no-unused-vars */
  INIT,
  /* eslint-disable no-unused-vars */
  STARTING,
  /* eslint-disable no-unused-vars */
  IN_PROGRESS,
  /* eslint-disable no-unused-vars */
  DONE,
}

function ProcterContextProvider({ children }: { children: ReactNode }) {
  const [proctorState, setProctorState] = useState<ProctorState>(
    ProctorState.INIT
  );
  const instance = useRef<any>();
  const { addKey, hasKey } = useCache(10_000); // 10sec
  const forceExitRef = useRef<Function>();

  const isAutoProcterEnabled = () => {
    if (NEXT_AUTO_PROCTOR_ENABLE !== "true") {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (!isAutoProcterEnabled()) {
      return;
    }
    const successEventListner = (e: any) => {
      const { successCode } = e.detail;
      switch (successCode) {
        case 2001:
          // toast.success(
          //   "Browser and Permission check completed and Permission granted."
          // );
          break;

        case 2002:
          // toast.success(
          //   "HTML Elements created. Ready to async load video and ML model."
          // );

          break;

        case 2003:
          // toast.success(
          //   "Video and ML model loaded. Ready to start face detection."
          // );

          break;
      }
    };

    const apEvidenceEvent = (e: any) => {
      const testAttemptID = instance.current.testAttemptId;
      const endSessionCall = `${testAttemptID}-end-session`;

      const evidenceCode: string = e?.detail?.evidenceCode as string;
      console.log(`[apEvidenceEvent] : ${evidenceCode}`);
      if (localStorage.getItem(endSessionCall) !== null) {
        return;
      }

      if (
        Object.prototype.hasOwnProperty.call(
          AP_VOILATION_WARNINGS,
          evidenceCode
        )
      ) {
        if (hasKey(evidenceCode)) return;
        addKey(evidenceCode);
        // @ts-ignore
        const evidence = AP_VOILATION_WARNINGS[evidenceCode];
        if (!evidence?.voilation) return;
        const key = `${testAttemptID}-voilation-${evidenceCode}`;
        const messageIndex = Number(localStorage.getItem(key) || 0);
        let message = "";
        let endSession = false;
        if (evidence?.messages?.length <= messageIndex) {
          message = AP_VOILATION_WARNINGS["finalStatement"];
          localStorage.setItem(endSessionCall, "true");
          endSession = true;
        } else {
          message = evidence?.messages[messageIndex];
        }
        // speak somthing through events

        localStorage.setItem(key, JSON.stringify(messageIndex + 1));
      }
    };
    window.addEventListener("apEvidenceEvent", apEvidenceEvent);
    window.addEventListener("apSuccessEvent", successEventListner);
    // window.addEventListener('apSetupComplete', startAutoProctor);

    return () => {
      // window.removeEventListener('apSetupComplete', startAutoProctor);
      window.removeEventListener("apSuccessEvent", successEventListner);
      window.removeEventListener("apEvidenceEvent", apEvidenceEvent);
    };
  }, []);

  const initAutoProctor = async (
    testAttemptId: string,
    onForceExitCallback: Function
  ) => {
    try {
      if (!isAutoProcterEnabled()) {
        return;
      }
      console.log("initializing auto proctor... ", testAttemptId);
      if (
        proctorState !== ProctorState.INIT ||
        !testAttemptId ||
        instance.current?.isApTestStarted
      ) {
        return Promise.resolve(false);
      }

      setProctorState(ProctorState.STARTING);

      const clientId = NEXT_AUTO_PROCTOR_CLIENT_ID;
      const hashedTestAttemptId =
        await fetchAutoProctorHashedTestAttemptId(testAttemptId);
      /* eslint-disable no-undef */ // @ts-ignore
      let apInst = new AutoProctor({
        testAttemptId,
        clientId,
        hashedTestAttemptId,
      });
      await apInst.setup(PROCTORING_OPTIONS);
      instance.current = apInst;
      forceExitRef.current = onForceExitCallback;
      await apInst.start();
      setProctorState(ProctorState.IN_PROGRESS);
      // addResouceCleaner(async () => {
      //   if (isProctorStarted()) {
      //     await instance.current?.stop();
      //     setProctorState(ProctorState.DONE);
      //   }
      // });
      return Promise.resolve(true);
    } catch (error) {
      console.log(error);
    }
  };

  const isProctorStarted = () => {
    return instance.current?.isApTestStarted;
  };

  const startAutoProctor = async (onForceExitCallback?: Function) => {
    try {
      if (proctorState === ProctorState.INIT && instance.current) {
        setProctorState(ProctorState.IN_PROGRESS);
        forceExitRef.current = onForceExitCallback;
        await instance.current?.start();
        // addResouceCleaner(() => {
        //   instance.current?.stop();
        //   setProctorState(ProctorState.DONE);
        //   // console.log('ending autoProctor Test: ', instance.current);
        // });
        // console.log('starting autoProctor Test: ', instance.current);
      }
    } catch (err) {
      console.log("Error while stgartin auto proctor", err);
    }
  };

  return (
    <ProcterContext.Provider
      value={{
        startAutoProctor,
        isProctorStarted,
        initAutoProctor,
      }}
    >
      {children}
    </ProcterContext.Provider>
  );
}

export function useAutoProctor() {
  return useContext<ProcterContextType>(ProcterContext);
}

export default ProcterContextProvider;
