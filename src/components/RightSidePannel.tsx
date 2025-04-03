import React from "react";
import StartInterviewCard from "./StartInterviewCard";
import Card from "./Card";
import { useInterview } from "@/contexts/InterviewContextProvider";
import { useAuth } from "@/contexts/AuthProvider";

function RightSidePannel() {
  const { isDocumentVerified, questionBankLink } = useAuth();
  const { interview } = useInterview();

  return (
    <Card
      background="#F9FAFC"
      width="30%"
      padding="40px"
      className="rounded-r-[30px] "
    >
      <div className="flex flex-col gap-13 justify-between items-center overflow-y-scroll element min-h-[600px] h-full">
        <div className="flex flex-col items-center justify-between gap-4">
          <p className="text-[20px] text-[#262A41]">Prepare for Interview</p>
          <a href={questionBankLink} target="_blank">
          <Card
            background="#EDF0F6"
            borderRadius="15px"
            padding="15px"
            className="flex flex-col gap-2 border"
          >
            <div className="flex justify-between items-center gap-7">
              <p className="text-sm text-[#273240] font-medium">
                Interview Question Bank
              </p>
              <span className="text-[#273240] text-[10px]">PDF</span>
            </div>
            <p className="text-[#273240] text-[11px]">
              To help you prepare, we&rsquo; ve compiled a list of common
              interview questions that may come up during your PRE-CAS
              interview. Be sure to review these and practice your answers to
              feel more confident and ready for your interview.
            </p>
          </Card>
          </a>
        </div>

        <StartInterviewCard
          title={"Ready to Start Your Interview?"}
          description={
            "Once you feel prepared and confident, you can proceed to the next step—your PRE-CAS interview. Click below to access the interview portal and begin the process:"
          }
          ctaHref={`/meeting/${interview?.id}`}
          isDocumentVerified={isDocumentVerified}
          interviewStatus={interview?.status}
          isInterviewExpired={interview?.status === "EXPIRED"}
          showCta={
            interview?.status !== "EXPIRED" &&
            interview?.id &&
            isDocumentVerified
          }
        />
      </div>
    </Card>
  );
}

export default RightSidePannel;
