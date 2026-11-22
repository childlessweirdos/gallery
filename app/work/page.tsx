import type { Metadata } from "next";
import { CollectionBoard } from "@/components/CollectionBoard";
import { site } from "@/content/site";
import { getCollectionArtworks, getCollections } from "@/lib/collections";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Drawings by ${site.artist}, hung in collections: Out of This World, BYOM, and Beautifully Strange.`,
};

export default function WorkPage() {
  const collections = getCollections().map((collection) => ({
    collection,
    artworks: getCollectionArtworks(collection),
  }));

  return <CollectionBoard collections={collections} />;
}
