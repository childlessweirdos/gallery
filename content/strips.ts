export type Strip = {
  slug: string;
  title: string;
  /** The day it went up, YYYY-MM-DD. */
  date: string;
  alt: string;
  width: number;
  height: number;
};

/**
 * The Sunday strips, earliest first.
 *
 * To add one:
 * 1. Export the strip as a PNG.
 * 2. Save it as masters/comics/<slug>.png
 *    The slug is the file name: happy-holidays.png
 * 3. Run `npm run comics`
 * 4. Paste the record it prints at the end of the list below.
 *    Fill in the title, the date, and one line on what the picture shows.
 *
 * masters/comics/cast.png is the cast portrait on the comics page.
 * It is not a strip. Leave it out of this list.
 */
export const strips: Strip[] = [
  {
    slug: "the-sink-awaits",
    title: "The Sink Awaits",
    date: "2025-06-13",
    alt: "D sits at the table with a mug while Moo, in a tiny crown, demands the sink that was run five minutes ago, then rides on D's head toward the bathroom.",
    width: 2000,
    height: 784,
  },
  {
    slug: "more-plants",
    title: "More Plants",
    date: "2025-06-13",
    alt: "E arrives with a seedling and D says the last thing they need is more plants. The seedlings become a row of tall plants, and D coos over one of them.",
    width: 2000,
    height: 784,
  },
  {
    slug: "pants",
    title: "Pants?",
    date: "2025-06-13",
    alt: "D and E sit on the couch with game controllers. A call says they'll stop by, D asks about pants, and then sits alone, head in hands, next to a tiny pair of pants.",
    width: 2000,
    height: 784,
  },
  {
    slug: "ninety-percent-moo",
    title: "Ninety Percent Moo",
    date: "2025-06-13",
    alt: "D and E stand over a wide-eyed Haku and guess he is scared of Moo. In the last panel Moo sits on Haku, who is flattened on the couch.",
    width: 2000,
    height: 784,
  },
  {
    slug: "say-tuna",
    title: "Say Tuna",
    date: "2025-06-13",
    alt: "D offers Haku dried tuna to sit next to Moo for a photo. Haku bolts through a burst of the words say cheese, and the family photo is a blur of the cat fleeing.",
    width: 2000,
    height: 784,
  },
  {
    slug: "missing-an-angel",
    title: "Missing an Angel",
    date: "2025-06-27",
    alt: "A sweating D has a pitchfork-carrying devil Moo perched on each shoulder. One of them says, in Chinese, that both of them are little devils.",
    width: 2000,
    height: 784,
  },
  {
    slug: "getting-pickled",
    title: "Getting Pickled",
    date: "2025-07-04",
    alt: "E asks about Picklesburgh. The middle panel is the pickle festival under a Heinz bridge, and D shows up in a pickle-barrel hat holding a pickle and a jar.",
    width: 2000,
    height: 784,
  },
  {
    slug: "too-punk-for-brunch",
    title: "Too Punk for Brunch",
    date: "2025-07-11",
    alt: "A mohawked D in a studded jacket asks if they are too punk for brunch, insists they never are, then stands in a halftone panel saying they are super underdressed.",
    width: 2000,
    height: 784,
  },
  {
    slug: "subdue-the-beast",
    title: "Subdue the Beast",
    date: "2025-07-29",
    alt: "D presses against a window at a small Moo. E calls Moo a sweetie. D, in a top hat with a megaphone, announces that E has subdued the savage beast.",
    width: 2000,
    height: 784,
  },
  {
    slug: "mmm-tacos",
    title: "Mmm Tacos",
    date: "2025-08-01",
    alt: "E asks if D is okay with tacos. D's thought bubble is a taco dream with Moo, and out loud D only says mmm tacos while E looks unsure.",
    width: 2000,
    height: 784,
  },
  {
    slug: "copy-paste",
    title: "Copy Paste",
    date: "2025-08-29",
    alt: "D argues with a laptop covered in exclamation points, begging it to copy and paste normally, while a cat's paws reach up onto the keyboard.",
    width: 2000,
    height: 784,
  },
  {
    slug: "not-procrastinating",
    title: "Not Procrastinating",
    date: "2025-09-05",
    alt: "D means to draw a comic, then pets Haku because the cat wants to play, and decides drawing will have to wait.",
    width: 2000,
    height: 784,
  },
  {
    slug: "no-alibi",
    title: "No Alibi",
    date: "2025-09-26",
    alt: "D finds something on the floor and covers their face at a dead bird. Haku, on the counter, asks D to use the word alibi in a sentence.",
    width: 2000,
    height: 784,
  },
  {
    slug: "mission-strawberry",
    title: "Mission Strawberry",
    date: "2025-10-03",
    alt: "E holds fresh strawberries to D's face, then runs a strawberry-jelly machine, then presents a strawberry aioli super sandwich in a chef's coat.",
    width: 2000,
    height: 784,
  },
  {
    slug: "the-silent-treatment",
    title: "The Silent Treatment",
    date: "2025-10-10",
    alt: "D apologizes to Haku for taking down the bird feeder. Haku turns away, tail flicking, and D says the cat is not talking to them.",
    width: 2000,
    height: 784,
  },
  {
    slug: "a-helpful-diagnosis",
    title: "A Helpful Diagnosis",
    date: "2025-10-17",
    alt: "D tells E they went to the doctor about tinnitus. Asked what the doctor said, D answers that they have tinnitus.",
    width: 2000,
    height: 784,
  },
  {
    slug: "the-intrepid-haku",
    title: "The Intrepid Haku",
    date: "2025-10-24",
    alt: "Haku sleeps in a tiny plane over the ocean, captioned as hour fourteen of a trans-ocean flight. The last panel shows the cat asleep in a cardboard box while E says it is good the box has autopilot.",
    width: 2000,
    height: 784,
  },
  {
    slug: "okay-saturday",
    title: "Okay! Saturday!",
    date: "2025-10-31",
    alt: "D, tangled in a Saturday list of saxophone, comics, books, and bread, drops everything when someone asks about video games.",
    width: 2000,
    height: 784,
  },
  {
    slug: "floor-treats",
    title: "Floor Treats",
    date: "2025-11-07",
    alt: "Moo stares at a speck and wonders if it is a floor treat or a bug, licks the floor, and decides it is both.",
    width: 2000,
    height: 784,
  },
  {
    slug: "what-are-we-having",
    title: "What Are We Having",
    date: "2025-11-14",
    alt: "A duck asks what they are having. Across the table, Moo in a chef's hat drools and grips a cleaver.",
    width: 2000,
    height: 2000,
  },
  {
    slug: "happy-holidays",
    title: "Happy Holidays",
    date: "2025-12-21",
    alt: "D and E wish happy holidays. Moo is tangled in lights, E holds a candy cane and a skull in a Santa hat, and a small crowned cat sits on a present.",
    width: 2000,
    height: 2000,
  },
];
