"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
// import useCache from "../hooks/useCache";
import {
  AP_BROWSER_ERRORS,
  AP_VOILATION_WARNINGS,
  PROCTORING_OPTIONS,
} from "../constatnts/auto-procter-const";
import { fetchAutoProctorHashedTestAttemptId } from "../action/auto-proctor";
import {
  NEXT_AUTO_PROCTOR_CLIENT_ID,
  NEXT_AUTO_PROCTOR_ENABLE,
} from "@/constatnts/env-const";
// import { VapiDomEvents } from "@/constatnts/vapi-const";
import toast from "react-hot-toast";
import { addProcterEvidance } from "@/action/interview-action";

type ModaleConfig = {
  showModel: boolean;
  title: string;
  content: string;
  ctaText?: string;
  ctaAction?: () => void;
  onClose?: () => void;
};
/* eslint-disable no-unused-vars*/
type ProcterContextType = {
  initAutoProctor: (testAttemptId: string, callback?: any) => void;
  // startAutoProctor: () => void;
  isProctorStarted?: () => boolean;
  procterState?: ProctorState;
  stopProctering: () => void;
  modalConfig?: ModaleConfig;
  setModalConfig?: (m: ModaleConfig) => void;
};
/* eslint-enable no-unused-vars*/

export const ProcterContext =
  // @ts-ignore
  createContext<ProcterContextType>();

export enum ProctorState {
  /* eslint-disable no-unused-vars */
  INIT,
  /* eslint-disable no-unused-vars */
  BROWSER_PERMISSION_GRANTED,
  /* eslint-disable no-unused-vars */
  READY_TO_LOAD,
  /* eslint-disable no-unused-vars */
  LOADING_COMPLETED,
  /* eslint-disable no-unused-vars */
  SETUP_COMPLETED,
  /* eslint-disable no-unused-vars */
  PROCTING_STARTED,
  /* eslint-disable no-unused-vars */
  PROCTING_STOPED,
}

