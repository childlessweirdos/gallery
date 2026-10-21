"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Frame } from "@/components/Frame";
import type { Artwork } from "@/lib/types";

const walkSpeed = 28;

function GalleryPiece({
  artwork,
  priority = false,
}: {
  artwork: Artwork;
  priority?: boolean;
}) {
  return (
    <li>
      <Link
        href={`/work/${artwork.slug}`}
        draggable={false}
        onDragStart={(event) => event.preventDefault()}
        className="group inline-block max-w-full"
      >
        <Frame>
          <Image
            src={artwork.image}
            alt={artwork.altText}
            quality={90}
            priority={priority}
            draggable={false}
            sizes="(min-width: 1024px) 320px, 70vw"
            className="gallery-sheet"
          />
        </Frame>
        <span className="mt-3 block font-display text-3xl leading-none tracking-[-0.03em]">
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
  const offset = useRef(0);
  const loop = useRef(0);
  const paused = useRef(false);
  const drag = useRef<{
    x: number;
    y: number;
    offset: number;
    moved: boolean;
  } | null>(null);
  const suppressClick = useRef(false);
  const [grabbing, setGrabbing] = useState(false);

  useEffect(() => {
    const element = rail.current;
    const row = track.current;
    if (!element || !row) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let last = performance.now();

    const measure = () => {
      const first = row.firstElementChild as HTMLElement | null;
      if (!first) return;
      const styles = getComputedStyle(row);
      const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
      loop.current = first.getBoundingClientRect().width + gap;
    };

    const apply = () => {
      const width = loop.current;
      if (width > 0) {
        offset.current = ((offset.current % width) + width) % width;
      }
      row.style.transform = `translate3d(${-offset.current}px, 0, 0)`;
    };

    const tick = (now: number) => {
      const elapsed = Math.min(now - last, 48);
      last = now;
      measure();
      if (!reduce && !paused.current && !drag.current && loop.current > 12) {
        offset.current += walkSpeed * (elapsed / 1000);
      }
      apply();
      frame = requestAnimationFrame(tick);
    };

    const onWheel = (event: WheelEvent) => {
      const horizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.shiftKey;
      if (!horizontal) return;
      event.preventDefault();
      offset.current += event.deltaX || event.deltaY;
      apply();
    };

    element.addEventListener("wheel", onWheel, { passive: false });
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      element.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <div className="-mx-5 md:-mx-10">
      <div
        ref={rail}
        role="region"
        aria-label="The drawings"
        className={`gallery-rail overflow-hidden px-5 pb-8 outline-none md:px-10 ${grabbing ? "cursor-grabbing" : "cursor-grab"}`}
        onDragStart={(event) => event.preventDefault()}
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          window.getSelection()?.removeAllRanges();
          drag.current = {
            x: event.clientX,
            y: event.clientY,
            offset: offset.current,
            moved: false,
          };
        }}
        onPointerMove={(event) => {
          const current = drag.current;
          const element = rail.current;
          if (!current || !element) return;
          const dx = event.clientX - current.x;
          const dy = event.clientY - current.y;
          if (!current.moved) {
            if (Math.abs(dx) < 6) return;
            if (Math.abs(dx) < Math.abs(dy)) {
              drag.current = null;
              return;
            }
            current.moved = true;
            window.getSelection()?.removeAllRanges();
            element.setPointerCapture(event.pointerId);
            setGrabbing(true);
          }
          offset.current = current.offset - dx;
        }}
        onPointerUp={() => {
          if (drag.current?.moved) suppressClick.current = true;
          drag.current = null;
          setGrabbing(false);
        }}
        onPointerCancel={() => {
          drag.current = null;
          setGrabbing(false);
        }}
        onClickCapture={(event) => {
          if (!suppressClick.current) return;
          event.preventDefault();
          event.stopPropagation();
          suppressClick.current = false;
        }}
        onFocusCapture={() => {
          paused.current = true;
        }}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            paused.current = false;
          }
        }}
      >
        <div ref={track} className="flex w-max items-start gap-8 will-change-transform md:gap-12">
          <ul className="flex items-start gap-8 md:gap-12">
            {artworks.map((artwork, index) => (
              <GalleryPiece key={artwork.id} artwork={artwork} priority={index === 0} />
            ))}
          </ul>
          <ul className="flex items-start gap-8 md:gap-12" aria-hidden="true" inert>
            {artworks.map((artwork) => (
              <GalleryPiece key={`${artwork.id}-loop`} artwork={artwork} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
