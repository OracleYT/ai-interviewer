"use client";
import useScreenWidth from "@/hooks/useScreenWidth";

export const MobileMessageProvider = ({ children }: any) => {
  const screenWidth = useScreenWidth();

  return (
    <>
      {screenWidth < 768 ? (
        <div className="flex flex-col justify-center items-center border h-full">
        <h1 className="text-3xl font-bold text-center">
          This is a Desktop only app
        </h1>
        <p className="text-center">
          This app is not optimized for mobile view. Please use a desktop or
          tablet for better experience.
        </p>
      </div>
      ) : (
        children
      )}
    </>
  );
};
