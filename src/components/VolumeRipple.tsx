import React from "react";

const VolumeRipple: React.FC<any> = ({ volumeLevel, children }: any) => {
  return (
    <div className={`w-full h-full flex items-center justify-center`}>
      <div
        className={`w-fit h-fit rounded-full border duration-300`}
        style={{ padding: `${volumeLevel * 60}px ${volumeLevel * 60}px` }}
      >
        <div
          className={`w-fit h-fit rounded-full bg-[#1d1d1d]/30 duration-300`}
          style={{ padding: `${volumeLevel * 50}px ${volumeLevel * 50}px` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default VolumeRipple;
