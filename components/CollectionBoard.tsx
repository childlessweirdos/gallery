"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Frame } from "@/components/Frame";
import type { Collection } from "@/lib/collections";
import type { Artwork } from "@/lib/types";

const holdMs = 6000;
const fadeMs = 600;

function countLine(count: number): string {
  const words = ["One", "Two", "Three", "Four", "Five", "Six"];
  const word = words[count - 1] ?? String(count);
  return `${word} collection${count === 1 ? "" : "s"}.`;
}

function RotatingPreview({
  artworks,
  delayMs,
  paused,
}: {
  artworks: Artwork[];
  delayMs: number;
  paused: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [reduce, setReduce] = useState(false);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduce || artworks.length < 2) return;
    let timer = 0;
    const tick = () => {
      if (!pausedRef.current) {
        setIndex((current) => (current + 1) % artworks.length);
      }
      timer = window.setTimeout(tick, holdMs);
    };
    timer = window.setTimeout(tick, delayMs);
    return () => window.clearTimeout(timer);
  }, [artworks.length, delayMs, reduce]);

  return (
    <div className="relative aspect-square w-full" aria-hidden="true">
      {artworks.map((artwork, imageIndex) => (
        <Image
          key={artwork.id}
          src={artwork.thumbnail ?? artwork.image}
          alt=""
          fill
          sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 90vw"
          priority={imageIndex === 0}
          className={`object-contain transition-opacity ease-out motion-reduce:transition-none ${
            imageIndex === index ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDuration: `${fadeMs}ms` }}
        />
      ))}
    </div>
  );
}

function CollectionCard({
  collection,
  artworks,
  delayMs,
}: {
  collection: Collection;
  artworks: Artwork[];
  delayMs: number;
}) {
  const [paused, setPaused] = useState(false);

  return (
    <li>
      <Link
        href={`/work/${collection.slug}`}
        className="group block"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <Frame className="w-full">
          <RotatingPreview artworks={artworks} delayMs={delayMs} paused={paused} />
        </Frame>
        <h2 className="mt-4 font-display text-3xl leading-none tracking-[-0.03em]">
          <span className="ink-link">{collection.title}</span>
        </h2>
        {collection.subtitle ? (
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/55">
            {collection.subtitle}
          </p>
        ) : null}
      </Link>
    </li>
  );
}

export function CollectionBoard({
  collections,
}: {
  collections: { collection: Collection; artworks: Artwork[] }[];
}) {
  return (
    <div className="mx-auto w-full max-w-6xl pb-4">
      <h1 className="font-display text-5xl leading-[0.9] tracking-[-0.03em]">
        Gallery
      </h1>
      <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em]">
        {countLine(collections.length)}
      </p>
      <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
        {collections.map(({ collection, artworks }, index) => (
          <CollectionCard
            key={collection.id}
            collection={collection}
            artworks={artworks}
            delayMs={holdMs + index * 2000}
          />
        ))}
      </ul>
    </div>
  );
}
