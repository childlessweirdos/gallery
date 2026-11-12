import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StripReader } from "@/components/StripReader";
import { site } from "@/content/site";
import {
  formatStripDate,
  getStrip,
  getStripNeighbors,
  getStrips,
  stripSrc,
} from "@/lib/strips";

export function generateStaticParams() {
  return getStrips().map((strip) => ({ slug: strip.slug }));
}

export const instant = false;

export async function generateMetadata({
  params,
}: PageProps<"/comics/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const strip = getStrip(slug);
  if (!strip) return {};

  const description = `${strip.title}. ${formatStripDate(strip.date)}.`;

  return {
    title: strip.title,
    description,
    openGraph: {
      title: `${strip.title} — ${site.name}`,
      description,
      images: [
        {
          url: stripSrc(strip.slug),
          width: strip.width,
          height: strip.height,
          alt: strip.alt,
        },
      ],
    },
  };
}

export default async function StripPage({
  params,
}: PageProps<"/comics/[slug]">) {
  const { slug } = await params;
  const strip = getStrip(slug);
  if (!strip) notFound();

  const { previous, next } = getStripNeighbors(slug);

  return <StripReader strip={strip} previous={previous} next={next} />;
}
