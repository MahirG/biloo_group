export type BeadColor =
  "red" | "blue" | "yellow" | "green" | "purple" | "orange" | "pink" | "teal";

export type ColorSortLevel = {
  id: number;
  tier: "easy" | "medium";
  title: string;
  rods: readonly (readonly BeadColor[])[];
  memory?: boolean;
  decoys?: readonly BeadColor[];
  prefilledWrong?: readonly {
    rod: number;
    color: BeadColor;
  }[];
};

export const colorSortLevels: readonly ColorSortLevel[] = [
  {
    id: 1,
    tier: "easy",
    title: "Two Happy Colors",
    rods: [
      ["red", "red"],
      ["blue", "blue"],
    ],
  },
  {
    id: 2,
    tier: "easy",
    title: "Sunny Garden",
    rods: [
      ["yellow", "yellow"],
      ["green", "green"],
    ],
  },
  {
    id: 3,
    tier: "easy",
    title: "Three Color Friends",
    rods: [
      ["red", "red"],
      ["yellow", "yellow"],
      ["blue", "blue"],
    ],
  },
  {
    id: 4,
    tier: "easy",
    title: "Big Bead Picnic",
    rods: [
      ["green", "green", "green"],
      ["orange", "orange", "orange"],
      ["purple", "purple", "purple"],
    ],
  },
  {
    id: 5,
    tier: "easy",
    title: "Four Color Parade",
    rods: [
      ["red", "red"],
      ["blue", "blue"],
      ["yellow", "yellow"],
      ["green", "green"],
    ],
  },
  {
    id: 6,
    tier: "easy",
    title: "Rainbow Workshop",
    rods: [
      ["purple", "purple", "purple"],
      ["orange", "orange", "orange"],
      ["blue", "blue", "blue"],
      ["green", "green", "green"],
    ],
  },
  {
    id: 7,
    tier: "easy",
    title: "Sorting Star",
    rods: [
      ["red", "red", "red"],
      ["yellow", "yellow", "yellow"],
      ["blue", "blue", "blue"],
      ["purple", "purple", "purple"],
    ],
  },
  {
    id: 8,
    tier: "medium",
    title: "Color Sandwiches",
    rods: [
      ["red", "yellow", "red"],
      ["blue", "green", "blue"],
      ["yellow", "purple", "yellow"],
      ["green", "orange", "green"],
    ],
  },
  {
    id: 9,
    tier: "medium",
    title: "Remember the Rainbow",
    memory: true,
    rods: [
      ["red", "blue", "yellow"],
      ["green", "purple", "orange"],
      ["yellow", "red", "green"],
      ["blue", "orange", "purple"],
    ],
  },
  {
    id: 10,
    tier: "medium",
    title: "Sharp Eyes",
    decoys: ["pink", "teal"],
    rods: [
      ["red", "yellow", "red"],
      ["blue", "green", "blue"],
      ["purple", "orange", "purple"],
      ["yellow", "red", "yellow"],
      ["green", "blue", "green"],
    ],
  },
  {
    id: 11,
    tier: "medium",
    title: "Pattern Builder",
    rods: [
      ["red", "blue", "red"],
      ["yellow", "green", "yellow"],
      ["purple", "orange", "purple"],
      ["blue", "yellow", "blue"],
      ["green", "red", "green"],
    ],
  },
  {
    id: 12,
    tier: "medium",
    title: "Fix and Remember",
    memory: true,
    prefilledWrong: [{ rod: 0, color: "blue" }],
    rods: [
      ["red", "yellow", "red"],
      ["blue", "green", "blue"],
      ["yellow", "purple", "yellow"],
      ["green", "orange", "green"],
    ],
  },
  {
    id: 13,
    tier: "medium",
    title: "Five Clever Towers",
    rods: [
      ["red", "green", "yellow"],
      ["blue", "yellow", "purple"],
      ["green", "purple", "orange"],
      ["yellow", "orange", "red"],
      ["purple", "red", "blue"],
    ],
  },
  {
    id: 14,
    tier: "medium",
    title: "Tricky Color Cousins",
    decoys: ["pink", "teal", "pink"],
    rods: [
      ["red", "yellow", "blue"],
      ["blue", "green", "purple"],
      ["yellow", "purple", "orange"],
      ["green", "orange", "red"],
      ["purple", "red", "green"],
    ],
  },
  {
    id: 15,
    tier: "medium",
    title: "Memory Master",
    memory: true,
    rods: [
      ["red", "blue", "yellow"],
      ["blue", "yellow", "green"],
      ["yellow", "green", "purple"],
      ["green", "purple", "orange"],
      ["purple", "orange", "red"],
    ],
  },
  {
    id: 16,
    tier: "medium",
    title: "Little Genius Workshop",
    memory: true,
    decoys: ["pink", "teal"],
    prefilledWrong: [
      { rod: 1, color: "red" },
      { rod: 4, color: "blue" },
    ],
    rods: [
      ["red", "yellow", "blue"],
      ["blue", "green", "purple"],
      ["yellow", "purple", "orange"],
      ["green", "orange", "red"],
      ["purple", "red", "green"],
    ],
  },
];

export function getColorSortLevel(levelNumber: number) {
  return (
    colorSortLevels.find((level) => level.id === levelNumber) ??
    colorSortLevels[0]
  );
}
