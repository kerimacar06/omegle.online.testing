import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["mongoose"],
  async redirects() {
    return [
      {
        source: "/chat/video",
        destination: "/live-video",
        permanent: true,
      },
      {
        source: "/chat/text",
        destination: "/live-text",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
