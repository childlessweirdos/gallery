import type { Artwork } from "@/lib/types";
import d953 from "@/public/art/d-953.jpg";
import d953Swatch from "@/public/art/d-953-swatch.png";
import guqin from "@/public/art/guqin.jpg";
import guqinSwatch from "@/public/art/guqin-swatch.png";
import forDexter from "@/public/art/for-dexter.jpg";
import forDexterSwatch from "@/public/art/for-dexter-swatch.png";
import jetSetOverspray from "@/public/art/jet-set-overspray.jpg";
import jetSetOverspraySwatch from "@/public/art/jet-set-overspray-swatch.png";
import tooShear from "@/public/art/too-shear.jpg";
import tooShearSwatch from "@/public/art/too-shear-swatch.png";
import botBoop from "@/public/art/bot-boop.jpg";
import botBoopSwatch from "@/public/art/bot-boop-swatch.png";
import gachaponTraveler from "@/public/art/gachapon-traveler.jpg";
import gachaponTravelerSwatch from "@/public/art/gachapon-traveler-swatch.png";
import bubbleMatic from "@/public/art/bubble-matic.jpg";
import bubbleMaticSwatch from "@/public/art/bubble-matic-swatch.png";
import groundBall from "@/public/art/ground-ball.jpg";
import groundBallSwatch from "@/public/art/ground-ball-swatch.png";
import d953Preview from "@/public/art/gallery/d-953.jpg";
import guqinPreview from "@/public/art/gallery/guqin.jpg";
import forDexterPreview from "@/public/art/gallery/for-dexter.jpg";
import jetSetOversprayPreview from "@/public/art/gallery/jet-set-overspray.jpg";
import tooShearPreview from "@/public/art/gallery/too-shear.jpg";
import botBoopPreview from "@/public/art/gallery/bot-boop.jpg";
import gachaponTravelerPreview from "@/public/art/gallery/gachapon-traveler.jpg";
import bubbleMaticPreview from "@/public/art/gallery/bubble-matic.jpg";
import groundBallPreview from "@/public/art/gallery/ground-ball.jpg";
import type { StaticImageData } from "next/image";

const medium =
  "Graphite, alcohol marker, ink, and colored pencil on paper";

function pictureFor(swatch: StaticImageData, meanAfter?: number) {
  return {
    note: "Photograph of the drawing, developed to sRGB.",
    ...(meanAfter === undefined
      ? {}
      : {
          calibration: {
            measures:
              "The Nix card from this camera and light, not this drawing.",
            meanBefore: 8.2,
            meanAfter,
          },
        }),
    swatch,
  };
}

/**
 * One object per piece. To add a work: put a TIFF in masters/ named after
 * the slug, run `npm run images`, then add an entry here.
 */
