import type { Metadata, Viewport } from "next";

import { ColorSortGame } from "@/components/color-sort-game";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl } from "@/lib/site";

import styles from "./iq-game.module.css";

export const metadata: Metadata = {
  title: "Nature Match — Animal and Plant Puzzle Game",
  description:
    "Play Nature Match, a calm, colorful animal-and-plant sorting game for young children with seasonal forests, named nature colors, pattern memory, tree growth, and positive-only rewards.",
  alternates: { canonical: "/iq-game" },
  applicationName: "Nature Match by Biloo Group",
  openGraph: {
    title: "Nature Match — Biloo's Nature Puzzle Game",
    description:
      "A polished, ad-free matching game with cute animals, leaves, flowers, seasonal worlds, and a growing nature gallery.",
    url: "/iq-game",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nature Match — Animal and Plant Puzzle Game",
    description:
      "A calm nature-themed sorting and pattern game with positive rewards and no fail states.",
  },
};

export const viewport: Viewport = {
  themeColor: "#76a96b",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function IqGamePage() {
  return (
    <div className={styles.gamePage}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "VideoGame",
          name: "Nature Match",
          alternateName: ["Biloo Nature Game", "Biloo IQ Game"],
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
            "Nature vocabulary",
          ],
          keywords: [
            "animal matching game",
            "nature sorting game",
            "color matching game",
            "toddler pattern game",
            "offline educational game",
          ],
          audience: {
            "@type": "PeopleAudience",
            suggestedMinAge: 2,
            suggestedMaxAge: 5,
          },
          author: { "@id": `${absoluteUrl()}#organization` },
          isAccessibleForFree: true,
          inLanguage: "en",
        }}
      />
      <ColorSortGame />
    </div>
  );
}
