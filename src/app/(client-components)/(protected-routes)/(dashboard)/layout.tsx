"use client";

import Card from "@/components/Card";
import { DASHBOARD_SIDE_NAV_ITEMS } from "@/constatnts/content-const";
import { useAuth } from "@/contexts/AuthProvider";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  return (
    <>
      <Card
        background="#000000"
        padding="24px"
        className="flex overflow-scroll gap-20 element min-h-screen max-h-full element"
      >
        <div className="flex flex-col justify-center gap-36 p-6">
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
          <div className="flex items-center gap-2">
            <svg
              fill="#ffffff"
              width="20px"
              height="20px"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M116.832 543.664H671.28c17.696 0 32-14.336 32-32s-14.304-32-32-32H118.832l115.76-115.76c12.496-12.496 12.496-32.752 0-45.248s-32.752-12.496-45.248 0l-189.008 194 189.008 194c6.256 6.256 14.432 9.376 22.624 9.376s16.368-3.12 22.624-9.376c12.496-12.496 12.496-32.752 0-45.248zM959.664 0H415.663c-35.36 0-64 28.656-64 64v288h64.416V103.024c0-21.376 17.344-38.72 38.72-38.72h464.72c21.391 0 38.72 17.344 38.72 38.72l1.007 818.288c0 21.376-17.328 38.72-38.72 38.72H454.816c-21.376 0-38.72-17.344-38.72-38.72V670.944l-64.416.08V960c0 35.344 28.64 64 64 64h543.984c35.36 0 64.016-28.656 64.016-64V64c-.015-35.344-28.671-64-64.015-64z"></path>
              </g>
            </svg>
            <span
              onClick={logout}
              className=" text-white/80 cursor-pointer hover:text-white text-lg font-medium"
            >
              logout
            </span>
          </div>
        </div>

        {children}
      </Card>
    </>
  );
}
