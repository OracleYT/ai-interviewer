'use client';
import React from "react";
import Card from "@/components/Card";
import { useAuth } from "@/hooks/useAuth";

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

function setting() {
  const {user} = useAuth();
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
                Settings
              </h3>
            </div>
          </div>
          <span className="text-[#101010]/50">{user.email}</span>
        </div>
        <div className="border-[0.5px] border-[#DEDEDE] mt-13"></div>

        <div className="flex flex-col gap-4 mt-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#32A7E2] rounded-full"></div>
            <div>
              <p className="text-[#273240] font-medium">Contact Us</p>
              <span className="text-[#404852]/50 text-sm">mail: support@gmail.com</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#B548C6] rounded-full"></div>
            <div>
              <p  className="text-[#273240] font-medium">Log Out</p>
              <span className="text-[#404852]/50 text-sm">mail: support@gmail.com</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#FF8700] rounded-full"></div>
            <div>
              <p  className="text-[#273240] font-medium">Privacy and T&C</p>
              <span className="text-[#404852]/50 text-sm">Click here</span>
            </div>
          </div>
        </div>
      </div>
      {/* right container */}
      <Card
        background="#F9FAFC"
        height="100%"
        width="30%"
        className="rounded-r-[30px] flex flex-col justify-between items-center py-10"
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
      </Card>
    </Card>
  );
}

export default setting;
