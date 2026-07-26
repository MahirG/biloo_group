import type { BeadColor } from "@/data/color-sort-levels";

export type NatureTheme = "meadow" | "woodland" | "blossom" | "moonlight";

export type NaturePieceDefinition = {
  colorName: string;
  colorHex: string;
  softHex: string;
  pattern: string;
  icon: string;
  name: string;
};

export const naturePieces: Record<BeadColor, NaturePieceDefinition> = {
  red: {
    colorName: "warm terracotta",
    colorHex: "#dc684d",
    softHex: "#f3a58f",
    pattern:
      "radial-gradient(circle, rgba(255,255,255,.92) 0 11%, transparent 12%)",
    icon: "🐞",
    name: "ladybird",
  },
  blue: {
    colorName: "sky blue",
    colorHex: "#4d9fd8",
    softHex: "#91c9eb",
    pattern:
      "repeating-linear-gradient(45deg, rgba(255,255,255,.8) 0 4px, transparent 4px 11px)",
    icon: "🦋",
    name: "butterfly",
  },
  yellow: {
    colorName: "sunny yellow",
    colorHex: "#f3c84b",
    softHex: "#f9df82",
    pattern:
      "radial-gradient(circle, rgba(86,66,20,.38) 0 9%, transparent 10%)",
    icon: "🌻",
    name: "sunflower",
  },
  green: {
    colorName: "soft sage green",
    colorHex: "#76a96b",
    softHex: "#a9cfa2",
    pattern:
      "repeating-linear-gradient(90deg, rgba(255,255,255,.72) 0 3px, transparent 3px 10px)",
    icon: "🍃",
    name: "leaf",
  },
  purple: {
    colorName: "lavender mist",
    colorHex: "#9a7bc1",
    softHex: "#c6b4df",
    pattern:
      "radial-gradient(circle at 25% 25%, rgba(255,255,255,.82) 0 8%, transparent 9%)",
    icon: "🪻",
    name: "lavender flower",
  },
  orange: {
    colorName: "golden amber",
    colorHex: "#dc923c",
    softHex: "#efba73",
    pattern:
      "repeating-linear-gradient(-45deg, rgba(255,255,255,.78) 0 3px, transparent 3px 9px)",
    icon: "🦊",
    name: "fox",
  },
  pink: {
    colorName: "coral pink",
    colorHex: "#e9828f",
    softHex: "#f2b4bd",
    pattern:
      "radial-gradient(circle, rgba(255,255,255,.9) 0 7%, transparent 8%)",
    icon: "🌸",
    name: "cherry blossom",
  },
  teal: {
    colorName: "deep forest green",
    colorHex: "#28796b",
    softHex: "#72ac9e",
    pattern:
      "repeating-linear-gradient(0deg, rgba(255,255,255,.75) 0 3px, transparent 3px 10px)",
    icon: "🐢",
    name: "turtle",
  },
};

export const natureCollectibles = [
  { name: "Terracotta Ladybird", icon: "🐞", color: "warm terracotta" },
  { name: "Sky Blue Butterfly", icon: "🦋", color: "sky blue" },
  { name: "Sunny Sunflower", icon: "🌻", color: "sunny yellow" },
  { name: "Sage Leaf", icon: "🍃", color: "soft sage green" },
  { name: "Lavender Bloom", icon: "🪻", color: "lavender mist" },
  { name: "Golden Fox", icon: "🦊", color: "golden amber" },
  { name: "Coral Blossom", icon: "🌸", color: "coral pink" },
  { name: "Forest Turtle", icon: "🐢", color: "deep forest green" },
  { name: "Meadow Rabbit", icon: "🐇", color: "cloud white" },
  { name: "Amber Mushroom", icon: "🍄", color: "golden amber" },
  { name: "Happy Hedgehog", icon: "🦔", color: "warm chestnut" },
  { name: "Tiny Sprout", icon: "🌱", color: "fresh spring green" },
  { name: "Woodland Owl", icon: "🦉", color: "warm cocoa brown" },
  { name: "Dancing Daisy", icon: "🌼", color: "sunny yellow" },
  { name: "Moonlit Moth", icon: "🦋", color: "lavender mist" },
  { name: "Great Forest Tree", icon: "🌳", color: "deep forest green" },
] as const;

export const natureThemes: Record<
  NatureTheme,
  {
    name: string;
    description: string;
    sky: string;
    ground: string;
    accent: string;
    companion: string;
  }
> = {
  meadow: {
    name: "Spring Meadow",
    description: "soft sage green grass and sky blue morning light",
    sky: "#bde4ef",
    ground: "#b9d99d",
    accent: "#f3c84b",
    companion: "🐇",
  },
  woodland: {
    name: "Summer Woodland",
    description: "deep forest green leaves and golden amber sunshine",
    sky: "#9bd1d0",
    ground: "#78a96c",
    accent: "#dc923c",
    companion: "🦊",
  },
  blossom: {
    name: "Autumn Blossom Grove",
    description: "warm terracotta leaves and coral pink flowers",
    sky: "#f1c7af",
    ground: "#b98057",
    accent: "#e9828f",
    companion: "🦔",
  },
  moonlight: {
    name: "Winter Moon Garden",
    description: "lavender mist shadows and deep forest green pines",
    sky: "#b8b9dd",
    ground: "#547b6a",
    accent: "#c6b4df",
    companion: "🦉",
  },
};

export function themeForProgress(completed: number): NatureTheme {
  if (completed >= 12) return "moonlight";
  if (completed >= 8) return "blossom";
  if (completed >= 4) return "woodland";
  return "meadow";
}

export function treeStage(completed: number) {
  if (completed >= 16) return { icon: "🌳", name: "Great Forest Tree", next: 16 };
  if (completed >= 12) return { icon: "🌲", name: "Strong Woodland Tree", next: 16 };
  if (completed >= 8) return { icon: "🌸", name: "Flowering Tree", next: 12 };
  if (completed >= 4) return { icon: "🌿", name: "Young Leafy Tree", next: 8 };
  return { icon: "🌱", name: "Little Seedling", next: 4 };
}
