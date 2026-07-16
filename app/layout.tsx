import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getSiteUrl } from "@/lib/canonical";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import ScrollToTop from "@/components/ScrollToTop";

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = await getSiteUrl();

  return {
    metadataBase: new URL(siteUrl),
    title: "Omegle Test - talk to strangers",
    description: `Connect with strangers worldwide in real-time video chat with ${siteUrl.replace(/^https?:\/\//, '')}`,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = await getSiteUrl();

  // Tüm sayfalarda ortak: WebSite ve Organization şemaları. Sayfaya özel şemalar
  // (WebPage, Article, FAQPage, BreadcrumbList vb.) ilgili sayfa bileşeninde ayrıca basılır.
  const siteJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Omegle Test - talk to strangers',
      url: `${siteUrl}/`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Omegle Test',
      url: siteUrl,
      logo: `${siteUrl}/omegletest-online.jpeg`,
    },
  ];

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}