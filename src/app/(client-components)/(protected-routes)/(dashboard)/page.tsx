import Card from "@/components/Card";
import StartInterviewCard from "@/components/StartInterviewCard";
import React from "react";

const steps = [
  {
    step: "1",
    title: "Verify your Documents",
    description: "Submit and Verify your documents",
    colour: "bg-[#32A7E2]",
  },
  {
    step: "2",
    title: "Prepare for Round 1",
    description: "Go to Learn Section to Start preparation",
    colour: "bg-[#B548C6]",
  },
  {
    step: "3",
    title: "Give Online CAS Round 1",
    description: "Be confident, and Legitimate",
    colour: "bg-[#FF8700]",
  },
  {
    step: "4",
    title: "Repeat for Round 2",
    description: "Be confident, and Legitimate",
    colour: "bg-[#DC3434]",
  },
];

function Screenpage() {
  return (
    <Card
      background="#ffffff"
      height="100%"
      width="100%"
      borderRadius="30px"
      className="flex"
    >
      {/*left container */}
      <div className="p-[80px] w-[70%]">
        <div className="flex flex-col gap-4 my-3">
          <div>
            <div className="flex justify-between">
              <h3 className="text-[40px] text-[#262A41] font-semibold">
                CAS Round 1
              </h3>
              <span className="bg-[#31BA96] px-4 place-content-center h-[31px] rounded-full text-[#ffffff] text-xs font-semibold">
                Completed
              </span>
            </div>
          </div>
          <span className="text-[#101010]/50">01 - 25 March, 2025</span>
        </div>
        <div>
          {/* About */}
          <div className="my-6">
            <p className="text-lg text-[#262A41]">About</p>
            <div className="border-[0.5px] border-[#DEDEDE]"></div>
            <p className="text-xs text-[#404852]/70">
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim.eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim.eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim.eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim.eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim.eiusmod tempor incididunt ut labore et dolore.
            </p>
          </div>
          {/* steps */}
          <div className="flex flex-col gap-4">
            <p className="text-lg text-[#262A41]">Steps</p>
            <div className="border-[0.5px] border-[#DEDEDE]"></div>
            <div className="flex flex-col gap-4">
              {steps?.map((step) => (
                <div className="flex items-center gap-7">
                  <div
                    className={`h-12 w-12 rounded-full place-content-center text-center  text-[#ffffff] text-lg font-semibold ${step.colour}`}
                  >
                    {step.step}
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[#273240] text-base font-medium">
                      {step.title}
                    </p>
                    <span className="text-[#404852]/50 text-sm">
                      {step.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* right container */}
      <Card
         background="#F9FAFC"
         height="100%"
         width="30%"
         className="rounded-r-[30px] flex flex-col justify-between items-center py-10 "
      >
        <div>
          <div className="flex flex-col items-center gap-4">
            <p className="text-[20px] text-[#262A41]">
              Prepare for CAS Round 1
            </p>
            <div>
              <Card
                background="#EDF0F6"
                borderRadius="15px"
                height="70px"
                width="245px"
                padding="15px"
                className="mt-8"
              >
                <div className="flex justify-between">
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
        </div>
            <StartInterviewCard/>
      </Card>
    </Card>
  );
}

export default Screenpage;
