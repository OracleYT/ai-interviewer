import React from "react";

export const STATUS_COLOR_MAP: any = {
  COMPLETED:{
    color: "bg-[#2ECC71]",
    text_color: "text-[#ffffff]",
    text: "Completed"
  },
  PENDING:{
    color: "bg-[#FF8700]",
    text_color: "text-[#ffffff]",
    text: "Pending"
  },
  ONGOING:{
    color: "bg-[#BAD1FF]",
    text_color: "text-[#ffffff]",
    text: "Ongoing"
  },
  CANCELLED:{
    color: "bg-[#DC3434]",
    text_color: "text-[#000000]",
    text: "Cancelled"
  },
  EXPIRED:{
    color: "bg-[#E5E7EB]",
    text_color: "text-[#333333]",
    text: "Expired"
  }
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`px-4 place-content-center h-[31px] rounded-full text-xs font-semibold ${STATUS_COLOR_MAP[status]?.color} ${STATUS_COLOR_MAP[status].text_color} `}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
