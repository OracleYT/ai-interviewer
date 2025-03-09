import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cdn.tailgrids.com",
      },
      {
        hostname: "gstatic.com",
      },
      {
        hostname: "img.clerk.com",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_VAPI_KEY: process.env.NEXT_PUBLIC_VAPI_KEY,
    NEXT_PUBLIC_VAPI_ASSISTANT_ID: process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID
  },
};

export default nextConfig;
