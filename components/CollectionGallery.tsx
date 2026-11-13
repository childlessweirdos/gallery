import Link from "next/link";
import { WorkGallery } from "@/components/WorkGallery";
import type { Collection } from "@/lib/collections";
import type { Artwork } from "@/lib/types";

function countLine(count: number): string {
  const words = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight"];
  const word = words[count - 1] ?? String(count);
  return `${word} drawing${count === 1 ? "" : "s"}.`;
}

export function CollectionGallery({
  collection,
  artworks,
}: {
  collection: Collection;
  artworks: Artwork[];
}) {
  return (
    <div>
      <header>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em]">
          <Link href="/work" className="ink-link">
            Gallery
          </Link>
        </p>
        <h1 className="mt-4 font-display text-5xl leading-[0.9] tracking-[-0.03em]">
          {collection.title}
        </h1>
        {collection.description ? (
          <p className="mt-4 max-w-md font-sans text-sm leading-relaxed">
            {collection.description}
          </p>
        ) : null}
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/55">
          {countLine(artworks.length)}
        </p>
      </header>
      <div className="mt-8">
        <WorkGallery artworks={artworks} />
      </div>
    </div>
  );
}
