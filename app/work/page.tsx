import type { Metadata } from "next";
import { WorkGallery } from "@/components/WorkGallery";
import { getArtworks } from "@/lib/artworks";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Nine drawings by Danny Stief: D-953, Guqin, For Dexter, Jet-set Overspray, Too Sheer?, Bot Boop, Gachapon Traveler, Bubble-matic, and Ground Ball.",
};

export default function WorkPage() {
  return <WorkGallery artworks={getArtworks()} />;
}
