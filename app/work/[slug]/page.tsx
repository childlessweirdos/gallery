import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArtworkDetail } from "@/components/ArtworkDetail";
import { CollectionGallery } from "@/components/CollectionGallery";
import { site } from "@/content/site";
import { getArtworks, getBySlug, getNeighbors } from "@/lib/artworks";
import {
  getCollection,
  getCollectionArtworks,
  getCollections,
} from "@/lib/collections";

export function generateStaticParams() {
  return [
    ...getArtworks().map((artwork) => ({ slug: artwork.slug })),
    ...getCollections().map((collection) => ({ slug: collection.slug })),
  ];
}

export const instant = false;

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (collection) {
    const description =
      collection.description ?? `${collection.title}, drawings by ${site.artist}.`;
    return {
      title: collection.title,
      description,
      openGraph: {
        title: `${collection.title} — ${site.name}`,
        description,
      },
    };
  }

  const artwork = getBySlug(slug);
  if (!artwork) return {};

  const description = artwork.artistNote ?? artwork.altText;

  return {
    title: artwork.title,
    description,
    openGraph: {
      title: `${artwork.title} — ${site.name}`,
      description,
      images: [
        {
          url: artwork.image.src,
          width: artwork.imageWidth,
          height: artwork.imageHeight,
          alt: artwork.altText,
        },
      ],
    },
  };
}

export default async function ArtworkPage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (collection) {
    return (
      <CollectionGallery
        collection={collection}
        artworks={getCollectionArtworks(collection)}
      />
    );
  }

  const artwork = getBySlug(slug);
  if (!artwork) notFound();

  const { previous, next } = getNeighbors(slug);

  return (
    <ArtworkDetail artwork={artwork} previous={previous} next={next} />
  );
}
