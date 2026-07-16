import type { Metadata } from "next";
import { resolveCanonical, getSiteUrl } from "@/lib/canonical";

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = await getSiteUrl();
  const hostname = siteUrl.replace(/^https?:\/\//, '');

  return {
    title: `Live Text Chat | ${hostname}`,
    description: `Start a free, anonymous live text chat with strangers worldwide on ${hostname}.`,
    alternates: {
      canonical: await resolveCanonical("/live-text"),
    },
  };
}

export default function LiveTextLayout({ children }: { children: React.ReactNode }) {
  return children;
}
