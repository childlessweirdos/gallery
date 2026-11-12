import Image from "next/image";
import Link from "next/link";
import { formatStripDate, stripSrc, type Strip } from "@/lib/strips";

export function StripReader({
  strip,
  previous,
  next,
}: {
  strip: Strip;
  previous?: Strip;
  next?: Strip;
}) {
  return (
    <article className="mx-auto w-full max-w-6xl pb-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em]">
        <Link href="/comics" className="ink-link">
          Comics
        </Link>
      </p>
      <header className="mt-4 sm:flex sm:items-baseline sm:justify-between sm:gap-4">
        <h1 className="font-display text-[2.6rem] leading-[0.9] tracking-[-0.03em] sm:text-5xl">
          {strip.title}
        </h1>
        <time
          dateTime={strip.date}
          className="mt-3 block font-mono text-[11px] uppercase tracking-[0.16em] text-ink/55 sm:mt-0"
        >
          {formatStripDate(strip.date)}
        </time>
      </header>
      <Image
        src={stripSrc(strip.slug)}
        alt={strip.alt}
        width={strip.width}
        height={strip.height}
        unoptimized
        priority
        sizes="(min-width: 1152px) 1152px, 100vw"
        className="mt-8 h-auto w-full bg-paper"
      />
      <nav className="mt-5 flex flex-col gap-3 border-t border-ink pt-3 font-mono text-[11px] uppercase tracking-[0.14em] sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:tracking-[0.16em]">
        {previous ? (
          <Link href={`/comics/${previous.slug}`} className="ink-link">
            Previous · {previous.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/comics/${next.slug}`} className="ink-link">
            Next · {next.title}
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
