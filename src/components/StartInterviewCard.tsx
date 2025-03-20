import React from "react";
import Card from "./Card";
import Link from "next/link";

function StartInterviewCard({
  title,
  cta,
  description,
  showCta,
  ctaHref,
}: {
  title?: string;
  cta?: string;
  description?: string;
  showCta?: boolean;
  ctaHref?: string;
}) {
  return (
    <Card background="#EDF0F6" borderRadius="15px" className="relative pt-16">
      <div className="absolute w-full -top-8">
        <div className="flex justify-between w-full px-5">
          <img src="/assets/box.svg" alt="box" />
          <img src="/assets/flowerpot.svg" alt="flowerpot" />
        </div>
      </div>
      <div className="flex flex-col justify-end gap-3 h-full p-5">
        <p className="text-[#273240] text-base font-semibold">
          {title ? `Ready for ${title}?` : "Ready for the Interview ?"}
        </p>
        <span className="text-[#404852] text-xs leading-5">
          {description ??
            "Get ready for the interview by clicking the button below"}
        </span>
        {showCta && (
          <Link
            href={ctaHref!}
            className="border text-[#ffffff] text-center py-1 bg-[#101010] rounded-lg"
          >
            {cta ?? "Start Interview"}
          </Link>
        )}
      </div>
    </Card>
  );
}

export default StartInterviewCard;
