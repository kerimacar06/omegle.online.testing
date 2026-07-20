import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: ["mongoose"],
  experimental: {
    webpackMemoryOptimizations: true,
  },
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
      {
        source: "/apps/:slug",
        destination: "/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
