"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { getArtworkCollections, getCollections } from "@/lib/collections";
import type { Artwork } from "@/lib/types";

const storageKey = "cw-kiosk-collections";

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
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [chosen, setChosen] = useState<string[]>(() => getCollections().map((collection) => collection.slug));
  const chosenKey = chosen.join("|");
  const [deckKey, setDeckKey] = useState(chosenKey);
  const previous = useRef(0);

  if (chosenKey !== deckKey) {
    setDeckKey(chosenKey);
    setIndex(0);
    setOutgoing(null);
    previous.current = 0;
  }

  const available = getCollections();
  const showing = artworks.filter((artwork) =>
    getArtworkCollections(artwork.slug).some((collection) => chosen.includes(collection.slug)),
  );
  const deck = showing.length ? showing : artworks;
  const count = deck.length;
  const shown = Math.min(index, Math.max(count - 1, 0));
  const current = deck[shown];

  useEffect(() => {
    const slugs = getCollections().map((collection) => collection.slug);
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) ?? "");
      const next = slugs.filter((slug) => Array.isArray(saved) && saved.includes(slug));
      if (next.length) setChosen(next);
    } catch {
      // An empty or old setting just shows every collection.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(storageKey, JSON.stringify(chosen));
  }, [chosen, ready]);

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
    if (reduce || paused || settingsOpen || count < 2) return;
    const timer = window.setTimeout(() => {
      setIndex((shown) => (shown + 1) % count);
    }, holdMs);
    return () => window.clearTimeout(timer);
  }, [count, index, paused, reduce, settingsOpen]);

  useEffect(() => {
    if (!paused) return;
    const timer = window.setTimeout(() => setPaused(false), idleMs);
    return () => window.clearTimeout(timer);
  }, [paused]);

  if (!current) return null;

  const next = (shown + 1) % count;
  const mounted = new Set<number>([shown, next]);
  if (outgoing !== null) mounted.add(outgoing);
  const collections = getArtworkCollections(current.slug);
  const collectionLabel = collections.length === 1 ? "Collection" : "Collections";

  return (
    <div
      className="flex min-h-full cursor-pointer flex-col md:h-full"
      onClick={(event) => {
        if (reduce) return;
        if ((event.target as HTMLElement).closest("[data-kiosk-settings]")) return;
        setPaused((held) => !held);
      }}
    >
      <div className="flex shrink-0 items-baseline justify-between gap-4 px-5 pt-4 font-mono text-[11px] uppercase tracking-[0.16em] sm:px-8 sm:pt-5">
        <span>{site.city}</span>
        <span className="text-ink/55">{site.issue}</span>
        <span className="flex items-baseline gap-3">
          <span data-kiosk-settings>
          <button
            type="button"
            aria-expanded={settingsOpen}
            className="ink-link"
            onClick={() => setSettingsOpen((open) => !open)}
          >
            Show
          </button>
          </span>
          {paused ? <span className="text-vermilion">Held</span> : null}
          <span>{place(shown, count)}</span>
        </span>
      </div>
      {settingsOpen ? (
        <div
          data-kiosk-settings
          className="flex shrink-0 flex-wrap items-baseline gap-x-6 gap-y-2 border-b border-ink px-5 py-3 sm:px-8"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/55">
            Collections in this showing
          </p>
          {available.map((collection) => {
            const checked = chosen.includes(collection.slug);
            const last = checked && chosen.length === 1;
            return (
              <label key={collection.id} className="flex items-baseline gap-2 normal-case tracking-normal">
                <input
                  type="checkbox"
                  className="accent-ink"
                  checked={checked}
                  disabled={last}
                  onChange={() => {
                    setChosen((current) => {
                      const next = checked
                        ? current.filter((slug) => slug !== collection.slug)
                        : [...current, collection.slug];
                      const order = available.map((item) => item.slug);
                      return order.filter((slug) => next.includes(slug));
                    });
                  }}
                />
                <span className="font-display text-lg leading-none tracking-[-0.03em]">
                  {collection.title}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/55">
                  {collection.pieces.length}{" "}
                  {collection.pieces.length === 1 ? "drawing" : "drawings"}
                </span>
              </label>
            );
          })}
        </div>
      ) : null}

      <div className="flex flex-col md:min-h-0 md:flex-1 md:landscape:flex-row">
      <div className="flex h-[56vh] min-w-0 px-5 pb-4 pt-3 sm:px-8 md:h-auto md:min-h-0 md:flex-1 md:landscape:pb-6 md:landscape:pr-4">
        <div className="flex h-full w-full bg-ink p-2 sm:p-2.5">
          <div className="relative h-full w-full bg-[#fbfaf6]">
            <div className="absolute inset-3 sm:inset-5">
              {deck.map((artwork, imageIndex) => {
                if (!mounted.has(imageIndex)) return null;
                const visible = imageIndex === shown;
                return (
                  <Image
                    key={artwork.id}
                    src={artwork.image}
                    alt={visible ? artwork.altText : ""}
                    fill
                    priority={imageIndex === 0}
                    quality={90}
                    sizes="(min-width: 768px) and (orientation: landscape) 60vw, 100vw"
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
        className="shrink-0 border-t border-ink px-5 pb-8 pt-4 sm:px-8 md:pb-6 md:pt-5 md:landscape:min-h-0 md:landscape:w-[min(34rem,40%)] md:landscape:overflow-y-auto md:landscape:border-t-0 md:landscape:border-l md:landscape:py-6"
      >
        <h1 className="font-display text-4xl leading-[0.92] tracking-[-0.03em] md:min-h-[1.84em] md:text-[clamp(2.75rem,4.2vh,4.5rem)] md:landscape:text-[clamp(2.4rem,4.6vh,3.6rem)]">
          {current.title}
        </h1>
        <dl className="mt-4 grid grid-cols-1 gap-3 font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] md:grid-cols-3 md:gap-4">
          <div>
            <dt className="text-ink/55">Year</dt>
            <dd className="mt-1">{current.year}</dd>
          </div>
          <div>
            <dt className="text-ink/55">Sheet</dt>
            <dd className="mt-1 normal-case tracking-normal md:min-h-[2.6em]">
              {current.dimensions ?? "—"}
            </dd>
          </div>
          <div>
            <dt className="text-ink/55">{collectionLabel}</dt>
            <dd className="mt-1 md:min-h-[2.6em]">
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
            <p className="mt-1 font-sans text-sm leading-relaxed md:min-h-[4.5em]">
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
