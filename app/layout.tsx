import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import ScrollToTop from "@/components/ScrollToTop";

export const metadata: Metadata = {
  metadataBase: new URL("https://omegletest.online"),
  title: "Omegle Test - talk to strangers",
  description: "Connect with strangers worldwide in real-time video chat with omegletest.online",
};

// Tüm sayfalarda ortak: WebSite ve Organization şemaları. Sayfaya özel şemalar
// (WebPage, Article, FAQPage, BreadcrumbList vb.) ilgili sayfa bileşeninde ayrıca basılır.
const siteJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Omegle Test - talk to strangers',
    url: 'https://omegletest.online/',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Omegle Test',
    url: 'https://omegletest.online',
    logo: 'https://omegletest.online/omegletest.online.jpeg',
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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