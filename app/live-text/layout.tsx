import type { Metadata } from "next";
import { resolveCanonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Live Text Chat | omegletest.online",
  description: "Start a free, anonymous live text chat with strangers worldwide on omegletest.online.",
  alternates: {
    canonical: resolveCanonical("/live-text"),
  },
};

export default function LiveTextLayout({ children }: { children: React.ReactNode }) {
  return children;
}
