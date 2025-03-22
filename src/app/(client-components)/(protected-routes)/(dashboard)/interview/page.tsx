"use client";

import React from "react";
import Card from "@/components/Card";
import StartInterviewCard from "@/components/StartInterviewCard";
import {
  INTERVIEW_ABOUT_MAP,
  INTERVIEW_INSTRUCTIONS,
} from "@/constatnts/content-const";
import { useInterview } from "@/contexts/InterviewContextProvider";
import { useAuth } from "@/contexts/AuthProvider";

function Interview() {
  const { interview, fetchingInterview: loading } = useInterview();
  const { isDocUploaded } = useAuth();

  return (
    <Card
      background="#ffffff"
      width="100%"
      borderRadius="30px"
      className="flex overflow-y-scroll element border"
    >
      {/*left container */}
      <div className="pt-5 px-[64px] w-[70%] h-full">
        <div className="flex flex-col gap-4 my-3">
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl text-[#262A41] font-bold">
              It&rsquo; s Time: Your PRE-CAS Interview is Just a Click Away{" "}
            </h3>
            <span className="text-sm text-[#262A41]/80">
              This is your final step toward securing your place at Ulster
              University.
            </span>
          </div>
        </div>
        <div>
          {/* Instructions */}
          <div className="my-6 flex flex-col gap-2">
            <p className="text-lg text-[#262A41]">
              Important Instructions for Your PRE-CAS Interview
            </p>
            <div className="border-[0.5px] border-[#DEDEDE]"></div>
            <ul className="flex flex-col gap-2">
              {INTERVIEW_INSTRUCTIONS.map((item, index) => (
                <li
                  key={index}
                  className="text-[#404852]/90 text-sm font-medium list-disc"
                >
                  {item.tip}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-10 text-base font-semibold text-[#262A41]">
            You are all set for your PRE-CAS interview. Please tap the button
            below to begin your interview and take the next step towards
            securing your place at Ulster University.
          </p>
        </div>
      </div>
      {/* right container */}
      <Card
        background="#F9FAFC"
        width="30%"
        padding="40px"
        className="rounded-r-[30px] flex flex-col justify-between items-center overflow-y-scroll element min-h-[600px]"
      >
        <div className="flex flex-col items-center gap-4">
          <p className="text-[20px] text-[#262A41]">Prepare for CAS Round 1</p>
          <div>
            <Card
              background="#EDF0F6"
              borderRadius="15px"
              padding="15px"
              className="mt-8"
            >
              <div className="flex justify-between items-center gap-7">
                <p className="text-[#273240] text-[13px] font-medium">
                  Interview Question Bank
                </p>
                <span className="text-[#273240] text-[11px]">PDF</span>
              </div>
              <span className="text-[#273240] text-[11px]">
                Click here &gt;
              </span>
            </Card>
          </div>
        </div>
        {!loading && (
          <StartInterviewCard
            ctaHref={`/meeting/${interview?.id}`}
            showCta={interview?.id && isDocUploaded}
          />
        )}
      </Card>
    </Card>
  );
}

export default Interview;
