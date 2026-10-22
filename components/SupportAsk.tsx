import { site } from "@/content/site";

export function SupportAsk() {
  return (
    <a
      href={site.kofi}
      target="_blank"
      rel="noreferrer"
      className="mt-8 inline-flex max-w-md flex-col gap-2 border border-ink bg-vermilion px-5 py-4 text-paper hover:bg-ink"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
        The first ten · Ko-fi
      </span>
      <span className="font-display text-[2rem] italic leading-[0.95] tracking-[-0.03em]">
        Support the weird.
      </span>
      <span className="max-w-[32ch] font-sans text-sm leading-relaxed">
        Ground-floor support, and eternal bragging rights.
      </span>
    </a>
  );
}
