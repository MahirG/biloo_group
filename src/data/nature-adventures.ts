export type NatureModeId =
  | "classic"
  | "habitats"
  | "families"
  | "patterns"
  | "sizes"
  | "shadows"
  | "different"
  | "counting"
  | "free-play";

export type NatureWorld = {
  id: string;
  name: string;
  description: string;
  sky: string;
  ground: string;
  accent: string;
  companion: string;
  scenery: readonly string[];
};

export type NatureDiscovery = {
  id: string;
  name: string;
  icon: string;
  color: string;
  habitat: string;
  fact: string;
  kind: "animal" | "plant" | "fungus";
};

export const natureWorlds: readonly NatureWorld[] = [
  {
    id: "highland",
    name: "Ethiopian Highland Meadow",
    description:
      "soft sage green hills, sunny yellow flowers, and sky blue air",
    sky: "#bde5ef",
    ground: "#96bd78",
    accent: "#f3c84b",
    companion: "🐇",
    scenery: ["🌿", "🌼", "🌳", "⛰️"],
  },
  {
    id: "bamboo",
    name: "Bamboo Forest",
    description: "deep forest green bamboo with lavender mist shade",
    sky: "#b8ddd2",
    ground: "#5f9868",
    accent: "#9a7bc1",
    companion: "🐼",
    scenery: ["🎋", "🍃", "🌱", "🪨"],
  },
  {
    id: "savannah",
    name: "Golden Savannah",
    description: "golden amber grass beneath a warm terracotta sunset",
    sky: "#f1c09c",
    ground: "#d7a84f",
    accent: "#dc684d",
    companion: "🦒",
    scenery: ["🌾", "🌳", "🪨", "🌞"],
  },
  {
    id: "rainforest",
    name: "Rainforest Canopy",
    description: "coral pink blooms and deep forest green leaves after rain",
    sky: "#8fd4c7",
    ground: "#3f8a62",
    accent: "#e9828f",
    companion: "🦜",
    scenery: ["🌴", "🌺", "🍃", "💧"],
  },
  {
    id: "desert",
    name: "Desert Garden",
    description: "warm terracotta stones with sunny yellow desert flowers",
    sky: "#f6d5ad",
    ground: "#c98958",
    accent: "#f3c84b",
    companion: "🦊",
    scenery: ["🌵", "🌼", "🪨", "☀️"],
  },
  {
    id: "moon",
    name: "Moonlit Woodland",
    description: "lavender mist moonlight over deep forest green pines",
    sky: "#aaaed8",
    ground: "#4e7867",
    accent: "#c6b4df",
    companion: "🦉",
    scenery: ["🌲", "🌙", "🍄", "✨"],
  },
  {
    id: "wet-season",
    name: "Wet-Season Flower Field",
    description:
      "sky blue rain, coral pink flowers, and fresh spring green grass",
    sky: "#9bcfe4",
    ground: "#70aa72",
    accent: "#e9828f",
    companion: "🐸",
    scenery: ["🌧️", "🌸", "🌱", "🪷"],
  },
];

