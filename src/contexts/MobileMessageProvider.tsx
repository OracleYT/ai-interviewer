"use client";
import useScreenWidth from "@/hooks/useScreenWidth";
import { useEffect, useState } from "react";

export const MobileMessageProvider = ({ children }: any) => {
  const screenWidth = useScreenWidth();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    if (screenWidth < 768) {
      setIsSmallScreen(true);
    }
  }, [screenWidth]);

  return (
    <>
      {isSmallScreen ? (
        <div className="flex flex-col justify-center items-center border h-full gap-4">
          <h1 className="text-3xl font-bold text-center">
            This is a Desktop only app
          </h1>
          <p className="text-center">
            This app is not optimized for mobile view. Please use a desktop or
            tablet for better experience.
          </p>

          <p className="text-center mt-5">
            If you are using a desktop or tablet, please rotate your device to
            landscape mode.
          </p>
          
          <button
            className="bg-blue-500 hover:underline text-black text-2xl px-4 py-2 rounded mt-4"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      ) : (
        children
      )}
    </>
  );
};