function ProcterContextProvider({ children }: { children: ReactNode }) {
  const proctorStateRef = useRef<ProctorState>(ProctorState.INIT);
  const instance = useRef<any>();
  // const { addKey, hasKey } = useCache(10_000); // 10sec
  const [procterState, setProctorState] = useState<ProctorState>(
    ProctorState.INIT
  );

  const [modalConfig, setModalConfig] = useState<ModaleConfig>({
    showModel: false,
    title: "",
    content: "",
  });

  const isAutoProcterEnabled = useCallback(() => {
    if (NEXT_AUTO_PROCTOR_ENABLE !== "true") {
      return false;
    }
    return true;
  }, []);

  const updateProctorState = useCallback(
    (state: ProctorState) => {
      setProctorState(state);
      proctorStateRef.current = state;
      console.log("[updateProctorState] Proctor State: ", ProctorState[state]);
    },
    [setProctorState]
  );

  useEffect(() => {
    if (!isAutoProcterEnabled()) {
      console.log("[useEffect] Auto Proctor is not enabled");
      return;
    }

    const apErrorEvent = (e: any) => {
      const errorCode = e.detail.errorCode;
      const error: any = AP_BROWSER_ERRORS[errorCode];
      if (error) {
        toast(
          (t: any) => (
            <span className="toast">
              <b>{error.message}</b>
              <button
                className="px-2 border text-[13px] rounded-md"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Reload
              </button>
            </span>
          ),
          {
            duration: 1_000_000,
          }
        );
        setModalConfig({
          showModel: true,
          title: error.message,
          content: error.action,
          ctaText: "Reload",
          ctaAction: () => {
            window.location.reload();
          },
          onClose: () => {
            setModalConfig({ showModel: false, title: "", content: "" });
          },
        });
      }
    };
    const apSuccessEvent = (e: any) => {
      const { successCode } = e.detail;
      switch (successCode) {
        case 2001:
          updateProctorState(ProctorState.BROWSER_PERMISSION_GRANTED);
          break;
        case 2002:
          updateProctorState(ProctorState.READY_TO_LOAD);
          break;
        case 2003:
          updateProctorState(ProctorState.LOADING_COMPLETED);
          break;
      }
    };

    const apEvidenceEvent = (e: any) => {
      const testAttemptID = instance.current?.testAttemptId;
      // const endSessionCall = `${testAttemptID}-end-session`;
      const evidenceCode: string = e?.detail?.evidenceCode as string;
      // if (localStorage.getItem(endSessionCall) !== null) {
      //   return;
      // }

      if (
        Object.prototype.hasOwnProperty.call(
          AP_VOILATION_WARNINGS,
          evidenceCode
        )
      ) {
        // if (hasKey(evidenceCode)) return;
        // addKey(evidenceCode);
        // @ts-ignore
        const evidence = AP_VOILATION_WARNINGS[evidenceCode];
        // if (!evidence?.voilation) return;
        // const key = `${testAttemptID}-voilation-${evidenceCode}`;
        // const messageIndex = Number(localStorage.getItem(key) || 0);
        // let message = "";
        // let endSession = false;
        // if (evidence?.messages?.length <= messageIndex) {
        //   // localStorage.setItem(endSessionCall, "true");
        //   // endSession = true;
        // } else {
        //   message = evidence?.messages[messageIndex];
        // }

        /// ship event to backend...
        // const event = new CustomEvent(VapiDomEvents.SPEAK_ASSISTANT, {
        //   detail: {
        //     title: evidence?.title,
        //     testAttemptID,
        //     evidence: e?.detail,
        //     voilation: evidence?.voilation,
        //     capturedAt: new Date(),
        //   },
        // });
        // document.dispatchEvent(event);
        addProcterEvidance({
          interviewId: testAttemptID,
          evidence: {
            title: evidence?.title,
            evidence: e?.detail,
            voilation: evidence?.voilation,
            capturedAt: new Date(),
          },
        });
      }
    };

    const apSetupComplete = (_e: any) => {
      updateProctorState(ProctorState.SETUP_COMPLETED);
    };

    const apMonitoringStarted = (_e: any) => {
      updateProctorState(ProctorState.PROCTING_STARTED);
    };

    const apMonitoringStopped = (_e: any) => {
      updateProctorState(ProctorState.PROCTING_STOPED);
    };

    window.addEventListener("apErrorEvent", apErrorEvent);
    window.addEventListener("apSuccessEvent", apSuccessEvent);
    window.addEventListener("apMonitoringStarted", apMonitoringStarted);
    window.addEventListener("apSetupComplete", apSetupComplete);
    window.addEventListener("apEvidenceEvent", apEvidenceEvent);
    window.addEventListener("apMonitoringStopped", apMonitoringStopped);

    return () => {
      window.removeEventListener("apErrorEvent", apErrorEvent);
      window.removeEventListener("apEvidenceEvent", apEvidenceEvent);
      window.removeEventListener("apMonitoringStarted", apMonitoringStarted);
      window.removeEventListener("apSetupComplete", apSetupComplete);
      window.removeEventListener("apSuccessEvent", apSuccessEvent);
      window.removeEventListener("apMonitoringStopped", apMonitoringStopped);
    };
  }, [updateProctorState]);

  const initAutoProctor = useCallback(
    async (testAttemptId: string, userDetails: any) => {
      try {
        if (!isAutoProcterEnabled()) {
          return Promise.resolve(false);
        }
        console.log("[initAutoProctor] initializing auto proctor... ");

        if (proctorStateRef.current !== ProctorState.INIT) {
          return Promise.resolve(false);
        }

        const clientId = NEXT_AUTO_PROCTOR_CLIENT_ID;
        const hashedTestAttemptId =
          await fetchAutoProctorHashedTestAttemptId(testAttemptId);
        /* eslint-disable no-undef */ // @ts-ignore
        let apInst = new AutoProctor({
          testAttemptId,
          clientId,
          hashedTestAttemptId,
        });
        instance.current = apInst;
        await apInst.setup({ ...PROCTORING_OPTIONS, userDetails });
        await apInst.start();
        console.log("[initAutoProctor] Auto Proctor starting...");
        return Promise.resolve(true);
      } catch (error) {
        console.log(error);
      }
    },
    [updateProctorState, isAutoProcterEnabled]
  );

  const stopProctering = useCallback(async () => {
    if (
      instance.current &&
      instance.current.stop &&
      proctorStateRef.current === ProctorState.PROCTING_STARTED
    ) {
      console.log("[stopProctering] Stopping Auto Proctor...");
      await instance.current.stop();
    }
  }, []);

  const isProctorStarted = () => {
    return instance.current?.isApTestStarted;
  };

  return (
    <ProcterContext.Provider
      value={{
        isProctorStarted,
        initAutoProctor,
        procterState,
        stopProctering,
        modalConfig,
        setModalConfig,
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
