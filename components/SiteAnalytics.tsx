"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { site } from "@/content/site";

declare global {
  interface Window {
    gtag?: (command: "config", id: string, params: Record<string, string>) => void;
  }
}

export function SiteAnalytics() {
  const pathname = usePathname();
  const landing = useRef(true);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (landing.current) {
      landing.current = false;
      return;
    }
    const path = pathname;
    const frame = requestAnimationFrame(() => {
      window.gtag?.("config", site.analyticsId, {
        page_path: path,
        page_location: window.location.href,
        page_title: document.title,
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  if (process.env.NODE_ENV !== "production") return null;
  return <GoogleAnalytics gaId={site.analyticsId} />;
}
