"use client";

import React from "react";
import Card from "@/components/Card";
import StartInterviewCard from "@/components/StartInterviewCard";
import { useInterview } from "@/contexts/InterviewContextProvider";
import { useAuth } from "@/contexts/AuthProvider";

function Page() {
  const { interview } = useInterview();
  const {isDocUploaded} = useAuth(); 

  return (
    <Card
      background="#ffffff"
      width="100%"
      borderRadius="30px"
      className="flex"
    >
      {/*left container */}
      <div className="pt-5 px-[64px] w-[70%] overflow-y-scroll max-h-screen element">
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl text-[#262A41] font-bold">
            Learn - PRE-CAS Interview Preparation
          </h3>
          <span className="text-sm text-[#262A41]/80">
            Your final step toward securing your place at Ulster University.
          </span>
        </div>
        <div>
          {/* Preparation Tips to Ace Your PRE-CAS Interview
           */}
          <div className="my-6 flex flex-col gap-2">
            <h4 className="text-lg font-semibold text-[#262A41]">
              Preparation Tips to Ace Your PRE-CAS Interview
            </h4>
            <div className="border-[0.5px] border-[#DEDEDE]"></div>
            <div className="flex flex-col gap-3 text-black">
              <div className="flex flex-col gap-1">
                <h6 className="text-lg text-black font-bold">
                  Research Thoroughly
                </h6>
                <li className="list- text-sm">
                  Study{" "}
                  <span className="font-bold">the country, your course</span>,
                  and <span className="font-bold"> the university</span> in
                  detail to showcase your genuine interest and preparedness.
                </li>
              </div>
              <div className="flex flex-col gap-1">
                <h6 className="text-[18px] text-black font-bold">
                  Be Confident & Honest
                </h6>
                <li className="list-disc text-sm">
                  Answer questions{" "}
                  <span className="font-bold">confidently</span>, and{" "}
                  <span className="font-bold"> honestly.</span> Give
                  well-prepared responses that align with your goals but remain
                  truthful.
                </li>
              </div>
              <div className="flex flex-col gap-1">
                <h6 className="text-lg text-black font-bold">
                  Justify Your Intentions to Return
                </h6>
                <li className="list-disc text-sm">
                  Clearly explain your{" "}
                  <span className="font-bold">
                    intentions to return to India
                  </span>{" "}
                  after completing your course. Show how the skills and
                  knowledge gained will benefit your home country.
                </li>
              </div>
              <div className="flex flex-col gap-1">
                <h6 className="text-lg text-black font-bold">
                  Be Honest & Genuine{" "}
                </h6>
                <li className="list-disc text-sm">
                  Authenticity matters—always answer{" "}
                  <span className="font-bold">truthfully</span>
                  and and stay true to yourself. Genuine responses leave a
                  lasting impression.
                </li>
              </div>
              <div className="flex flex-col gap-1">
                <h6 className="text-lg text-black font-bold">
                  Stay Calm & Confident
                </h6>
                <li className="list-disc text-sm">
                  Take a deep breath,
                  <span className="font-bold">stay calm</span>, and{" "}
                  <span className="font-bold">maintain confidence</span> This is
                  your opportunity to showcase your passion for studying abroad.
                </li>
              </div>
              <div className="flex flex-col gap-1">
                <h6 className="text-lg text-black font-bold">
                  Be Prepared, Not Over-Prepared{" "}
                </h6>
                <li className="list-disc text-sm">
                  It&rsquo; s important to be well-prepared but also flexible in
                  your responses.{" "}
                  <span className="font-bold"> Avoid sounding rehearsed</span>
                  engage naturally during the interview.
                </li>
              </div>

              <p className="text-base text-black font-extrabold mt-9">
                Remember, confidence, authenticity, and clarity in your
                responses will help you stand out and leave a positive
                impression during your PRE-CAS interview.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* right container */}
      <Card
        background="#F9FAFC"
        width="30%"
        padding="40px"
        className="rounded-r-[30px] flex flex-col gap-10 justify-between items-center overflow-y-scroll element min-h-[600px] max-h-screen"
      >
        {/* <div className="flex flex-col justify-between overflow-scroll element border"> */}
          <div className="flex flex-col items-center justify-between gap-4">
            <p className="text-[20px] text-[#262A41]">
              Prepare for CAS Round 1
            </p>
            <Card
              background="#EDF0F6"
              borderRadius="15px"
              padding="15px"
              className="flex flex-col gap-2 border"
            >
              <div className="flex justify-between items-center gap-7">
                <p className="text-[#273240] font-medium">
                  Interview Question Bank
                </p>
                <span className="text-[#273240] text-[11px]">PDF</span>
              </div>
              <p className="text-[#273240] text-[11px]">
                To help you prepare, we&rsquo; ve compiled a list of common
                interview questions that may come up during your PRE-CAS
                interview. Be sure to review these and practice your answers to
                feel more confident and ready for your interview.
              </p>
              <span className="text-[#273240] text-[12px] font-medium">
                Click here &gt;
              </span>
            </Card>
            <div>
              <h6 className="text-sm font-medium">Mock Interview:</h6>
              <p className="text-[11px] text-[#404852]">
                The best way to prepare for the interview is by practicing. Try
                doing a mock interview with a friend, family member, or mentor.
                You can also record yourself to analyze how you&rsquo; re doing.
                Here are a few tips for your mock interview:
              </p>
              <ul className="text-[11px] text-[#404852]">
                <li> 1. Speak clearly and confidently.</li>
                <li>2. Be mindful of your body language.</li>
                <li>2. Take your time to think before answering.</li>
              </ul>
            </div>
          </div>
            { (
              <StartInterviewCard
                title={"Ready to Start Your Interview?"}
                description={
                  "Once you feel prepared and confident, you can proceed to the next step—your PRE-CAS interview. Click below to access the interview portal and begin the process:"
                }
                ctaHref={`/meeting/${interview?.id}`}
                showCta={interview?.id && isDocUploaded}
                
              />
            )}
        {/* </div> */}
      </Card>
    </Card>
  );
}

export default Page;
