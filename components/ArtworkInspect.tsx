"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { Frame } from "@/components/Frame";

export function ArtworkInspect({
  image,
  alt,
  title,
  priority = false,
  sizes,
}: {
  image: StaticImageData;
  alt: string;
  title: string;
  priority?: boolean;
  sizes: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) dialogRef.current?.showModal();
  }, [open]);

  function close() {
    dialogRef.current?.close();
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="inline-block max-w-full cursor-zoom-in"
        aria-haspopup="dialog"
        aria-label={`View ${title} full size`}
      >
        <Frame>
          <Image
            src={image}
            alt={alt}
            sizes={sizes}
            quality={90}
            priority={priority}
            className="framed-sheet"
          />
        </Frame>
      </button>
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={() => {
          setOpen(false);
          triggerRef.current?.focus();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        className="m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-ink p-4 text-paper backdrop:bg-ink md:p-8"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-baseline justify-between gap-4">
            <p id={titleId} className="font-mono text-[11px] uppercase tracking-[0.16em]">
              {title}
            </p>
            <button
              type="button"
              onClick={close}
              className="font-mono text-[11px] uppercase tracking-[0.16em]"
            >
              Close
            </button>
          </div>
          <div
            className="flex min-h-0 flex-1 items-center justify-center pt-4"
            onClick={close}
          >
            {open ? (
              <Image
                src={image}
                alt={alt}
                sizes="100vw"
                quality={90}
                onClick={(event) => event.stopPropagation()}
                className="h-auto max-h-[calc(100dvh-5rem)] w-auto max-w-full cursor-default"
              />
            ) : null}
          </div>
        </div>
      </dialog>
    </>
  );
}
