import React from "react";

const VolumeRipple: React.FC<any> = ({ volumeLevel, children }: any) => {
  return (
    <div className={`w-full h-full flex items-center justify-center`}>
      <div
        className={`w-fit h-fit rounded-full bg-[#000000]/30`}
        style={{ padding: `${volumeLevel * 50}px ${volumeLevel * 50}px` }}
      >
        {children}
      </div>
    </div>
  );
};

export default VolumeRipple;
