"use client";

import React from "react";
import Card from "@/components/Card";
import RightSidePannel from "@/components/RightSidePannel";

function Page() {
  return (
    <Card
      background="#ffffff"
      width="100%"
      borderRadius="30px"
      className="flex"
    >
      {/*left container */}
      <div className="pt-10 px-[64px] w-[70%] overflow-y-auto element max-h-[90vh]">
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
          <div className="mt-4 flex flex-col gap-2">
            <h4 className="text-lg font-semibold text-[#262A41]">
              Preparation Tips to Ace Your PRE-CAS Interview
            </h4>
            <div className="border-[0.5px] border-[#DEDEDE]"></div>
            <div className="flex flex-col gap-3 text-black">
              <div className="flex flex-col gap-1">
                <h6 className="text-lg text-black font-bold">
                  Research Thoroughly
                </h6>
                <li className="list-none text-sm">
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
                <li className="list-none text-sm">
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
                <li className="list-none text-sm">
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
                <li className="list-none text-sm">
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
                <li className="list-none text-sm">
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
                <li className="list-none text-sm">
                  It&rsquo; s important to be well-prepared but also flexible in
                  your responses.{" "}
                  <span className="font-bold"> Avoid sounding rehearsed</span>
                  engage naturally during the interview.
                </li>
              </div>

              <p className="text-black mt-4 text-sm">
                Remember, confidence, authenticity, and clarity in your
                responses will help you stand out and leave a positive
                impression during your PRE-CAS interview.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* right container */}
      <RightSidePannel />
    </Card>
  );
}

export default Page;
