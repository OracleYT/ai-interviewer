import Card from "@/components/Card";
import StartInterviewCard from "@/components/StartInterviewCard";
import React from "react";

const about = [
  {
    description:
      "eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.eiusmod tempor incididunt ut labore et dolore",
  },
  {
    description:
      " magna aliqua. Ut enim ad minim.eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ",
  },
  {
    description:
      "ad minim.eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad mi",
  },
  {
    description: "nim.eiusmod",
  },
  {
    description:
      "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.eiusmod tempor incididunt ut l",
  },
  {
    description: "abore et dolore.",
  },
];

function Interview() {
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
              {about.map((item, index) => (
                <li key={index} className="text-[#404852]/70 text-xs list-disc">
                  {item.description}
                </li>
              ))}
            </ul>
          </div>
          {/* steps */}
          <div className="flex flex-col gap-4">
            <p className="text-lg text-[#262A41]">Things to Remember</p>
            <div className="border-[0.5px] border-[#DEDEDE]"></div>
            <ul className="flex flex-col gap-2">
              {about.map((item, index) => (
                <li key={index} className="text-[#404852]/70 text-xs list-disc">
                  {item.description}
                </li>
              ))}
            </ul>
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
        <div className="flex flex-col gap-2 w-[250px]">
          <p className="text-[#262A41] text-[20px]">Things to Remember</p>
          {about.map((item, index) => (
            <li
              key={index}
              className="text-[#273240] text-[13px] font-medium list-disc"
            >
              {item.description}
            </li>
          ))}
        </div>
        <StartInterviewCard />
      </Card>
    </Card>
  );
}

export default Interview;
