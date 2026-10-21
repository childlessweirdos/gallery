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
    imageWidth: d953.width,
    imageHeight: d953.height,
    altText:
      "A green-skinned figure with purple hair sits barefoot in a teal jacket and pink top, a rocket and an orange sun behind them. The collar plate reads D-953.",
    displayOrder: 1,
    featured: true,
    medium,
    dimensions: "13.1 × 17.32 in",
    picture: pictureFor(d953Swatch, 6.2),
  },
  {
    id: "guqin",
    slug: "guqin",
    title: "Guqin",
    year: 2026,
    image: guqin,
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
    imageWidth: forDexter.width,
    imageHeight: forDexter.height,
    altText:
      "A seated figure in a pale yellow blazer, burgundy skirt, and platform boots holds a saxophone and a lit cigarette, with a teal panel behind them.",
    displayOrder: 3,
    medium,
    dimensions: "13.15 × 17.74 in",
    picture: pictureFor(forDexterSwatch, 6.2),
    collections: ["Jazz & Rhythm"],
  },
  {
    id: "jet-set-overspray",
    slug: "jet-set-overspray",
    title: "Jet-set Overspray",
    year: 2026,
    image: jetSetOverspray,
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
    title: "Too Shear?",
    year: 2026,
    image: tooShear,
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
    imageWidth: botBoop.width,
    imageHeight: botBoop.height,
    altText:
      "A blue-green figure in a pink halter and shorts points at a small flying robot with a heart on its screen. A magenta panel is behind them, with the word Boop written above the robot.",
    displayOrder: 6,
    medium,
    dimensions: "12.2 × 16.83 in",
    picture: pictureFor(botBoopSwatch, 6.3),
  },
];
