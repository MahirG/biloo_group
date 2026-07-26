import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Biloo Group",
    short_name: "Biloo",
    description:
      "Biloo Group is an Ethiopia-rooted technology company building dependable digital platforms and educational experiences for Africa.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "any",
    background_color: "#f8fafc",
    theme_color: "#0f172a",
    categories: [
      "business",
      "education",
      "games",
      "technology",
      "productivity",
    ],
    shortcuts: [
      {
        name: "Play Nature Match World",
        short_name: "Nature Match",
        description:
          "Open Biloo's calm animal, plant, habitat, sorting, pattern, counting, memory, and free-play world.",
        url: "/iq-game",
      },
    ],
  };
}
