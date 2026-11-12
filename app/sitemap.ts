import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getArtworks } from "@/lib/artworks";
import { getStrips } from "@/lib/strips";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url },
    { url: `${site.url}/work` },
    { url: `${site.url}/comics` },
    { url: `${site.url}/contact` },
    { url: `${site.url}/aspects-of-fate` },
    ...getArtworks().map((artwork) => ({
      url: `${site.url}/work/${artwork.slug}`,
    })),
    ...getStrips().map((strip) => ({
      url: `${site.url}/comics/${strip.slug}`,
    })),
  ];
}
