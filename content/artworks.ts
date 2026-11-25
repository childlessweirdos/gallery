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
import itsALimitedEdition from "@/public/art/its-a-limited-edition.jpg";
import itsALimitedEditionSwatch from "@/public/art/its-a-limited-edition-swatch.png";
import listeningParty from "@/public/art/listening-party.jpg";
import listeningPartySwatch from "@/public/art/listening-party-swatch.png";
import sameSorta from "@/public/art/same-sorta.jpg";
import sameSortaSwatch from "@/public/art/same-sorta-swatch.png";
import soYouveArrived from "@/public/art/so-youve-arrived.jpg";
import soYouveArrivedSwatch from "@/public/art/so-youve-arrived-swatch.png";
import echoMyLocation from "@/public/art/echo-my-location.jpg";
import echoMyLocationSwatch from "@/public/art/echo-my-location-swatch.png";
import ohMyPaperStars from "@/public/art/oh-my-paper-stars.jpg";
import ohMyPaperStarsSwatch from "@/public/art/oh-my-paper-stars-swatch.png";
import mindTheVoid from "@/public/art/mind-the-void.jpg";
import mindTheVoidSwatch from "@/public/art/mind-the-void-swatch.png";
import thoughtsInBloom from "@/public/art/thoughts-in-bloom.jpg";
import thoughtsInBloomSwatch from "@/public/art/thoughts-in-bloom-swatch.png";
import emiGlamourOrBedHead from "@/public/art/emi-glamour-or-bed-head.jpg";
import emiGlamourOrBedHeadSwatch from "@/public/art/emi-glamour-or-bed-head-swatch.png";
import itsKindOfAGlowUp from "@/public/art/its-kind-of-a-glow-up.jpg";
import itsKindOfAGlowUpSwatch from "@/public/art/its-kind-of-a-glow-up-swatch.png";
import gonnaPoutAboutIt from "@/public/art/gonna-pout-about-it.jpg";
import gonnaPoutAboutItSwatch from "@/public/art/gonna-pout-about-it-swatch.png";
import justCutToTheCheese from "@/public/art/just-cut-to-the-cheese.jpg";
import justCutToTheCheeseSwatch from "@/public/art/just-cut-to-the-cheese-swatch.png";
import pleaseAdjustYourSet from "@/public/art/please-adjust-your-set.jpg";
import pleaseAdjustYourSetSwatch from "@/public/art/please-adjust-your-set-swatch.png";
import d953Preview from "@/public/art/gallery/d-953.jpg";
import guqinPreview from "@/public/art/gallery/guqin.jpg";
import forDexterPreview from "@/public/art/gallery/for-dexter.jpg";
import jetSetOversprayPreview from "@/public/art/gallery/jet-set-overspray.jpg";
import tooShearPreview from "@/public/art/gallery/too-shear.jpg";
import botBoopPreview from "@/public/art/gallery/bot-boop.jpg";
import gachaponTravelerPreview from "@/public/art/gallery/gachapon-traveler.jpg";
import bubbleMaticPreview from "@/public/art/gallery/bubble-matic.jpg";
import groundBallPreview from "@/public/art/gallery/ground-ball.jpg";
import itsALimitedEditionPreview from "@/public/art/gallery/its-a-limited-edition.jpg";
import listeningPartyPreview from "@/public/art/gallery/listening-party.jpg";
import sameSortaPreview from "@/public/art/gallery/same-sorta.jpg";
import soYouveArrivedPreview from "@/public/art/gallery/so-youve-arrived.jpg";
import echoMyLocationPreview from "@/public/art/gallery/echo-my-location.jpg";
import ohMyPaperStarsPreview from "@/public/art/gallery/oh-my-paper-stars.jpg";
import mindTheVoidPreview from "@/public/art/gallery/mind-the-void.jpg";
import thoughtsInBloomPreview from "@/public/art/gallery/thoughts-in-bloom.jpg";
import emiGlamourOrBedHeadPreview from "@/public/art/gallery/emi-glamour-or-bed-head.jpg";
import itsKindOfAGlowUpPreview from "@/public/art/gallery/its-kind-of-a-glow-up.jpg";
import gonnaPoutAboutItPreview from "@/public/art/gallery/gonna-pout-about-it.jpg";
import justCutToTheCheesePreview from "@/public/art/gallery/just-cut-to-the-cheese.jpg";
import pleaseAdjustYourSetPreview from "@/public/art/gallery/please-adjust-your-set.jpg";
import type { StaticImageData } from "next/image";

// Every piece on the wall right now is this pad.
const medium =
  "Graphite, alcohol marker, and colored pencil on Canson XL Mixed Media, 98 lb, 9 × 12 in. Linework with a G-pen (Gペン) and an A-pen (丸ペンA〈硬筆〉), in Deleter Black 4 (デリーターブラック4) and Deleter White 2 (デリーターホワイト2).";

function pictureFor(swatch: StaticImageData) {
  return {
    note: "Photograph of the illustration, developed to sRGB.",
    swatch,
  };
}

