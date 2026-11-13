import type { Metadata } from "next";
import { CollectionBoard } from "@/components/CollectionBoard";
import { getCollectionArtworks, getCollections } from "@/lib/collections";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Drawings by Danny Stief, hung in collections: Out of This World, BYOM, and Beautifully Strange.",
};

export default function WorkPage() {
  const collections = getCollections().map((collection) => ({
    collection,
    artworks: getCollectionArtworks(collection),
  }));

  return <CollectionBoard collections={collections} />;
}
