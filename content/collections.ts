/**
 * The exhibitions on the gallery landing.
 *
 * A drawing can sit in more than one list. The order here is the order
 * on that collection's wall. To rename Beautifully Strange, change its title.
 * To show Halloweenies after the holidays, set enabled to true.
 */
export type Collection = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  enabled: boolean;
  displayOrder: number;
  pieces: string[];
};

export const collections: Collection[] = [
  {
    id: "out-of-this-world",
    slug: "out-of-this-world",
    title: "Out of This World",
    subtitle: "Alien skin and other worlds.",
    description:
      "Alien-skinned characters, otherworldly personalities, and a little science fiction.",
    enabled: true,
    displayOrder: 1,
    pieces: [
      "d-953",
      "bot-boop",
      "gachapon-traveler",
      "bubble-matic",
      "ground-ball",
      "its-a-limited-edition",
    ],
  },
  {
    id: "byom",
    slug: "byom",
    title: "BYOM",
    subtitle: "Bring your own music.",
    description: "Instruments, performance, listening, and the pieces that belong with them.",
    enabled: true,
    displayOrder: 2,
    pieces: [
      "guqin",
      "for-dexter",
      "gachapon-traveler",
      "bubble-matic",
      "listening-party",
    ],
  },
  {
    id: "beautifully-strange",
    slug: "beautifully-strange",
    title: "Beautifully Strange",
    subtitle: "Fashion, posture, everyday weirdness.",
    description:
      "Expressive characters, unusual fashion, dynamic bodies, and everyday weirdness.",
    enabled: true,
    displayOrder: 3,
    pieces: [
      "jet-set-overspray",
      "too-shear",
      "its-a-limited-edition",
      "ground-ball",
      "bot-boop",
      "d-953",
    ],
  },
  {
    id: "halloweenies",
    slug: "halloweenies",
    title: "Halloweenies",
    subtitle: "The family portraits.",
    description: "The Halloweenies family portrait series.",
    enabled: false,
    displayOrder: 4,
    pieces: [],
  },
];
