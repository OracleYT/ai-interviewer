"use client";
import useLocalStorage from "@/hooks/useLocalStorage";
import { user_login } from "@/utils/mockdata";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect } from "react";

export type AuthContextType = {
  user: any;
  isAuthanticated: boolean;
  setUser: (user: any) => void;
  setIsAuthanticated: (isAuthanticated: boolean) => void;
  login: (creds: { username: string; password: string }) => Promise<any>;
  logout: () => void;
  resetPassword: (email: string) => Promise<any>;
};

const StoreKeys = {
  user_data: "user_data",
  user_authanticated: "user_auth",
};

export const AuthContext = createContext<AuthContextType | {}>({});

function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useLocalStorage<any>(StoreKeys.user_data, null);
  const [isAuthanticated, setIsAuthanticated] = useLocalStorage<boolean>(
    StoreKeys.user_authanticated,
    false
  );
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setIsAuthanticated(true);
    } else {
      setIsAuthanticated(false);
    }
  }, [user, setIsAuthanticated]);

  const login = async (creds: { username: string; password: string }) => {
    const response = await user_login(creds);
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

  const resetPassword = (email: string) => {
    console.log("resetPassword", email);
    // make an api call
    return Promise.resolve({
      success: true,
      message: "New password sent to your email",
    });
  };
  const authanticated = user && isAuthanticated;
  if (!authanticated) {
    router.push("/login");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthanticated,
        setIsAuthanticated,
        login,
        logout,
        resetPassword,
      }}
    >
      {authanticated ? (
        children
      ) : (
        <div>User not Authanticated Redirecting to login...</div>
      )}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
