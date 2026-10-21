import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl py-16">
      <h1 className="font-display text-5xl leading-none tracking-[-0.03em]">
        Not on the wall
      </h1>
      <p className="mt-6 max-w-[36ch] font-sans text-sm leading-relaxed">
        That page is not in the gallery.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block font-mono text-[11px] uppercase tracking-[0.16em]"
      >
        Back home
      </Link>
    </div>
  );
}
