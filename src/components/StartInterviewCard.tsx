import React from "react";
import Card from "./Card";
import Button from "./Button";
import Link from "next/link";

function StartInterviewCard() {
  return (
    <Card
      background="#EDF0F6"
      height="258px"
      width="250px"
      className="relative"
      borderRadius="15px"
    >
      <div className="absolute w-full -top-8">
        <div className="flex justify-between w-full px-5">
          <img src="/assets/box.svg" alt="box" />
          <img src="/assets/flowerpot.svg" alt="flowerpot" />
        </div>
      </div>
      <div className="flex flex-col justify-end gap-3 h-full p-5">
        <p className="text-[#273240] text-base font-semibold">
          Ready for the Round 1?
        </p>
        <span className="text-[#404852] text-xs leading-5">
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim.
        </span>
        <Link href={"/meeting/abc-abcd-abc"} className="border text-[#ffffff] text-center py-1 bg-[#101010] rounded-lg">Start Interview</Link>
      </div>
    </Card>
  );
}

export default StartInterviewCard;
