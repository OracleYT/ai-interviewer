"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, ReactNode, useEffect, useMemo } from "react";
import { fetchUserById, verifyCredentials } from "@/action/auth-action";

export type AuthContextType = {
  user: any;
  isAuthanticated: boolean;
  setUser: (user: any) => void;
  setIsAuthanticated: (isAuthanticated: boolean) => void;
  login: (creds: { username: string; password: string }) => Promise<any>;
  logout: () => void;
  userId?: string;
  reloadUserData: () => Promise<void>;
  isDocUploaded: boolean;
  questionBankLink: string;
};

export type InterviewDataContextType = {
  interview: any;
  fetchingInterview: boolean;
};

export type InterviewDetailsDataContextType = {
  interviewDetails: any;
  fetchingInterviewDetails: boolean;
};

const StoreKeys = {
  user_data: "user_data",
  user_authanticated: "user_auth",
};

export const AuthContext = createContext<AuthContextType | {}>({});
export const InterviewDataContext = createContext<
  InterviewDataContextType | {}
>({});
export const InterviewDetailsDataContext = createContext<
  InterviewDetailsDataContextType | {}
>({});

function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useLocalStorage<any>(StoreKeys.user_data, null);
  const [isAuthanticated, setIsAuthanticated] = useLocalStorage<boolean>(
    StoreKeys.user_authanticated,
    false
  );
  const isDocUploaded = useMemo(() => {
    return (
      user?.docs?.some((doc: any) => doc.name === "passport") &&
      user?.docs?.some((doc: any) => doc.name === "bank-statement")
    );
  }, [user?.docs]);

  const questionBankLink = useMemo(() => {
    return user?.docs?.find((doc: any) => doc.name === "question-bank")?.url;
  }, [user?.docs]);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (user) {
      setIsAuthanticated(true);
      if (pathname === "/login") {
        router.push("/");
      }
    } else {
      setIsAuthanticated(false);
      if (pathname !== "/login") {
        router.push("/login");
      }
    }
  }, [user, pathname, router, setIsAuthanticated]);

  const login = async (creds: { username: string; password: string }) => {
    const response = await verifyCredentials(creds.username, creds.password);
    if (response.success && response?.data) {
      setUser(response.data);
      setIsAuthanticated(true);
      router.push("/");
    }
    return response;
  };

  const logout = () => {
    setUser(null);
    setIsAuthanticated(false);
  };

  const reloadUserData = async () => {
    const data = await fetchUserById(user.id);
    data.success && data.data && setUser(data.data);
    return data.success;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthanticated,
        setIsAuthanticated,
        login,
        logout,
        userId: user?.id,
        reloadUserData,
        isDocUploaded,
        questionBankLink
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context as AuthContextType;
};

export default AuthContextProvider;
