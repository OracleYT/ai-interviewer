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
    NEXT_INTERVIEW_END_URI: process.env.NEXT_INTERVIEW_END_URI,
    NEXT_AUTO_PROCTOR_CLIENT_ID: process.env.NEXT_AUTO_PROCTOR_CLIENT_ID,
    NEXT_INTERVIEW_VIDE_PLAY_DURATION_IN_SEC: 
      process.env.NEXT_INTERVIEW_VIDE_PLAY_DURATION_IN_SEC,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Adjust the limit as needed
    },
  },
};

export default nextConfig;
