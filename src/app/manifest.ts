import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Biloo Group",
    short_name: "Biloo",
    description:
      "Biloo Group is an Ethiopia-rooted technology company building dependable digital platforms for Africa.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#0f172a",
    categories: ["business", "technology", "productivity"],
  };
}
