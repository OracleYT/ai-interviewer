"use client";

import Card from "@/components/Card";
import ExitIcon from "@/components/icons/ExitIcon";
import { DASHBOARD_SIDE_NAV_ITEMS } from "@/constatnts/content-const";
import { useAuth } from "@/contexts/AuthProvider";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div className="text-2xl text-center absolute top-[45%] left-[40%]">Authenticating... Please wait.</div>;
  }

  return (
    <>
      <Card
        background="#000000"
        padding="24px"
        className="flex overflow-scroll gap-20 element min-h-screen max-h-full element"
      >
        <div className="flex flex-col justify-center gap-36 p-6 w-[20%]">
          <div className="flex flex-col">
            <img
              src="/assets/profile-picture.png"
              alt="profile"
              className="w-[72px] h-[72px]"
            />
            <h3 className="text-[30px] text-[#ffffff] font-semibold ">
              {user?.name}
            </h3>
            <p className="text-[#ffffff]/60">{user?.email}</p>
          </div>
          <div className="flex flex-col gap-3 text-lg font-medium h-full">
            {DASHBOARD_SIDE_NAV_ITEMS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  pathname === link.href
                    ? "text-[#ffffff]"
                    : "text-[#ffffff]/50",
                  "hover:text-[#ffffff]"
                )}
              >
                {link.text}
              </Link>
            ))}
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={logout}
          >
            <ExitIcon />
            <span className=" text-white/80 cursor-pointer hover:text-white text-lg font-medium">
              logout
            </span>
          </div>
        </div>
        {children}
      </Card>
    </>
  );
}