export const natureDiscoveries: readonly NatureDiscovery[] = [
  {
    id: "ladybird",
    name: "Terracotta Ladybird",
    icon: "🐞",
    color: "warm terracotta",
    habitat: "flower meadow",
    fact: "Ladybirds help gardens by eating tiny plant pests.",
    kind: "animal",
  },
  {
    id: "butterfly",
    name: "Sky Blue Butterfly",
    icon: "🦋",
    color: "sky blue",
    habitat: "flower field",
    fact: "Butterflies taste with special sensors on their feet.",
    kind: "animal",
  },
  {
    id: "sunflower",
    name: "Sunny Sunflower",
    icon: "🌻",
    color: "sunny yellow",
    habitat: "sunny garden",
    fact: "Young sunflowers slowly turn to follow the sun.",
    kind: "plant",
  },
  {
    id: "sage-leaf",
    name: "Soft Sage Leaf",
    icon: "🍃",
    color: "soft sage green",
    habitat: "woodland floor",
    fact: "Leaves use sunlight to help plants make food.",
    kind: "plant",
  },
  {
    id: "lavender",
    name: "Lavender Mist Bloom",
    icon: "🪻",
    color: "lavender mist",
    habitat: "herb garden",
    fact: "Lavender flowers are visited by bees and butterflies.",
    kind: "plant",
  },
  {
    id: "fox",
    name: "Golden Amber Fox",
    icon: "🦊",
    color: "golden amber",
    habitat: "woodland edge",
    fact: "Foxes use their large ears to listen for tiny sounds.",
    kind: "animal",
  },
  {
    id: "blossom",
    name: "Coral Pink Blossom",
    icon: "🌸",
    color: "coral pink",
    habitat: "blossom grove",
    fact: "A blossom can grow into fruit after it is pollinated.",
    kind: "plant",
  },
  {
    id: "turtle",
    name: "Deep Forest Turtle",
    icon: "🐢",
    color: "deep forest green",
    habitat: "quiet pond",
    fact: "A turtle carries its protective shell wherever it goes.",
    kind: "animal",
  },
  {
    id: "rabbit",
    name: "Cloud White Rabbit",
    icon: "🐇",
    color: "cloud white",
    habitat: "highland meadow",
    fact: "Rabbits communicate with movements, sounds, and gentle nose touches.",
    kind: "animal",
  },
  {
    id: "mushroom",
    name: "Golden Amber Mushroom",
    icon: "🍄",
    color: "golden amber",
    habitat: "damp woodland",
    fact: "Mushrooms are fungi, not plants, and help recycle forest material.",
    kind: "fungus",
  },
  {
    id: "hedgehog",
    name: "Warm Chestnut Hedgehog",
    icon: "🦔",
    color: "warm chestnut",
    habitat: "leafy garden",
    fact: "Hedgehogs curl into a ball when they need protection.",
    kind: "animal",
  },
  {
    id: "sprout",
    name: "Fresh Green Sprout",
    icon: "🌱",
    color: "fresh spring green",
    habitat: "garden soil",
    fact: "A sprout is a young plant beginning to grow from a seed.",
    kind: "plant",
  },
  {
    id: "owl",
    name: "Cocoa Brown Owl",
    icon: "🦉",
    color: "warm cocoa brown",
    habitat: "moonlit woodland",
    fact: "Owls can turn their heads far around to look in many directions.",
    kind: "animal",
  },
  {
    id: "daisy",
    name: "Sunny Yellow Daisy",
    icon: "🌼",
    color: "sunny yellow",
    habitat: "open meadow",
    fact: "A daisy flower head is made from many tiny flowers together.",
    kind: "plant",
  },
  {
    id: "moth",
    name: "Lavender Mist Moth",
    icon: "🦋",
    color: "lavender mist",
    habitat: "moon garden",
    fact: "Many moths are active at night and help pollinate flowers.",
    kind: "animal",
  },
  {
    id: "forest-tree",
    name: "Great Forest Tree",
    icon: "🌳",
    color: "deep forest green",
    habitat: "mature forest",
    fact: "Trees provide shade, shelter, food, and cleaner air for living things.",
    kind: "plant",
  },
  {
    id: "frog",
    name: "Rainy Green Frog",
    icon: "🐸",
    color: "fresh spring green",
    habitat: "wet-season pond",
    fact: "Frogs begin life in water as tadpoles.",
    kind: "animal",
  },
  {
    id: "giraffe",
    name: "Golden Savannah Giraffe",
    icon: "🦒",
    color: "golden amber",
    habitat: "savannah",
    fact: "A giraffe uses its long neck to reach leaves high in trees.",
    kind: "animal",
  },
  {
    id: "panda",
    name: "Bamboo Forest Panda",
    icon: "🐼",
    color: "cloud white and deep black",
    habitat: "bamboo forest",
    fact: "Giant pandas spend much of their day eating bamboo.",
    kind: "animal",
  },
  {
    id: "parrot",
    name: "Rainforest Parrot",
    icon: "🦜",
    color: "coral pink and forest green",
    habitat: "rainforest canopy",
    fact: "Parrots use strong curved beaks to open seeds and fruit.",
    kind: "animal",
  },
  {
    id: "cactus",
    name: "Soft Sage Cactus",
    icon: "🌵",
    color: "soft sage green",
    habitat: "desert garden",
    fact: "A cactus stores water so it can live in very dry places.",
    kind: "plant",
  },
  {
    id: "lotus",
    name: "Coral Pink Lotus",
    icon: "🪷",
    color: "coral pink",
    habitat: "quiet pond",
    fact: "Lotus leaves float while their roots stay anchored in mud below.",
    kind: "plant",
  },
  {
    id: "bee",
    name: "Sunny Yellow Bee",
    icon: "🐝",
    color: "sunny yellow",
    habitat: "flower meadow",
    fact: "Bees carry pollen between flowers and help many plants grow fruit.",
    kind: "animal",
  },
  {
    id: "elephant",
    name: "Lavender Mist Elephant",
    icon: "🐘",
    color: "lavender mist gray",
    habitat: "savannah and woodland",
    fact: "Elephants use their trunks to smell, drink, greet, and carry things.",
    kind: "animal",
  },
];

