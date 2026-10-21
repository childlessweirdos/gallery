import type { Metadata } from "next";
import { WorkGallery } from "@/components/WorkGallery";
import { site } from "@/content/site";
import { getArtworks } from "@/lib/artworks";

export const metadata: Metadata = {
  title: "Work",
  description: site.description,
};

export default function WorkPage() {
  return <WorkGallery artworks={getArtworks()} />;
}
