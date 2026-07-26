import type { Metadata, Viewport } from "next";

import { JsonLd } from "@/components/json-ld";
import { NatureMatchExperience } from "@/components/nature-match-experience";
import { absoluteUrl } from "@/lib/site";

import styles from "./iq-game.module.css";

export const metadata: Metadata = {
  title: "Nature Match World — Calm Animal and Plant Puzzle Game",
  description:
    "Explore Nature Match World, a calm, ad-free collection of animal, plant, habitat, pattern, counting, memory, sorting, and free-play activities for young children.",
  alternates: { canonical: "/iq-game" },
  applicationName: "Nature Match World by Biloo Group",
  openGraph: {
    title: "Nature Match World — Biloo's Nature Puzzle Game",
    description:
      "A positive-only educational game with daily nature adventures, animal reactions, adaptive puzzles, a permanent garden, and creative free play.",
    url: "/iq-game",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nature Match World — Animal and Plant Puzzle Game",
    description:
      "Calm nature sorting, habitats, families, patterns, shadows, counting, and free play with no timers or fail states.",
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
          name: "Nature Match World",
          alternateName: ["Nature Match", "Biloo Nature Game", "Biloo IQ Game"],
          description: metadata.description,
          url: absoluteUrl("/iq-game"),
          applicationCategory: "EducationalGame",
          operatingSystem: "Web",
          playMode: "SinglePlayer",
          educationalUse: [
            "Color recognition",
            "Pattern matching",
            "Memory",
            "Early counting",
            "Size comparison",
            "Visual categorization",
            "Hand-eye coordination",
            "Nature vocabulary",
            "Creative free play",
          ],
          keywords: [
            "animal matching game",
            "nature sorting game",
            "habitat matching game",
            "toddler counting game",
            "pattern game for children",
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
      <NatureMatchExperience />
    </div>
  );
}
