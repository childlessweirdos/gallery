import Image from "next/image";
import Link from "next/link";
import { Drift } from "@/components/Drift";
import { Frame } from "@/components/Frame";
import { InkMark } from "@/components/InkMark";
import { ScrollRibbon } from "@/components/ScrollRibbon";
import { site } from "@/content/site";
import type { Artwork } from "@/lib/types";

export function HomePage({ artworks }: { artworks: Artwork[] }) {
  const featured = artworks.find((artwork) => artwork.featured) ?? artworks[0];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col pb-5">
      <section className="grid flex-1 grid-cols-1 content-center gap-6 lg:grid-cols-12 lg:items-stretch lg:gap-8 lg:gap-x-8">
        <div className="flex flex-col lg:col-span-6">
          <h1 className="display-title text-[clamp(3.4rem,12vw,7.6rem)] leading-[0.8] tracking-[-0.045em]">
            <span className="mast-line block">Childless</span>
            <span className="mast-line mast-line-2 block pl-[0.7em]">
              Weirdos
            </span>
          </h1>
          <div className="mt-8 lg:mt-auto lg:max-w-[28rem] lg:pb-2">
            <p className="font-display text-[clamp(1.7rem,3vw,2.35rem)] italic leading-[1.05] tracking-[-0.02em]">
              Certified and Licensed
              <br />
              for a Wild Goose Chase
            </p>
            <Drift className="mt-5">
              <InkMark className="w-28" />
            </Drift>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em]">
              Original illustrations by Danny Stief.
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/55">
              <a
                href={site.shanShui}
                target="_blank"
                rel="noreferrer"
                className="ink-link"
              >
                {"{Shan, Shui}*"}
              </a>{" "}
              by Lingdong Huang
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em]">
              <a
                href={site.kofi}
                target="_blank"
                rel="noreferrer"
                className="ink-link"
              >
                Support on Ko-fi
              </a>
            </p>
          </div>
        </div>

        {featured ? (
          <figure className="lg:col-span-6 lg:col-start-7 lg:self-center">
            <div className="sheet-in">
              <Link href={`/work/${featured.slug}`} className="group inline-block max-w-full">
                <Frame>
                  <Image
                    src={featured.image}
                    alt={featured.altText}
                    priority
                    quality={90}
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    className="framed-home lead"
                  />
                </Frame>
                <figcaption className="plate-in mt-3 flex items-baseline justify-end gap-3 font-mono text-[11px] uppercase tracking-[0.16em]">
                  <span className="ink-link">{featured.title}</span>
                  <span className="text-ink/55">{featured.year}</span>
                </figcaption>
              </Link>
            </div>
          </figure>
        ) : null}
      </section>

      <ScrollRibbon />
      <nav
        aria-label="Elsewhere"
        className="grid grid-cols-4 border-t border-ink lg:mt-auto"
      >
        <Link
          href="/work"
          className="border-r border-ink px-2 py-4 text-center font-mono text-[10px] uppercase tracking-[0.14em] hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper sm:text-[11px] sm:tracking-[0.16em]"
        >
          Gallery
        </Link>
        <Link
          href="/contact"
          className="border-r border-ink px-2 py-4 text-center font-mono text-[10px] uppercase tracking-[0.14em] hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper sm:text-[11px] sm:tracking-[0.16em]"
        >
          Contact
        </Link>
        <a
          href={site.comics}
          target="_blank"
          rel="noreferrer"
          className="border-r border-ink px-2 py-4 text-center font-mono text-[10px] uppercase tracking-[0.14em] hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper sm:text-[11px] sm:tracking-[0.16em]"
        >
          Comics
        </a>
        <Link
          href="/aspects-of-fate"
          className="px-2 py-3 text-center font-mono text-[10px] uppercase leading-tight tracking-[0.12em] hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper sm:py-4 sm:text-[11px] sm:tracking-[0.14em]"
        >
          Aspects
          <span className="block">of Fate</span>
        </Link>
      </nav>
    </div>
  );
}
