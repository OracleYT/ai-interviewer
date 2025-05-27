"use client";

import React, { ReactNode, useState } from "react";
import Card from "./Card";
import Link from "next/link";
import ModalPopup from "./ModalPopup";
import { IMPORANT_INSTRUCTIONS } from "@/constatnts/interview-const";

function StartInterviewCard({
  title,
  cta,
  description,
  showCta,
  ctaHref,
  interviewStatus,
  className,
  isDocumentVerified,
  isInterviewExpired,
}: {
  title?: string;
  cta?: string;
  description?: string;
  showCta?: boolean;
  ctaHref?: string;
  className?: string;
  isDocumentVerified?: boolean;
  isInterviewExpired?: boolean;
  interviewStatus?: string;
}) {
  const [modelContent, setModalContent] = useState<ReactNode | null>(null);

  const startInterview = (e: any) => {
    e.preventDefault();
    if (isInterviewExpired) {
      return;
    }
    if (!isDocumentVerified) {
      return;
    }
    if (ctaHref) {
      window.location.href = ctaHref;
    }
  };

  function JoinCallModal({ startCall }: any) {
    const [isChecked, setIsChecked] = useState(false);

    return (
      <ModalPopup
        open={true}
        title="⚠️ Important Instructions"
        ctaText="Join call"
        ctaAction={() => {
          if (isChecked) startCall && startCall();
        }}
        onClose={() => setModalContent(null)}
        ctaDisabled={!isChecked}
      >
        <div className="text-center p-4">
          <ol className="text-left space-y-4 px-6 mb-6">
            {IMPORANT_INSTRUCTIONS.map((instruction, index) => (
              <li key={index} className="text-sm text-gray-700 list-decimal">
                {instruction}
              </li>
            ))}
          </ol>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            I have read and agree to the instructions above.
          </label>
        </div>
      </ModalPopup>
    );
  }

  const onStartClick = async () => {
    setModalContent(<JoinCallModal startCall={startInterview} />);
  };

  return (
    <>
      <div className="absolute top-0 left-0 -z-50 w-full h-full">{modelContent}</div>
      <Card
        background="#EDF0F6"
        borderRadius="15px"
        className={`relative pt-16 ${className}`}
      >
        <div className="absolute w-full -top-8">
          <div className="flex justify-between w-full px-5">
            <img src="/assets/box.svg" alt="box" />
            <img src="/assets/flowerpot.svg" alt="flowerpot" />
          </div>
        </div>
        <div className="flex flex-col justify-end gap-3 h-full p-5">
          <p className="text-[#273240] text-base font-semibold">
            {title ?? "Ready to Begin?"}
          </p>
          <span className="text-[#404852] text-xs leading-5">
            {description ??
              "Once you're prepared and feel confident about your interview, click on the 'Start Interview' button below and take the next step toward making your dream of studying abroad a reality."}
          </span>
          {["PENDING", "ONGOING"].includes(interviewStatus!) ? (
            <div>
              {!showCta ? (
                <span
                  className="border text-[#ffffff] text-center py-1 bg-[#101010]/60 rounded-lg cursor-not-allowed px-4"
                  title={
                    isDocumentVerified
                      ? "Interview Expired"
                      : "Document not verified"
                  }
                >
                  Start Interview
                </span>
              ) : (
                <Link
                  href="#"
                  onClick={onStartClick}
                  className="border text-[#ffffff] text-center py-1 bg-[#101010] rounded-lg px-4 cursor-pointer"
                >
                  {cta ?? "Start Interview"}
                </Link>
              )}
            </div>
          ) : (
            <span className="text-[#404852] text-xs leading-5">
              No Active Interview
            </span>
          )}
        </div>
      </Card>
    </>
  );
}

export default StartInterviewCard;
