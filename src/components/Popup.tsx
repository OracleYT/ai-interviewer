import React, { forwardRef, ReactNode } from "react";
import clsx from "clsx";

import Close from "./icons/Close";
import Button from "./Button";

interface PopupProps {
  className?: string;
  children: ReactNode;
  height?: number;
  title?: ReactNode;
  onClose?: () => void;
  open?: boolean;
  ctaText?: string;
  ctaAction?: () => void;
}

const Popup = forwardRef<HTMLDivElement | null, PopupProps>(function Popup(
  {
    className,
    children,
    height = 305,
    title,
    onClose,
    open = false,
    ctaAction,
    ctaText,
  },
  ref = null
) {
  const closePopup = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {open && (
        <div className="z-40 absolute w-screen h-screen bg-white/5 backdrop-blur-sm"></div>
      )}
      <div
        ref={ref}
        className={clsx(
          open ? "block" : "hidden",
          `h-[${height}px]`,
          "z-50 bg-white absolute top-[35%] left-[35%] w-100 sm:w-90 rounded-3xl shadow-[0_1px_2px_0_rgba(60,_64,_67,_.3),_0_2px_6px_2px_rgba(60,_64,_67,_.15)] backdrop-blur-md",
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
      <div className="text-sm">
      {children}
      </div>

        {ctaAction && ctaText && (
          <div className="w-full flex justify-center pb-4 px-4">
            <Button
            size="sm"
            className="text-sm w-full"
            onClick={()=>{
              closePopup();
              ctaAction();
            }}
            rounding="lg"
            disabled={!ctaAction}
          >
            {ctaText}
          </Button>
          </div>
        )}
      </div>
    </>
  );
});

export default Popup;
