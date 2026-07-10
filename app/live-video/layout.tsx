import type { Metadata } from "next";
import { resolveCanonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Live Video Chat | omegletest.online",
  description: "Start a free, anonymous live video chat with strangers worldwide on omegletest.online.",
  alternates: {
    canonical: resolveCanonical("/live-video"),
  },
};

export default function LiveVideoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
