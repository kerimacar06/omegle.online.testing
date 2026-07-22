import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: ["mongoose"],
  experimental: {
    webpackMemoryOptimizations: true,
  },
  // Geliştirme ortamında tünel (cloudflared/localtunnel) üzerinden mobil test yapılabilmesi için.
  allowedDevOrigins: ['*.trycloudflare.com', '*.loca.lt'],
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
  async rewrites() {
    return [
      {
        // Eski /uploads/<folder>/<file> yolları klasör taşındıktan sonra veritabanında kaldı;
        // yeni konuma yönlendirip mevcut kayıtların kırık görsel göstermesini önlüyoruz.
        source: "/uploads/:folder/:file",
        destination: "/:folder/:file",
      },
    ];
  },
};

export default nextConfig;