export const natureModes: readonly {
  id: NatureModeId;
  name: string;
  icon: string;
  description: string;
  skill: string;
}[] = [
  {
    id: "classic",
    name: "Tree Sorting",
    icon: "🌳",
    description: "Drag or tap nature friends onto matching trees.",
    skill: "color, sequence, memory",
  },
  {
    id: "habitats",
    name: "Habitat Homes",
    icon: "🏡",
    description: "Help each animal find the place where it lives.",
    skill: "association and nature knowledge",
  },
  {
    id: "families",
    name: "Animal Families",
    icon: "🐣",
    description: "Match baby animals with their grown-up family.",
    skill: "visual matching",
  },
  {
    id: "patterns",
    name: "Leaf Patterns",
    icon: "🍃",
    description: "Choose the nature friend that completes the pattern.",
    skill: "sequence reasoning",
  },
  {
    id: "sizes",
    name: "Big and Small",
    icon: "🐘",
    description: "Find the smallest or biggest nature friend.",
    skill: "size comparison",
  },
  {
    id: "shadows",
    name: "Forest Shadows",
    icon: "🌒",
    description: "Match a nature friend to its dark silhouette.",
    skill: "shape recognition",
  },
  {
    id: "different",
    name: "Who Is Different?",
    icon: "🔎",
    description: "Spot the one nature friend that does not belong.",
    skill: "attention and categorization",
  },
  {
    id: "counting",
    name: "Counting Garden",
    icon: "🌼",
    description: "Count flowers, animals, leaves, and mushrooms.",
    skill: "early number sense",
  },
  {
    id: "free-play",
    name: "Free Play Garden",
    icon: "🎨",
    description: "Create a calm nature scene with no rules or score.",
    skill: "creativity and exploration",
  },
];

export const habitatQuestions = [
  {
    subject: "🐸",
    name: "frog",
    answer: "pond",
    options: ["pond", "desert", "tree nest"],
    icons: ["🪷", "🌵", "🪹"],
  },
  {
    subject: "🦉",
    name: "owl",
    answer: "woodland",
    options: ["woodland", "ocean", "flower pot"],
    icons: ["🌲", "🌊", "🪴"],
  },
  {
    subject: "🐼",
    name: "panda",
    answer: "bamboo forest",
    options: ["bamboo forest", "savannah", "moon pond"],
    icons: ["🎋", "🌾", "🌙"],
  },
  {
    subject: "🦒",
    name: "giraffe",
    answer: "savannah",
    options: ["savannah", "snowy forest", "pond"],
    icons: ["🌾", "❄️", "🪷"],
  },
  {
    subject: "🐢",
    name: "turtle",
    answer: "quiet pond",
    options: ["quiet pond", "tree top", "dry cave"],
    icons: ["💧", "🌳", "🪨"],
  },
  {
    subject: "🐝",
    name: "bee",
    answer: "flower meadow",
    options: ["flower meadow", "deep ocean", "empty desert"],
    icons: ["🌸", "🌊", "🏜️"],
  },
] as const;

