'use client';
import { createContext, ReactNode, useState } from 'react';

export const MEETING_ID_REGEX = /^[-0-9a-z]{10,}$/;

type AppContextType = {
  newMeeting: boolean;
  setNewMeeting: (newMeeting: boolean) => void;
};

type AppProviderProps = {
  children: ReactNode;
};

const initialContext: AppContextType = {
  newMeeting: false,
  setNewMeeting: () => null,
};

export const AppContext = createContext<AppContextType>(initialContext);

const AppProvider = ({ children }: AppProviderProps) => {
  const [newMeeting, setNewMeeting] = useState(false);

  return (
    <AppContext.Provider
      value={{
        newMeeting,
        setNewMeeting,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
