"use client";

import { useAuth } from "@/contexts/AuthProvider";
import { usePathname, useRouter } from "next/navigation";
import Script from "next/script";
import React, { useEffect } from "react";

function Layout({ children }: any) {
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const hasCv = user?.docs?.find((doc: any) => doc.name === "cv/resume");
      const hasOfferLetter = user?.docs?.find(
        (doc: any) => doc.name === "offer-letter"
      );
      if ((!hasCv || !hasOfferLetter) && pathname !== "/onboarding") {
        router.push("/onboarding");
      }
    }
  }, [user, pathname]);

  return (
    <div>
      {children}
    </div>
  );
}

export default Layout;