/**
 * One object per piece. To add a work: put a TIFF in masters/ named after
 * the slug, run `npm run images`, then add an entry here.
 * To hang it in a collection, add the slug to content/collections.ts.
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
    picture: pictureFor(d953Swatch),
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
    picture: pictureFor(guqinSwatch),
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
    picture: pictureFor(forDexterSwatch),
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
    picture: pictureFor(jetSetOverspraySwatch),
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
    picture: pictureFor(botBoopSwatch),
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
    picture: pictureFor(bubbleMaticSwatch),
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
    picture: pictureFor(groundBallSwatch),
  },
  {
    id: "its-a-limited-edition",
    slug: "its-a-limited-edition",
    title: "It's a Limited Edition",
    year: 2026,
    image: itsALimitedEdition,
    thumbnail: itsALimitedEditionPreview,
    imageWidth: itsALimitedEdition.width,
    imageHeight: itsALimitedEdition.height,
    altText:
      "A pink-skinned figure with orange hair in a high ponytail and purple sunglasses sits barefoot in a yellow dress on a round purple creature with a white face and teeth, a red phone at their ear.",
    displayOrder: 10,
    medium,
    dimensions: "13.38 × 19.18 in",
    picture: pictureFor(itsALimitedEditionSwatch),
  },
  {
    id: "listening-party",
    slug: "listening-party",
    title: "Listening Party",
    year: 2026,
    image: listeningParty,
    thumbnail: listeningPartyPreview,
    imageWidth: listeningParty.width,
    imageHeight: listeningParty.height,
    altText:
      "A figure with curly gray-green hair and glasses sits on a stool in a teal hoodie and red top, chin on one hand, teal leg warmers over orange sneakers, a turntable and a crate labeled Herb's against a green panel.",
    displayOrder: 11,
    medium,
    dimensions: "12.69 × 17.58 in",
    picture: pictureFor(listeningPartySwatch),
  },
  {
    id: "same-sorta",
    slug: "same-sorta",
    title: "Same Sorta",
    year: 2026,
    image: sameSorta,
    thumbnail: sameSortaPreview,
    imageWidth: sameSorta.width,
    imageHeight: sameSorta.height,
    altText:
      "A green-skinned figure with pointed ears, curly gray hair, and glasses stands barefoot in a magenta geometric skirt and an orange wrap, one hand at their chin, beside a carved wooden Buddha.",
    displayOrder: 12,
    medium,
    dimensions: "12.01 × 17.94 in",
    picture: pictureFor(sameSortaSwatch),
  },
  {
    id: "so-youve-arrived",
    slug: "so-youve-arrived",
    title: "So You've Arrived",
    year: 2026,
    image: soYouveArrived,
    thumbnail: soYouveArrivedPreview,
    imageWidth: soYouveArrived.width,
    imageHeight: soYouveArrived.height,
    altText:
      "A green-skinned figure with curly hair and glasses hangs barefoot in an olive dress, arms behind their head, a red sash down the center and one knee lifted, an anklet on that ankle, against a dark green circle.",
    displayOrder: 13,
    medium,
    dimensions: "12.82 × 18.21 in",
    picture: pictureFor(soYouveArrivedSwatch),
  },
  {
    id: "echo-my-location",
    slug: "echo-my-location",
    title: "Echo My Location",
    year: 2026,
    image: echoMyLocation,
    thumbnail: echoMyLocationPreview,
    imageWidth: echoMyLocation.width,
    imageHeight: echoMyLocation.height,
    altText:
      "A brown-skinned figure with gray hair pinned in a bun and a gold hoop earring kneels in a dark green sleeveless dress with pink frog closures, playing a three-stringed lute with a square white body, against a yellow panel of concentric arcs.",
    displayOrder: 14,
    medium,
    dimensions: "13.09 × 18.66 in",
    picture: pictureFor(echoMyLocationSwatch),
  },
  {
    id: "oh-my-paper-stars",
    slug: "oh-my-paper-stars",
    title: "Oh My Paper Stars",
    year: 2026,
    image: ohMyPaperStars,
    thumbnail: ohMyPaperStarsPreview,
    imageWidth: ohMyPaperStars.width,
    imageHeight: ohMyPaperStars.height,
    altText:
      "A figure with short gray hair reclines barefoot in a magenta bodysuit and gray tights, a teal ukulele dotted with yellow stars across their lap, inside a yellow crescent moon with a closed eye and a mouth, against a blue field of stars.",
    displayOrder: 15,
    medium,
    dimensions: "12.59 × 16.56 in",
    picture: pictureFor(ohMyPaperStarsSwatch),
  },
  {
    id: "mind-the-void",
    slug: "mind-the-void",
    title: "Mind The Void",
    year: 2026,
    image: mindTheVoid,
    thumbnail: mindTheVoidPreview,
    imageWidth: mindTheVoid.width,
    imageHeight: mindTheVoid.height,
    altText:
      "A figure with long brown hair and a dangling earring reclines barefoot in a purple off-shoulder top, a chartreuse tank, and cuffed blue trousers, one sole toward the viewer, against a salmon panel and a teal spiral falling into a black center.",
    displayOrder: 16,
    medium,
    dimensions: "13.08 × 16.96 in",
    picture: pictureFor(mindTheVoidSwatch),
  },
  {
    id: "thoughts-in-bloom",
    slug: "thoughts-in-bloom",
    title: "Thoughts in Bloom",
    year: 2026,
    image: thoughtsInBloom,
    thumbnail: thoughtsInBloomPreview,
    imageWidth: thoughtsInBloom.width,
    imageHeight: thoughtsInBloom.height,
    altText:
      "A figure with short brown hair sits barefoot on a wooden stool, hands clasped between their knees, in a pink tank top, blue shorts, and a yellow jacket tied at the waist, looking up, framed by magenta peonies and green vines on a dark green oval.",
    displayOrder: 17,
    medium,
    dimensions: "12.65 × 17.06 in",
    picture: pictureFor(thoughtsInBloomSwatch),
  },
  {
    id: "emi-glamour-or-bed-head",
    slug: "emi-glamour-or-bed-head",
    title: "Emi - Glamour or Bed Head?",
    year: 2026,
    image: emiGlamourOrBedHead,
    thumbnail: emiGlamourOrBedHeadPreview,
    imageWidth: emiGlamourOrBedHead.width,
    imageHeight: emiGlamourOrBedHead.height,
    altText:
      "A figure with long orange hair piled loosely, strands across the face and shoulders, wears yellow eyeshadow, long silver earrings, and a teal zip-front crop top, against a green panel.",
    displayOrder: 18,
    medium,
    dimensions: "12.67 × 16.35 in",
    picture: pictureFor(emiGlamourOrBedHeadSwatch),
  },
  {
    id: "its-kind-of-a-glow-up",
    slug: "its-kind-of-a-glow-up",
    title: "It's Kind of a Glow Up",
    year: 2026,
    image: itsKindOfAGlowUp,
    thumbnail: itsKindOfAGlowUpPreview,
    imageWidth: itsKindOfAGlowUp.width,
    imageHeight: itsKindOfAGlowUp.height,
    altText:
      "A figure with curly hair and round glasses sits barefoot among oversized mushrooms, chin on one hand, in a gray hoodie printed with small mushrooms and a long turquoise skirt.",
    displayOrder: 19,
    medium,
    dimensions: "12.97 × 18.69 in",
    picture: pictureFor(itsKindOfAGlowUpSwatch),
  },
  {
    id: "gonna-pout-about-it",
    slug: "gonna-pout-about-it",
    title: "Gonna Pout About It",
    year: 2026,
    image: gonnaPoutAboutIt,
    thumbnail: gonnaPoutAboutItPreview,
    imageWidth: gonnaPoutAboutIt.width,
    imageHeight: gonnaPoutAboutIt.height,
    altText:
      "A figure with gray curly hair piled up and pinned with a green pencil, thick white glasses, a gold nose ring, and small hoop earrings purses their lips, in a pink off-the-shoulder shirt against a dark green rectangle.",
    displayOrder: 20,
    medium,
    dimensions: "13.1 × 17.92 in",
    picture: pictureFor(gonnaPoutAboutItSwatch),
  },
  {
    id: "just-cut-to-the-cheese",
    slug: "just-cut-to-the-cheese",
    title: "Just Cut to the Cheese",
    year: 2026,
    image: justCutToTheCheese,
    thumbnail: justCutToTheCheesePreview,
    imageWidth: justCutToTheCheese.width,
    imageHeight: justCutToTheCheese.height,
    altText:
      "A figure with shoulder-length brown hair and thick glasses, in a white collared shirt, blue vest, and dark jacket, holds a large knife and reaches toward a cheese board of cheddar, brie, swiss, and purple grapes on a round wooden table, against an orange rectangle.",
    displayOrder: 21,
    medium,
    dimensions: "13.16 × 16.81 in",
    picture: pictureFor(justCutToTheCheeseSwatch),
  },
  {
    id: "please-adjust-your-set",
    slug: "please-adjust-your-set",
    title: "Please Adjust Your Set",
    year: 2026,
    image: pleaseAdjustYourSet,
    thumbnail: pleaseAdjustYourSetPreview,
    imageWidth: pleaseAdjustYourSet.width,
    imageHeight: pleaseAdjustYourSet.height,
    altText:
      "A figure with curly hair in two buns, thick square glasses, and gold drop earrings sits barefoot on a wood television in a pink sleeveless turtleneck bodysuit, one hand behind their head, the screen and a panel behind them showing yellow, teal, olive, magenta, and blue bars.",
    displayOrder: 22,
    medium,
    dimensions: "12.77 × 18.06 in",
    picture: pictureFor(pleaseAdjustYourSetSwatch),
  },
];
