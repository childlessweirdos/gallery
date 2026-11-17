"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Frame } from "@/components/Frame";
import type { Artwork } from "@/lib/types";

const walkSpeed = 28;

function GalleryPiece({ artwork }: { artwork: Artwork }) {
  return (
    <li className="min-w-0 md:shrink-0">
      <Link
        href={`/work/${artwork.slug}`}
        draggable={false}
        onDragStart={(event) => event.preventDefault()}
        className="group block md:inline-block"
      >
        <Frame className="w-full md:w-auto">
          <Image
            src={artwork.thumbnail ?? artwork.image}
            alt={artwork.altText}
            unoptimized
            draggable={false}
            loading="eager"
            decoding="async"
            className="gallery-sheet"
          />
        </Frame>
        <span className="mt-3 block font-display text-xl leading-[1.05] tracking-[-0.03em] md:text-3xl md:leading-none">
          <span className="ink-link">{artwork.title}</span>
        </span>
        <span className="mt-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-ink/55">
          {artwork.year}
        </span>
      </Link>
    </li>
  );
}

export function WorkGallery({ artworks }: { artworks: Artwork[] }) {
  const rail = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [walk, setWalk] = useState(false);
  const walking = useRef(false);
  walking.current = walk;
  const loop = useRef(0);
  const paused = useRef(false);
  const drag = useRef<{
    x: number;
    y: number;
    origin: number;
    moved: boolean;
  } | null>(null);
  const suppressClick = useRef(false);
  const motion = useRef<{
    currentX: () => number;
    freeze: () => number;
    playFrom: (x: number) => void;
  }>({
    currentX: () => 0,
    freeze: () => 0,
    playFrom: () => {},
  });

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const apply = () => setWalk(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const element = rail.current;
    const row = track.current;
    if (!walk || !element || !row) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let wheelTimer = 0;

    const currentX = () => {
      const transform = getComputedStyle(row).transform;
      if (!transform || transform === "none") return 0;
      return new DOMMatrix(transform).m41;
    };

    const measure = () => {
      const first = row.firstElementChild as HTMLElement | null;
      if (!first) return loop.current;
      const width = first.offsetWidth;
      if (width > 12) loop.current = width;
      return loop.current;
    };

    const playFrom = (x: number) => {
      const width = loop.current;
      row.classList.remove("is-walking");
      row.style.animationPlayState = "";
      row.style.transform = `translate3d(${x}px, 0, 0)`;
      if (reduce || paused.current || width < 12) return;
      const traveled = ((-x % width) + width) % width;
      row.style.animationDuration = `${width / walkSpeed}s`;
      row.style.animationDelay = `${-traveled / walkSpeed}s`;
      void row.offsetWidth;
      row.style.transform = "";
      row.classList.add("is-walking");
    };

    const freeze = () => {
      const x = currentX();
      row.classList.remove("is-walking");
      row.style.transform = `translate3d(${x}px, 0, 0)`;
      return x;
    };

    motion.current = { currentX, freeze, playFrom };
    measure();
    playFrom(0);

    const observer = new ResizeObserver(() => {
      const before = loop.current;
      const width = measure();
      if (width < 12 || Math.abs(width - before) < 1) return;
      if (drag.current?.moved || paused.current) return;
      playFrom(currentX());
    });
    const first = row.firstElementChild;
    if (first) observer.observe(first);

    const onWheel = (event: WheelEvent) => {
      const horizontal =
        Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.shiftKey;
      if (!horizontal) return;
      event.preventDefault();
      const x = freeze() - (event.deltaX || event.deltaY);
      row.style.transform = `translate3d(${x}px, 0, 0)`;
      window.clearTimeout(wheelTimer);
      wheelTimer = window.setTimeout(() => {
        if (!drag.current && !paused.current) playFrom(currentX());
      }, 140);
    };

    element.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.clearTimeout(wheelTimer);
      observer.disconnect();
      element.removeEventListener("wheel", onWheel);
      row.classList.remove("is-walking");
      row.style.transform = "";
    };
  }, [walk]);

  return (
    <div>
      <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/55">
        Select a piece for its details.
      </p>
      <div className="-mx-5 md:-mx-10">
      <div
        ref={rail}
        role="region"
        aria-label="The drawings"
        className="gallery-rail overflow-visible px-5 pb-2 outline-none md:overflow-hidden md:px-10"
        onDragStart={(event) => event.preventDefault()}
        onPointerDown={(event) => {
          if (!walking.current || event.button !== 0) return;
          window.getSelection()?.removeAllRanges();
          drag.current = {
            x: event.clientX,
            y: event.clientY,
            origin: motion.current.freeze(),
            moved: false,
          };
        }}
        onPointerMove={(event) => {
          if (!walking.current) return;
          const current = drag.current;
          const element = rail.current;
          const row = track.current;
          if (!current || !element || !row) return;
          const dx = event.clientX - current.x;
          const dy = event.clientY - current.y;
          if (!current.moved) {
            if (Math.abs(dx) < 6) return;
            if (Math.abs(dx) < Math.abs(dy)) {
              drag.current = null;
              if (!paused.current) motion.current.playFrom(current.origin);
              return;
            }
            current.moved = true;
            window.getSelection()?.removeAllRanges();
            element.setPointerCapture(event.pointerId);
            element.classList.add("is-grabbing");
          }
          row.style.transform = `translate3d(${current.origin + dx}px, 0, 0)`;
        }}
        onPointerUp={() => {
          if (!walking.current) return;
          const moved = drag.current?.moved ?? false;
          drag.current = null;
          rail.current?.classList.remove("is-grabbing");
          if (moved) suppressClick.current = true;
          if (!paused.current) motion.current.playFrom(motion.current.currentX());
        }}
        onPointerCancel={() => {
          if (!walking.current) return;
          drag.current = null;
          rail.current?.classList.remove("is-grabbing");
          if (!paused.current) motion.current.playFrom(motion.current.currentX());
        }}
        onClickCapture={(event) => {
          if (!suppressClick.current) return;
          event.preventDefault();
          event.stopPropagation();
          suppressClick.current = false;
        }}
        onFocusCapture={() => {
          if (!walking.current) return;
          paused.current = true;
          const row = track.current;
          if (!row) return;
          row.style.animationPlayState = "paused";
        }}
        onBlurCapture={(event) => {
          if (!walking.current) return;
          if (event.currentTarget.contains(event.relatedTarget as Node)) return;
          paused.current = false;
          if (!drag.current) motion.current.playFrom(motion.current.currentX());
        }}
      >
        <div ref={track} className="gallery-track w-full md:flex md:w-max md:items-start">
          <ul className="grid w-full grid-cols-2 gap-x-4 gap-y-10 md:flex md:w-max md:shrink-0 md:items-start md:gap-12 md:pr-12">
            {artworks.map((artwork) => (
              <GalleryPiece key={artwork.id} artwork={artwork} />
            ))}
          </ul>
          {walk ? (
            <ul
              className="flex w-max shrink-0 items-start gap-12 pr-12"
              aria-hidden="true"
              inert
            >
              {artworks.map((artwork) => (
                <GalleryPiece key={`${artwork.id}-loop`} artwork={artwork} />
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
    </div>
  );
}
