import Image from "next/image";
import Link from "next/link";
import { formatStripDate, stripSrc, type Strip } from "@/lib/strips";

const castAlt =
  "The cast, left to right: D, unimpressed and too technical; E, the chef; Moo, old and grumpy; Haku, a nervous cat.";

export function ComicsArchive({ strips }: { strips: Strip[] }) {
  return (
    <div className="mx-auto w-full max-w-6xl pb-4">
      <header className="max-w-xl">
        <h1 className="font-display text-5xl leading-[0.9] tracking-[-0.03em]">
          Comics
        </h1>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em]">
          The Sunday strips, 2025.
        </p>
        <p className="mt-4 font-sans text-sm leading-relaxed">
          D, E, Moo, and Haku. {strips.length} strips, in the order they went up.
        </p>
      </header>

      <figure className="mt-10">
        <Image
          src="/comics/cast.jpg"
          alt={castAlt}
          width={2000}
          height={666}
          unoptimized
          priority
          sizes="(min-width: 1152px) 1152px, 100vw"
          className="h-auto w-full"
        />
      </figure>

      <nav aria-label="Strips" className="mt-10 border-t border-ink">
        <ol>
          {strips.map((strip, index) => (
            <li key={strip.slug} className="border-b border-ink/25">
              <Link
                href={`#${strip.slug}`}
                className="flex items-baseline justify-between gap-4 px-1 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper"
              >
                <span>
                  <span className="mr-3 opacity-45">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {strip.title}
                </span>
                <time dateTime={strip.date} className="shrink-0 opacity-55">
                  {formatStripDate(strip.date)}
                </time>
              </Link>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-16 space-y-20">
        {strips.map((strip) => (
          <article key={strip.slug} id={strip.slug} className="scroll-mt-8">
            <header className="mb-4 sm:flex sm:items-baseline sm:justify-between sm:gap-4">
              <h2 className="font-display text-3xl leading-none tracking-[-0.03em]">
                <Link href={`/comics/${strip.slug}`} className="ink-link">
                  {strip.title}
                </Link>
              </h2>
              <time
                dateTime={strip.date}
                className="mt-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-ink/55 sm:mt-0"
              >
                {formatStripDate(strip.date)}
              </time>
            </header>
            <Link href={`/comics/${strip.slug}`} className="block">
              <Image
                src={stripSrc(strip.slug)}
                alt={strip.alt}
                width={strip.width}
                height={strip.height}
                unoptimized
                sizes="(min-width: 1152px) 1152px, 100vw"
                className="h-auto w-full bg-paper"
              />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
