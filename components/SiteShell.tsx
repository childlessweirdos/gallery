"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const game = pathname.startsWith("/aspects-of-fate");

  if (game) {
    return (
      <main id="content" className="fixed inset-0 bg-[#0b0804]">
        {children}
      </main>
    );
  }

  return (
    <>
      <SiteHeader />
      <main id="content" className="flex flex-1 flex-col px-5 md:px-10">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