export const artworks: Artwork[] = [
  {
    id: "d-953",
    slug: "d-953",
    title: "D-953",
    year: 2026,
    image: d953,
    thumbnail: d953Preview,
    imageWidth: d953.width,
    imageHeight: d953.height,
    altText:
      "A green-skinned figure with purple hair sits barefoot in a teal jacket and pink top, a rocket and an orange sun behind them. The collar plate reads D-953.",
    displayOrder: 1,
    featured: true,
    medium,
    dimensions: "13.38 × 17.46 in",
    picture: pictureFor(d953Swatch, 6.3),
  },
  {
    id: "guqin",
    slug: "guqin",
    title: "Guqin",
    year: 2026,
    image: guqin,
    thumbnail: guqinPreview,
    imageWidth: guqin.width,
    imageHeight: guqin.height,
    altText:
      "A seated figure with gray hair in a bun and glasses plays a guqin, wearing a pink top, a magenta robe, and green trousers, against an orange disc.",
    displayOrder: 2,
    medium,
    dimensions: "13.15 × 17.74 in",
    picture: pictureFor(guqinSwatch, 6.2),
  },
  {
    id: "for-dexter",
    slug: "for-dexter",
    title: "For Dexter",
    year: 2026,
    image: forDexter,
    thumbnail: forDexterPreview,
    imageWidth: forDexter.width,
    imageHeight: forDexter.height,
    altText:
      "A seated figure in a pale yellow blazer, burgundy skirt, and platform boots holds a saxophone and a lit cigarette, with a teal panel behind them.",
    displayOrder: 3,
    medium,
    dimensions: "12.74 × 17.18 in",
    picture: pictureFor(forDexterSwatch, 6.3),
    collections: ["Jazz & Rhythm"],
  },
  {
    id: "jet-set-overspray",
    slug: "jet-set-overspray",
    title: "Jet-set Overspray",
    year: 2026,
    image: jetSetOverspray,
    thumbnail: jetSetOversprayPreview,
    imageWidth: jetSetOverspray.width,
    imageHeight: jetSetOverspray.height,
    altText:
      "A figure with antennae and headphones wears a pale blue tunic and blue-striped thigh-high socks, spraying a yellow burst from a can. A yellow panel and pink marks are behind them.",
    displayOrder: 4,
    medium,
    dimensions: "10.82 × 15.12 in",
    picture: pictureFor(jetSetOverspraySwatch, 6.3),
  },
  {
    id: "too-shear",
    slug: "too-shear",
    title: "Too Sheer?",
    year: 2026,
    image: tooShear,
    thumbnail: tooShearPreview,
    imageWidth: tooShear.width,
    imageHeight: tooShear.height,
    altText:
      "A figure with gray hair in a bun and a forehead jewel holds out a sheer purple dress, standing in front of a red panel in green shoes.",
    displayOrder: 5,
    medium,
    dimensions: "10.68 × 15.18 in",
    picture: pictureFor(tooShearSwatch),
  },
  {
    id: "bot-boop",
    slug: "bot-boop",
    title: "Bot Boop",
    year: 2026,
    image: botBoop,
    thumbnail: botBoopPreview,
    imageWidth: botBoop.width,
    imageHeight: botBoop.height,
    altText:
      "A blue-green figure in a pink halter and shorts points at a small flying robot with a heart on its screen. A magenta panel is behind them, with the word Boop written above the robot.",
    displayOrder: 6,
    medium,
    dimensions: "13.24 × 19.73 in",
    picture: pictureFor(botBoopSwatch, 6.3),
  },
  {
    id: "gachapon-traveler",
    slug: "gachapon-traveler",
    title: "Gachapon Traveler",
    year: 2026,
    image: gachaponTraveler,
    thumbnail: gachaponTravelerPreview,
    imageWidth: gachaponTraveler.width,
    imageHeight: gachaponTraveler.height,
    altText:
      "A blue-skinned figure with pink hair and pointed ears walks barefoot in an orange tank top and olive trousers, a pink gachapon machine strapped to their back. An orange panel is behind them.",
    displayOrder: 7,
    medium,
    dimensions: "12.79 × 17.11 in",
    picture: pictureFor(gachaponTravelerSwatch),
  },
  {
    id: "bubble-matic",
    slug: "bubble-matic",
    title: "Bubble-matic",
    year: 2026,
    image: bubbleMatic,
    thumbnail: bubbleMaticPreview,
    imageWidth: bubbleMatic.width,
    imageHeight: bubbleMatic.height,
    altText:
      "A magenta-skinned figure with white hair and pointed ears plays a pipe that blows green bubbles, barefoot in a yellow wrap and brown shawl, in front of a green building.",
    displayOrder: 8,
    medium,
    dimensions: "11.71 × 15.78 in",
    picture: pictureFor(bubbleMaticSwatch, 6.3),
  },
  {
    id: "ground-ball",
    slug: "ground-ball",
    title: "Ground Ball",
    year: 2026,
    image: groundBall,
    thumbnail: groundBallPreview,
    imageWidth: groundBall.width,
    imageHeight: groundBall.height,
    altText:
      "A blue-skinned figure in a yellow off-shoulder top, gray pleated skirt, and a yellow cap rests a bat on their shoulder, one bare foot on a baseball. A magenta wedge is behind them.",
    displayOrder: 9,
    medium,
    dimensions: "12.47 × 16.07 in",
    picture: pictureFor(groundBallSwatch, 6.3),
  },
];
