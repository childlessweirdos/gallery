"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Frame } from "@/components/Frame";
import type { Artwork } from "@/lib/types";

const holdMs = 6000;
const fadeMs = 600;

export function HomeLead({ artworks }: { artworks: Artwork[] }) {
  const [index, setIndex] = useState(0);
  const [outgoing, setOutgoing] = useState<number | null>(null);
  const [reduce, setReduce] = useState(false);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const previous = useRef(0);
  pausedRef.current = paused;

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
    if (reduce || count < 2) return;
    let timer = 0;
    const tick = () => {
      if (!pausedRef.current) {
        setIndex((shown) => (shown + 1) % count);
      }
      timer = window.setTimeout(tick, holdMs);
    };
    timer = window.setTimeout(tick, holdMs);
    return () => window.clearTimeout(timer);
  }, [count, reduce]);

  if (!current) return null;

  const next = (index + 1) % count;
  const mounted = new Set<number>([0, index, next]);
  if (outgoing !== null) mounted.add(outgoing);

  return (
    <figure className="lg:col-span-6 lg:col-start-7 lg:self-center">
      <div className="sheet-in">
        <Link
          href={`/work/${current.slug}`}
          className="group inline-block max-w-full"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <Frame>
            <div className="relative">
              {artworks.map((artwork, imageIndex) => {
                if (!mounted.has(imageIndex)) return null;
                const visible = imageIndex === index;
                const flow = imageIndex === 0;
                return (
                  <Image
                    key={artwork.id}
                    src={artwork.image}
                    alt={visible ? artwork.altText : ""}
                    priority={flow}
                    quality={90}
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    fill={flow ? undefined : true}
                    aria-hidden={visible ? undefined : true}
                    className={`object-contain transition-opacity ease-out motion-reduce:transition-none ${
                      flow ? "framed-home lead" : "object-contain"
                    } ${visible ? "opacity-100" : "opacity-0"}`}
                    style={{ transitionDuration: `${fadeMs}ms` }}
                  />
                );
              })}
            </div>
          </Frame>
          <figcaption className="plate-in mt-3 flex items-baseline justify-end gap-3 font-mono text-[11px] uppercase tracking-[0.16em]">
            <span className="ink-link">{current.title}</span>
            <span className="text-ink/55">{current.year}</span>
          </figcaption>
        </Link>
      </div>
    </figure>
  );
}
