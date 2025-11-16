import type { NextConfig } from "next";

const nextConfig: NextConfig = {

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
   experimental: {
    globalNotFound: true,
  },
  // reactStrictMode: false
};

export default nextConfig;
