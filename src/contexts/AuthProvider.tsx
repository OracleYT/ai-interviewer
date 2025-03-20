"use client";
import useLocalStorage from "@/hooks/useLocalStorage";
import { usePathname, useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect } from "react";
import { verifyCredentials } from "@/action/auth-action";

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

  const resetPassword = (email: string) => {
    // make an api call
    return Promise.resolve({
      success: true,
      message: "New password sent to your email",
    });
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
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
