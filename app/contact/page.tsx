import type { Metadata } from "next";
import { PrintInterest } from "@/components/PrintInterest";
import { site } from "@/content/site";
import { getArtworks } from "@/lib/artworks";

export const metadata: Metadata = {
  title: "Contact",
  description: `Write to ${site.artist} in Pittsburgh. Instagram is the direct line.`,
};

export default function ContactPage() {
  const choices = getArtworks().map((artwork) => ({
    slug: artwork.slug,
    title: artwork.title,
  }));

  return (
    <article className="mx-auto w-full max-w-6xl py-10">
      <h1 className="font-display text-5xl leading-[0.9] tracking-[-0.03em]">
        Contact
      </h1>
      <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em]">
        {site.artist} · {site.city}
      </p>
      <p className="mt-6 max-w-[28ch] font-sans text-sm leading-relaxed">
        Instagram is the direct line for now.
      </p>
      <a
        href={site.instagram}
        target="_blank"
        rel="noreferrer"
        className="ink-link mt-4 inline-block font-mono text-[11px] uppercase tracking-[0.16em]"
      >
        @childlessweirdos
      </a>
      <div className="mt-10 max-w-xl">
        <PrintInterest choices={choices} idSuffix="-contact" />
      </div>
    </article>
  );
}
