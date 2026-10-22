"use client";

import { usePathname } from "next/navigation";
import { InkMark } from "@/components/InkMark";
import { SupportAsk } from "@/components/SupportAsk";
import { site } from "@/content/site";

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <footer className="mt-16 px-5 pb-10 md:mt-20 md:px-10">
      <div className="mx-auto max-w-6xl">
        <InkMark className="w-20" />
        <p className="mt-4 font-display text-3xl italic leading-none tracking-[-0.03em]">
          That&apos;s the issue.
        </p>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em]">
          {site.artist} · {site.city}
        </p>
        <SupportAsk />
      </div>
    </footer>
  );
}
