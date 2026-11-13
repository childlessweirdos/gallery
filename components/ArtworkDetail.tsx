import Image from "next/image";
import Link from "next/link";
import { ArtworkInspect } from "@/components/ArtworkInspect";
import { ListSignup } from "@/components/ListSignup";
import { PrintInterest } from "@/components/PrintInterest";
import { getArtworkCollections } from "@/lib/collections";
import type { Artwork } from "@/lib/types";

export function ArtworkDetail({
  artwork,
  previous,
  next,
}: {
  artwork: Artwork;
  previous?: Artwork;
  next?: Artwork;
}) {
  const collections = getArtworkCollections(artwork.slug);

  return (
    <article className="mx-auto max-w-6xl">
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-12">
        <div className="order-2 flex justify-center lg:order-1 lg:justify-start">
          <ArtworkInspect
            image={artwork.image}
            alt={artwork.altText}
            title={artwork.title}
            priority
            sizes="(min-width: 1024px) 70vw, 100vw"
          />
        </div>
        <div className="order-1 lg:order-2">
          <h1 className="font-display text-5xl leading-[0.9] tracking-[-0.03em]">
            {artwork.title}
          </h1>
          <dl className="mt-6 space-y-3 font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em]">
            <div>
              <dt className="text-ink/55">Year</dt>
              <dd>{artwork.year}</dd>
            </div>
            {artwork.medium ? (
              <div>
                <dt className="text-ink/55">Medium</dt>
                <dd className="normal-case tracking-normal">{artwork.medium}</dd>
              </div>
            ) : null}
            {artwork.dimensions ? (
              <div>
                <dt className="text-ink/55">Sheet</dt>
                <dd className="normal-case tracking-normal">{artwork.dimensions}</dd>
              </div>
            ) : null}
            {collections.length ? (
              <div>
                <dt className="text-ink/55">
                  {collections.length === 1 ? "Collection" : "Collections"}
                </dt>
                <dd>
                  {collections.map((collection, index) => (
                    <span key={collection.id}>
                      {index > 0 ? ", " : null}
                      <Link href={`/work/${collection.slug}`} className="ink-link">
                        {collection.title}
                      </Link>
                    </span>
                  ))}
                </dd>
              </div>
            ) : null}
          </dl>
          <p className="mt-6 max-w-[26ch] font-sans text-sm leading-relaxed">
            {artwork.picture?.note ?? "Photograph of the illustration, developed to sRGB."}
          </p>
          {artwork.picture?.swatch ? (
            <figure className="mt-5">
              <figcaption className="font-mono text-[11px] uppercase tracking-[0.14em]">
                Colors from this illustration
              </figcaption>
              <Image
                src={artwork.picture.swatch}
                alt="Colors measured in this illustration. Paper first. Wider bands cover more of the sheet."
                unoptimized
                className="mt-2 h-auto w-full"
              />
            </figure>
          ) : null}
          <div className="hidden lg:block">
            <PrintInterest slug={artwork.slug} title={artwork.title} idSuffix="-desk" />
          </div>
        </div>
      </div>
      <nav className="mt-5 flex items-baseline justify-between gap-6 border-t border-ink pt-3 font-mono text-[11px] uppercase tracking-[0.16em]">
        {previous ? (
          <Link href={`/work/${previous.slug}`}>Previous · {previous.title}</Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/work/${next.slug}`} className="text-right">
            Next · {next.title}
          </Link>
        ) : (
          <span />
        )}
      </nav>
      <div className="lg:hidden">
        <PrintInterest slug={artwork.slug} title={artwork.title} idSuffix="-phone" />
      </div>
      <ListSignup className="mt-8" />
    </article>
  );
}
