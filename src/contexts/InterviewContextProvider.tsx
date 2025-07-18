"use client";
import React, { createContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { getInterviewDetails, getInterviews } from "@/action/interview-action";
import dayjs from "dayjs";

type InterviewContextType = {
  interview?: any;
  errMessage?: string;
  message?: string;
  fetchingInterview?: boolean;
  fetchInterviewData?: () => void;
  startRedirect?: boolean;
  setStartRedirect?: (value: boolean) => void;
};

type InterviewDetailsContextType = {
  interviewDetails?: any;
  errMessage?: string;
  fetchInterviewDetails?: (interviewId: string) => void;
  fetchingInterviewDetails?: boolean;
};
//@ts-ignore
const InterviewContext = createContext<InterviewContextType>();
//@ts-ignore
const InterviewDetailsContext = createContext<InterviewDetailsContextType>();

export const useInterview = () => {
  const context = React.useContext<InterviewContextType>(InterviewContext);
  if (context === undefined) {
    throw new Error("useInterview must be used within a InterviewProvider");
  }
  return context;
};

export const useInterviewDetails = () => {
  const context = React.useContext<InterviewDetailsContextType>(
    InterviewDetailsContext
  );
  if (context === undefined) {
    throw new Error(
      "useInterviewDetails must be used within a InterviewProvider"
    );
  }
  return context;
};

export const InterviewContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { userId, user } = useAuth();
  const [interview, setInterview] = useState<any>();
  const [interviewDetails, setInterviewDetails] = useState<any>();
  const [errMessage, setErrMessage] = useState<string>();
  const [startRedirect, setStartRedirect] = useState<boolean>(false);

  const [errMessage2, setErrMessage2] = useState<string>();
  const [message, setMessage] = useState<string>("");
  const [fetchingInterview, setFetchingInterview] = useState<boolean>();
  const [fetchingInterviewDetails, setFetchingInterviewDeatils] =
    useState<boolean>();

  useEffect(() => {
    fetchInterviewData();
  }, [
    user,
    setInterview,
    setErrMessage,
    setMessage,
    setFetchingInterview,
    setInterviewDetails,
    setErrMessage2,
    setFetchingInterviewDeatils,
  ]);

  const fetchInterviewDetails = (interviewId?: string) => {
    if (!interviewId) {
      return;
    }

    setErrMessage2("");
    setFetchingInterviewDeatils(true);
    getInterviewDetails(interviewId)
      .then((response: any) => {
        if (response.success && response.data) {
          setInterviewDetails(response.data);
        } else {
          setErrMessage2(response.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching interview details:", error);
        setErrMessage2("Error fetching interview details");
      })
      .finally(() => {
        setFetchingInterviewDeatils(false);
      });
  };

  const fetchInterviewData = () => {
    if (!userId) {
      return;
    }
    setErrMessage("");
    setMessage("");
    setFetchingInterview(true);
    getInterviews(userId)
      .then((response: any) => {
        if (response.success && response.data) {
          if (response?.data?.length === 0) {
            setMessage("No interviews found");
          } else {
            const _interview = parseInterviewData(response.data);
            setInterview(_interview);
            fetchInterviewDetails(_interview.id);
          }
        } else {
          setErrMessage(response.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching interviews:", error);
        setErrMessage("Error fetching interviews");
      })
      .finally(() => {
        setFetchingInterview(false);
      });
  };

  return (
    <InterviewContext.Provider
      value={{
        interview,
        errMessage,
        message,
        fetchingInterview,
        fetchInterviewData,
        startRedirect,
        setStartRedirect,
      }}
      >
      <InterviewDetailsContext.Provider
        value={{
          interviewDetails,
          errMessage: errMessage2,
          fetchInterviewDetails,
          fetchingInterviewDetails,
        }}
      >
        {children}
      </InterviewDetailsContext.Provider>
    </InterviewContext.Provider>
  );
};

function parseInterviewData(interviews: any[]) {
  const interview: any = interviews[0] || {};

  if (
    interview?.status === "PENDING" &&
    dayjs().isAfter(dayjs(interview?.expiryDate).add(1, "day"))
  ) {
    interview["status"] = "EXPIRED";
  }

  interview["expiryDate"] =
    dayjs(interview?.expiryDate).format("DD-MM-YYYY") || "N/A";

  return interview;
}
