import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { JsonLd } from "@/components/json-ld";
import { absoluteUrl, siteUrl } from "@/lib/site";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Biloo Group",
  title: {
    default: "Biloo Group — Technology Company in Ethiopia",
    template: "%s — Biloo Group",
  },
  description:
    "Biloo Group is an Ethiopia-rooted technology company exploring artificial intelligence, cloud platforms, fintech, digital commerce, product innovation, and public-sector software for African markets.",
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "Biloo Group", url: siteUrl }],
  creator: "Biloo Group",
  publisher: "Biloo Group",
  category: "Technology",
  openGraph: {
    title: "Biloo Group — Technology Built for Generations",
    description:
      "An Ethiopia-rooted technology company building dependable digital platforms with African context and global standards.",
    type: "website",
    siteName: "Biloo Group",
    locale: "en_US",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Biloo Group — Technology Built for Generations",
    description:
      "An Ethiopia-rooted technology company building dependable digital platforms for African markets.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: googleSiteVerification
    ? { google: googleSiteVerification }
    : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${geistSans.variable} ${geistMono.variable}`} lang="en">
      <body className="antialiased">
        <JsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": `${siteUrl}/#organization`,
              name: "Biloo Group",
              alternateName: "Biloo",
              url: siteUrl,
              email: "mahir@biloogroups.com",
              description:
                "Biloo Group is an Ethiopia-rooted technology company building dependable digital platforms for African businesses and institutions.",
              founder: {
                "@type": "Person",
                name: "Mahir Aman",
                jobTitle: "Founder & CEO",
              },
              foundingLocation: {
                "@type": "Country",
                name: "Ethiopia",
              },
              areaServed: {
                "@type": "Place",
                name: "Africa",
              },
              knowsAbout: [
                "Artificial intelligence",
                "Cloud computing",
                "Digital commerce",
                "Financial technology",
                "Software engineering",
                "Public-sector technology",
              ],
              sameAs: ["https://github.com/MahirG/biloo_group"],
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${siteUrl}/#website`,
              name: "Biloo Group",
              url: absoluteUrl(),
              description:
                "Technology insights and strategic capabilities from Biloo Group.",
              publisher: { "@id": `${siteUrl}/#organization` },
              inLanguage: "en",
            },
          ]}
        />
        {children}
      </body>
    </html>
  );
}
