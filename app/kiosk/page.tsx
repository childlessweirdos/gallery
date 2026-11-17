import type { Metadata } from "next";
import { Kiosk } from "@/components/Kiosk";
import { getArtworks } from "@/lib/artworks";

export const metadata: Metadata = {
  title: "Kiosk",
  description: "The drawings, one at a time.",
  robots: { index: false, follow: false },
};

export default function KioskPage() {
  return <Kiosk artworks={getArtworks()} />;
}
