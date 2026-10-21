"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { InkMark } from "@/components/InkMark";
import { site } from "@/content/site";

export function SiteHeader() {
  const pathname = usePathname();
  const onWork = pathname.startsWith("/work");
  const onContact = pathname.startsWith("/contact");

  return (
    <header className="px-5 pt-5 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.22em]">
          <span>{site.city}</span>
          <span>{site.issue}</span>
        </div>
        <InkMark className="mt-2 w-16" />
        <div className="flex items-baseline justify-between gap-6 py-4">
          <Link
            href="/"
            className="font-display text-xl leading-none tracking-[-0.03em]"
          >
            {site.name}
          </Link>
          <nav className="flex gap-5 font-mono text-[11px] uppercase tracking-[0.16em]">
            <Link
              href="/"
              aria-current={pathname === "/" ? "page" : undefined}
              className="ink-link pb-1"
            >
              Home
            </Link>
            <Link
              href="/work"
              aria-current={onWork ? "page" : undefined}
              className="ink-link pb-1"
            >
              Work
            </Link>
            <Link
              href="/contact"
              aria-current={onContact ? "page" : undefined}
              className="ink-link pb-1"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
