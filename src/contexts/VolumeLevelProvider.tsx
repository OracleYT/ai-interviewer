"use client";
import React, { useState, ReactNode, createContext } from "react";

export const VolumeLevelContext = createContext<any>(null);

function VolumeLevelProvider({ children }: { children: ReactNode }) {
  const [volumeLevel, setVolumeLevel] = useState<number | null>();

  return (
    <VolumeLevelContext.Provider value={{ volumeLevel, setVolumeLevel }}>
      {children}
    </VolumeLevelContext.Provider>
  );
}

export default VolumeLevelProvider;
