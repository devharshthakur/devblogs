import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // Allows production builds to complete even if there are TypeScript type errors
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
