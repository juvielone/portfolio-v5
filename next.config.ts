import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder project images; remove once real screenshots live in /public
    remotePatterns: [new URL("https://media.base44.com/images/public/6ab71d80b373ae27734d54a6/**")],
  },
};

export default nextConfig;
