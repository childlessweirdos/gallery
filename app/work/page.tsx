import type { Metadata } from "next";
import { WorkGallery } from "@/components/WorkGallery";
import { getArtworks } from "@/lib/artworks";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Ten drawings by Danny Stief: D-953, Guqin, For Dexter, Jet-set Overspray, Too Sheer?, Bot Boop, Gachapon Traveler, Bubble-matic, Ground Ball, and It's a Limited Edition.",
};

export default function WorkPage() {
  return <WorkGallery artworks={getArtworks()} />;
}