export const familyQuestions = [
  { baby: "🐣", babyName: "chick", parent: "🐔", options: ["🐔", "🦊", "🐢"] },
  {
    baby: "🦆",
    babyName: "duckling",
    parent: "🦢",
    options: ["🦢", "🦉", "🐇"],
  },
  {
    baby: "🐘",
    babyName: "elephant calf",
    parent: "🐘",
    options: ["🐘", "🦒", "🐼"],
  },
  {
    baby: "🐸",
    babyName: "tadpole growing into a frog",
    parent: "🐸",
    options: ["🐸", "🐢", "🦋"],
  },
  {
    baby: "🐇",
    babyName: "rabbit kit",
    parent: "🐇",
    options: ["🐇", "🦔", "🦊"],
  },
  {
    baby: "🦊",
    babyName: "fox kit",
    parent: "🦊",
    options: ["🦊", "🐼", "🦉"],
  },
] as const;

export const patternQuestions = [
  {
    sequence: ["🍃", "🌸", "🍃", "🌸"],
    answer: "🍃",
    options: ["🍃", "🍄", "🐞"],
  },
  {
    sequence: ["🐞", "🐞", "🦋", "🐞", "🐞"],
    answer: "🦋",
    options: ["🦋", "🐢", "🌻"],
  },
  {
    sequence: ["🌱", "🌿", "🌳", "🌱", "🌿"],
    answer: "🌳",
    options: ["🌳", "🌸", "🍂"],
  },
  {
    sequence: ["🌻", "🍄", "🌻", "🍄"],
    answer: "🌻",
    options: ["🌻", "🪻", "🐇"],
  },
  {
    sequence: ["🐢", "🦊", "🦉", "🐢", "🦊"],
    answer: "🦉",
    options: ["🦉", "🐸", "🦔"],
  },
] as const;

export const sizeQuestions = [
  {
    prompt: "Choose the biggest animal",
    answer: "🐘",
    options: ["🐞", "🐇", "🐘"],
  },
  {
    prompt: "Choose the smallest animal",
    answer: "🐝",
    options: ["🦒", "🦊", "🐝"],
  },
  {
    prompt: "Choose the tallest plant",
    answer: "🌳",
    options: ["🌱", "🌻", "🌳"],
  },
  {
    prompt: "Choose the smallest plant",
    answer: "🌱",
    options: ["🌳", "🌿", "🌱"],
  },
  {
    prompt: "Choose the biggest nature friend",
    answer: "🦒",
    options: ["🐢", "🦒", "🦋"],
  },
] as const;

export const shadowQuestions = [
  { answer: "🦋", options: ["🦋", "🐝", "🍃"] },
  { answer: "🦉", options: ["🦉", "🐇", "🍄"] },
  { answer: "🌻", options: ["🌻", "🌳", "🌵"] },
  { answer: "🐢", options: ["🐢", "🐸", "🦔"] },
  { answer: "🦒", options: ["🦒", "🐘", "🦊"] },
] as const;

export const differentQuestions = [
  {
    items: ["🌸", "🌻", "🪻", "🐢"],
    answer: "🐢",
    reason: "The turtle is an animal; the others are flowers.",
  },
  {
    items: ["🦊", "🐇", "🦔", "🌳"],
    answer: "🌳",
    reason: "The tree is a plant; the others are animals.",
  },
  {
    items: ["🍄", "🍄", "🍄", "🌼"],
    answer: "🌼",
    reason: "The daisy is different from the mushrooms.",
  },
  {
    items: ["🐝", "🦋", "🦜", "🌵"],
    answer: "🌵",
    reason: "The cactus is a plant; the others can fly.",
  },
  {
    items: ["🍃", "🌿", "🌱", "🦉"],
    answer: "🦉",
    reason: "The owl is an animal; the others are green plants.",
  },
] as const;

export const countingQuestions = [
  { icon: "🐞", count: 2 },
  { icon: "🌻", count: 3 },
  { icon: "🍃", count: 4 },
  { icon: "🍄", count: 5 },
  { icon: "🦋", count: 3 },
  { icon: "🌸", count: 6 },
] as const;

export function worldForProgress(totalDiscoveries: number) {
  return natureWorlds[totalDiscoveries % natureWorlds.length];
}

export function dailyModeIds(dateKey: string): NatureModeId[] {
  const available: NatureModeId[] = [
    "habitats",
    "families",
    "patterns",
    "sizes",
    "shadows",
    "different",
    "counting",
  ];
  const seed = Array.from(dateKey).reduce(
    (total, character) => total + character.charCodeAt(0),
    0,
  );
  return [0, 1, 2].map(
    (offset) => available[(seed + offset * 3) % available.length],
  );
}
