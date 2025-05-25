import React, { ReactNode } from "react";
import clsx from "clsx";

import Close from "./icons/Close";
import Button from "./Button";

interface ModalPopupProps {
  className?: string;
  children: ReactNode;
  height?: number;
  title?: ReactNode;
  onClose?: () => void;
  open?: boolean;
  ctaText?: string;
  ctaDisabled?: boolean;
  ctaAction?: () => void;
}

function ModalPopup({
  className,
  children,
  title,
  onClose,
  ctaAction,
  ctaText,
  ctaDisabled = false,
}: ModalPopupProps) {
  const closePopup = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="z-40 absolute w-full top-0 right-0 h-screen bg-white/5 backdrop-blur-sm"></div>

      <div
        className={clsx(
          "absolute z-50 bg-white mx-auto top-[20%] w-[600px] rounded-3xl shadow-[0_1px_2px_0_rgba(60,_64,_67,_.3),_0_2px_6px_2px_rgba(60,_64,_67,_.15)] backdrop-blur-md border-3 border-red-600",
          className
        )}
      >
        {title && (
          <div className="flex items-center text-meet-black pt-3 pl-6 pb-0 pr-3">
            <div className="text-lg leading-6 grow my-[15px] tracking-normal">
              {title}
            </div>
            <button
              onClick={closePopup}
              className="bg-transparent hover:bg-[#0000000a] rounded-full"
            >
              <div className="w-12 h-12 p-3">
                <Close />
              </div>
            </button>
          </div>
        )}
        <div className="text-sm">{children}</div>

        {ctaAction && ctaText && (
          <div className=" flex justify-center pb-4 px-4">
            <Button
              size="sm"
              className={clsx("text-sm w-full")}
              onClick={() => {
                closePopup();
                ctaAction();
              }}
              rounding="lg"
              disabled={!ctaAction || ctaDisabled}
            >
              {ctaText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalPopup;
