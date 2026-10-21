import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArtworkDetail } from "@/components/ArtworkDetail";
import { site } from "@/content/site";
import { getArtworks, getBySlug, getNeighbors } from "@/lib/artworks";

export function generateStaticParams() {
  return getArtworks().map((artwork) => ({ slug: artwork.slug }));
}

export const instant = false;

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
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
  const artwork = getBySlug(slug);
  if (!artwork) notFound();

  const { previous, next } = getNeighbors(slug);

  return (
    <ArtworkDetail artwork={artwork} previous={previous} next={next} />
  );
}
