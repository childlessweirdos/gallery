"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { site } from "@/content/site";

type GtagParams = Record<string, string>;

declare global {
  interface Window {
    gtag?: (
      command: "config" | "event" | "set",
      target: string | GtagParams,
      params?: GtagParams,
    ) => void;
  }
}

function artworkSlug(path: string) {
  const match = path.match(/^\/work\/([^/]+)$/);
  return match ? decodeURIComponent(match[1]) : "";
}

function artworkTitle() {
  return document.title.replace(/ — Childless Weirdos$/, "");
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

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    const slug = artworkSlug(pathname);
    if (!slug) return;
    const frame = requestAnimationFrame(() => {
      window.gtag?.("event", "artwork_view", {
        artwork_slug: slug,
        artwork_title: artworkTitle(),
        page_path: pathname,
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a");
      if (!link?.href.includes("ko-fi.com")) return;
      const path = window.location.pathname;
      window.gtag?.("event", "kofi_click", {
        link_url: link.href,
        page_path: path,
        artwork_slug: artworkSlug(path),
      });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (process.env.NODE_ENV !== "production") return null;
  return <GoogleAnalytics gaId={site.analyticsId} />;
}
