import Image from "next/image";
import Link from "next/link";
import type { Artwork } from "@/lib/types";

export function ArtworkCard({
  artwork,
  className = "",
}: {
  artwork: Artwork;
  className?: string;
}) {
  return (
    <article className={className}>
      <Link href={`/work/${artwork.slug}`} className="group block">
        <Image
          src={artwork.image}
          alt={artwork.altText}
          sizes="(min-width: 768px) 42vw, 100vw"
          quality={90}
          className="h-auto w-full"
        />
        <p className="ink-link mt-3 inline-block font-mono text-[11px] uppercase tracking-[0.16em] transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">
          {artwork.title}
          <span className="text-ink/60"> · {artwork.year}</span>
        </p>
      </Link>
    </article>
  );
}
