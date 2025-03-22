"use client";

import React from "react";
import Card from "@/components/Card";
import StartInterviewCard from "@/components/StartInterviewCard";
import { ABOUT_LIST } from "@/constatnts/content-const";
import { useInterview } from "@/contexts/InterviewContextProvider";

function Page() {
  const { interview } = useInterview();

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
          <div>
            <div className="flex justify-between">
              <h3 className="text-[40px] text-[#262A41] font-semibold">
                Learn
              </h3>
            </div>
          </div>
          <span className="text-[#101010]/50">6 days left to prepare</span>
        </div>
        <div>
          {/* About */}
          <div className="my-6 flex flex-col gap-2">
            <p className="text-lg text-[#262A41]">About the Interview</p>
            <div className="border-[0.5px] border-[#DEDEDE]"></div>
            <ul className="flex flex-col gap-2">
              {ABOUT_LIST.map((item, index) => (
                <li key={index} className="text-[#404852]/70 text-xs list-disc">
                  {item.description}
                </li>
              ))}
            </ul>
          </div>
          {/* steps */}
          <div className="flex flex-col gap-4">
            <p className="text-lg text-[#262A41]">Steps</p>
            <div className="border-[0.5px] border-[#DEDEDE]"></div>
            <div className="flex flex-col gap-4">Card</div>
          </div>
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
        {interview?.id && (
          <StartInterviewCard
            ctaHref={`/meeting/${interview?.id}`}
            showCta={interview?.id}
          />
        )}
      </Card>
    </Card>
  );
}

export default Page;
