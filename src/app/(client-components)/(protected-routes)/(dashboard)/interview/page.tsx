"use client";

import React from "react";
import Card from "@/components/Card";
import { INTERVIEW_INSTRUCTIONS, UNIVERSITY_NAME } from "@/constatnts/content-const";
import RightSidePannel from "@/components/RightSidePannel";

function Interview() {

  return (
    <Card
      background="#ffffff"
      width="100%"
      borderRadius="30px"
      className="flex overflow-y-scroll element border"
    >
      {/*left container */}
      <div className="pt-5 px-[64px] w-[70%] overflow-y-auto element max-h-[92vh]">
        <div className="flex flex-col gap-4 my-3">
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl text-[#262A41] font-bold">
              It&rsquo; s Time: Your PRE-CAS Interview is Just a Click Away{" "}
            </h3>
            <span className="text-sm text-[#262A41]/80">
              This is your final step toward securing your place at {UNIVERSITY_NAME}.
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
            <ul className="flex flex-col gap-2 pl-3">
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

          <p className="text-lg text-[#262A41]">Mock Interview</p>
          <div className="border-[0.5px] border-[#DEDEDE]"></div>
          <p className="text-[14px] text-[#404852] mt-2">
            The best way to prepare for the interview is by practicing. Try
            doing a mock interview with a friend, family member, or mentor. You
            can also record yourself to analyze how you&rsquo; re doing. Here
            are a few tips for your mock interview:
          </p>
          <div className="border-[0.5px] my-2 border-[#DEDEDE]"></div>
          <ol className="flex flex-col gap-2 pl-3">
            <li className="text-[#404852]/90 text-sm font-medium list-disc">
              Speak clearly and confidently.
            </li>
            <li className="text-[#404852]/90 text-sm font-medium list-disc">
              Be mindful of your body language.
            </li>
            <li className="text-[#404852]/90 text-sm font-medium list-disc">
              Take your time to think before answering.
            </li>
          </ol>

          <p className="mt-10 text-sm text-[#262A41]">
            You are all set for your PRE-CAS interview. Please tap the button
            below to begin your interview and take the next step towards
            securing your place at {`${UNIVERSITY_NAME}`}.
          </p>
        </div>
      </div>
      <RightSidePannel />
    </Card>
  );
}

export default Interview;
