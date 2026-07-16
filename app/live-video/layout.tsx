import type { Metadata } from "next";
import { resolveCanonical, getSiteUrl } from "@/lib/canonical";

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = await getSiteUrl();
  const hostname = siteUrl.replace(/^https?:\/\//, '');

  return {
    title: `Live Video Chat | ${hostname}`,
    description: `Start a free, anonymous live video chat with strangers worldwide on ${hostname}.`,
    alternates: {
      canonical: await resolveCanonical("/live-video"),
    },
  };
}

export default function LiveVideoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
