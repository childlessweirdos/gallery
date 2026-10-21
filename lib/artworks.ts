import { artworks } from "@/content/artworks";
import type { Artwork } from "@/lib/types";

export function getArtworks(): Artwork[] {
  return [...artworks].sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getFeatured(): Artwork {
  const featured = getArtworks().find((artwork) => artwork.featured);
  if (!featured) {
    throw new Error("Mark one artwork as featured.");
  }
  return featured;
}

export function getBySlug(slug: string): Artwork | undefined {
  return getArtworks().find((artwork) => artwork.slug === slug);
}

export function getNeighbors(slug: string): {
  previous?: Artwork;
  next?: Artwork;
} {
  const list = getArtworks();
  const index = list.findIndex((artwork) => artwork.slug === slug);
  if (index === -1) return {};
  return {
    previous: index > 0 ? list[index - 1] : undefined,
    next: index < list.length - 1 ? list[index + 1] : undefined,
  };
}
