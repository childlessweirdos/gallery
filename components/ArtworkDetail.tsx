import Image from "next/image";
import Link from "next/link";
import { ArtworkInspect } from "@/components/ArtworkInspect";
import { PrintInterest } from "@/components/PrintInterest";
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
            {artwork.collections?.length ? (
              <div>
                <dt className="text-ink/55">Collection</dt>
                <dd>{artwork.collections.join(", ")}</dd>
              </div>
            ) : null}
          </dl>
          <p className="mt-6 max-w-[26ch] font-sans text-sm leading-relaxed">
            {artwork.picture?.note ?? "Photograph of the drawing, developed to sRGB."}
          </p>
          {artwork.picture?.calibration ? (
            <p className="mt-3 max-w-[26ch] font-sans text-sm leading-relaxed">
              {artwork.picture.calibration.measures} On the card, mean ΔE{" "}
              {artwork.picture.calibration.meanBefore} to{" "}
              {artwork.picture.calibration.meanAfter}.
            </p>
          ) : null}
          {artwork.picture?.swatch ? (
            <figure className="mt-5">
              <figcaption className="font-mono text-[11px] uppercase tracking-[0.14em]">
                Colors from this drawing
              </figcaption>
              <Image
                src={artwork.picture.swatch}
                alt="Colors measured in this drawing. Paper first. Wider bands cover more of the sheet."
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
    </article>
  );
}
