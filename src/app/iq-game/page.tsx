import type { Metadata, Viewport } from "next";

import { ColorSortGame } from "@/components/color-sort-game";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Color Sort — Toddler IQ Game",
  description:
    "Play Color Sort, a calm Montessori-inspired bead-sorting game for toddlers that develops color recognition, pattern matching, memory, and hand-eye coordination.",
  alternates: { canonical: "/iq-game" },
  applicationName: "Color Sort by Biloo Group",
  openGraph: {
    title: "Color Sort — Toddler Bead-Sorting Game",
    description:
      "A positive, ad-free color and pattern game for young children, built by Biloo Group.",
    url: "/iq-game",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Sort — Toddler IQ Game",
    description:
      "A calm Montessori-inspired bead-sorting game with positive rewards and no fail states.",
  },
};

export const viewport: Viewport = {
  themeColor: "#f3d59a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function IqGamePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "VideoGame",
          name: "Color Sort",
          alternateName: ["Little Sorter", "Biloo IQ Game"],
          description: metadata.description,
          url: absoluteUrl("/iq-game"),
          applicationCategory: "EducationalGame",
          operatingSystem: "Web",
          playMode: "SinglePlayer",
          educationalUse: [
            "Color recognition",
            "Pattern matching",
            "Memory",
            "Hand-eye coordination",
          ],
          audience: {
            "@type": "PeopleAudience",
            suggestedMinAge: 2,
            suggestedMaxAge: 4,
          },
          author: { "@id": `${absoluteUrl()}#organization` },
          isAccessibleForFree: true,
          inLanguage: "en",
        }}
      />
      <ColorSortGame />
    </>
  );
}
