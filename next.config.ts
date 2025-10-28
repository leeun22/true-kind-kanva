import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "i.imgur.com",
        protocol: "https",
        // port: "",
        // pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
