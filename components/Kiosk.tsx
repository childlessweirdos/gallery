"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { getArtworkCollections } from "@/lib/collections";
import type { Artwork } from "@/lib/types";

const holdMs = 18000;
const fadeMs = 700;
const idleMs = 45000;

function place(index: number, count: number) {
  const width = Math.max(2, String(count).length);
  return `${String(index + 1).padStart(width, "0")} / ${String(count).padStart(width, "0")}`;
}

export function Kiosk({ artworks }: { artworks: Artwork[] }) {
  const [index, setIndex] = useState(0);
  const [outgoing, setOutgoing] = useState<number | null>(null);
  const [reduce, setReduce] = useState(false);
  const [paused, setPaused] = useState(false);
  const previous = useRef(0);

  const count = artworks.length;
  const current = artworks[index];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (previous.current === index) return;
    const leaving = previous.current;
    previous.current = index;
    setOutgoing(leaving);
    const clear = window.setTimeout(() => {
      setOutgoing((shown) => (shown === leaving ? null : shown));
    }, fadeMs);
    return () => window.clearTimeout(clear);
  }, [index]);

  useEffect(() => {
    if (reduce || paused || count < 2) return;
    const timer = window.setTimeout(() => {
      setIndex((shown) => (shown + 1) % count);
    }, holdMs);
    return () => window.clearTimeout(timer);
  }, [count, index, paused, reduce]);

  useEffect(() => {
    if (!paused) return;
    const timer = window.setTimeout(() => setPaused(false), idleMs);
    return () => window.clearTimeout(timer);
  }, [paused]);

  if (!current) return null;

  const next = (index + 1) % count;
  const mounted = new Set<number>([index, next]);
  if (outgoing !== null) mounted.add(outgoing);
  const collections = getArtworkCollections(current.slug);
  const collectionLabel = collections.length === 1 ? "Collection" : "Collections";

  return (
    <div
      className="flex h-full cursor-pointer flex-col"
      role="button"
      tabIndex={0}
      aria-pressed={paused}
      aria-label={
        paused
          ? `${current.title}, held. Click to continue.`
          : `${current.title}. Click to hold.`
      }
      onClick={() => {
        if (reduce) return;
        setPaused((held) => !held);
      }}
      onKeyDown={(event) => {
        if (reduce) return;
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        setPaused((held) => !held);
      }}
    >
      <p className="flex shrink-0 items-baseline justify-between gap-4 px-5 pt-4 font-mono text-[11px] uppercase tracking-[0.16em] sm:px-8 sm:pt-5">
        <span>{site.city}</span>
        <span className="text-ink/55">{site.issue}</span>
        <span className="flex items-baseline gap-3">
          {paused ? <span className="text-vermilion">Held</span> : null}
          <span>{place(index, count)}</span>
        </span>
      </p>

      <div className="flex min-h-0 flex-1 flex-col landscape:flex-row">
      <div className="flex min-h-0 min-w-0 flex-1 px-5 pb-4 pt-3 sm:px-8 landscape:pb-6 landscape:pr-4">
        <div className="flex h-full w-full bg-ink p-2 sm:p-2.5">
          <div className="relative h-full w-full bg-[#fbfaf6]">
            <div className="absolute inset-3 sm:inset-5">
              {artworks.map((artwork, imageIndex) => {
                if (!mounted.has(imageIndex)) return null;
                const visible = imageIndex === index;
                return (
                  <Image
                    key={artwork.id}
                    src={artwork.image}
                    alt={visible ? artwork.altText : ""}
                    fill
                    priority={imageIndex === 0}
                    quality={90}
                    sizes="(orientation: landscape) 60vw, 100vw"
                    aria-hidden={visible ? undefined : true}
                    className={`object-contain transition-opacity ease-out motion-reduce:transition-none ${
                      visible ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transitionDuration: `${fadeMs}ms` }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <section
        aria-live="polite"
        className="shrink-0 border-t border-ink px-5 pb-5 pt-4 sm:px-8 sm:pb-6 sm:pt-5 landscape:min-h-0 landscape:w-[min(34rem,40%)] landscape:overflow-y-auto landscape:border-t-0 landscape:border-l landscape:py-6"
      >
        <h1 className="min-h-[1.84em] font-display text-[clamp(2.75rem,4.2vh,4.5rem)] leading-[0.92] tracking-[-0.03em] landscape:text-[clamp(2.4rem,4.6vh,3.6rem)]">
          {current.title}
        </h1>
        <dl className="mt-4 grid grid-cols-3 gap-4 font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em]">
          <div>
            <dt className="text-ink/55">Year</dt>
            <dd className="mt-1">{current.year}</dd>
          </div>
          <div>
            <dt className="text-ink/55">Sheet</dt>
            <dd className="mt-1 min-h-[2.6em] normal-case tracking-normal">
              {current.dimensions ?? "—"}
            </dd>
          </div>
          <div>
            <dt className="text-ink/55">{collectionLabel}</dt>
            <dd className="mt-1 min-h-[2.6em]">
              {collections.length
                ? collections.map((collection) => collection.title).join(", ")
                : "—"}
            </dd>
          </div>
        </dl>
        {current.medium ? (
          <div className="mt-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/55">
              Medium
            </p>
            <p className="mt-1 min-h-[4.5em] font-sans text-sm leading-relaxed">
              {current.medium}
            </p>
          </div>
        ) : null}
        {current.picture?.swatch ? (
          <figure className="mt-4">
            <figcaption className="font-mono text-[11px] uppercase tracking-[0.14em]">
              Colors from this illustration
            </figcaption>
            <Image
              src={current.picture.swatch}
              alt=""
              unoptimized
              className="mt-2 h-auto w-full"
            />
          </figure>
        ) : null}
        <p className="mt-3 min-h-[1.4em] font-sans text-sm leading-relaxed text-ink/80">
          {current.picture?.note ?? "Photograph of the illustration, developed to sRGB."}
        </p>
      </section>
      </div>
    </div>
  );
}
