import { collections, type Collection } from "@/content/collections";
import { getArtworks } from "@/lib/artworks";
import type { Artwork } from "@/lib/types";

export type { Collection };

export function getCollections(): Collection[] {
  return collections
    .filter((collection) => collection.enabled)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getCollection(slug: string): Collection | undefined {
  return getCollections().find((collection) => collection.slug === slug);
}

export function getCollectionArtworks(collection: Collection): Artwork[] {
  const bySlug = new Map(getArtworks().map((artwork) => [artwork.slug, artwork]));
  return collection.pieces.flatMap((slug) => {
    const artwork = bySlug.get(slug);
    return artwork ? [artwork] : [];
  });
}

export function getArtworkCollections(slug: string): Collection[] {
  return getCollections().filter((collection) => collection.pieces.includes(slug));
}
