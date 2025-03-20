"use client";

import { getInterviews } from "@/action/interview-action";
import Card from "@/components/Card";
import StartInterviewCard from "@/components/StartInterviewCard";
import { useAuth } from "@/hooks/useAuth";
import clsx from "clsx";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

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

const colorMap: any = {
  COMPLETED: "bg-[#31BA96]",
  PENDING: "bg-[#FF8700]",
  ONGOING: "bg-[#FF8700]",
  CANCELLED: "bg-[#DC3434]",
  EXPIRED: "bg-[#777777]",
};
function Page() {
  const { user } = useAuth();

  const [interview, setInterview] = useState<any>({
    title: "N/A",
    expiryDate: "N/A",
    status: "N/A",
  });

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user?.id) {
      getInterviews(user.id)
        .then((response) => {
          if (response.success) {
            const interview: any = response?.data?.at(0) || {};
            interview["status"] = interview?.status || "N/A";

            if (
              interview?.status === "PENDING" &&
              dayjs().add(3, "day").isAfter(dayjs(interview?.expiryDate))
            ) {
              interview["status"] = "EXPIRED";
            }

            interview["status_color"] =
              (interview?.status && colorMap[interview?.status]) ||
              "bg-[#FF8700]";

            interview["expiryDate"] =
              dayjs(interview?.expiryDate).format("DD-MM-YYYY hh:mm:a") ||
              "N/A";
            setInterview(interview);
          } else {
            console.error(response.message);
          }
        })
        .catch((error) => {
          console.error("Error fetching interviews:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user?.id]);

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
          <div className="flex justify-between">
            <h3 className="text-4xl text-[#262A41] font-semibold">
              {interview?.title}
            </h3>
            {interview?.status !== "N/A" && (
              <span
                className={clsx(
                  "bg-[#31BA96] px-4 place-content-center h-[31px] rounded-full text-[#ffffff] text-xs font-semibold",
                  interview?.status_color
                )}
              >
                {interview?.status}
              </span>
            )}
          </div>
          <span className="text-[#101010]/50">
            Interview deadline: {interview?.expiryDate}
          </span>
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
            <div className="flex flex-col gap-4 pb-2">
              {steps?.map((step) => (
                <div className="flex items-center gap-7" key={step.step}>
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

/// enable button only for ongoing or pending interview
// button click should redirect to the interview page
/// /meeting/{interview-id}/meeting

// interview lobby
// candidate data
// interviewer data
// interview data
