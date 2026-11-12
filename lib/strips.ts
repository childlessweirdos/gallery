import { strips, type Strip } from "@/content/strips";

export type { Strip };

export function getStrips(): Strip[] {
  return strips;
}

export function getStrip(slug: string): Strip | undefined {
  return strips.find((strip) => strip.slug === slug);
}

export function getStripNeighbors(slug: string): {
  previous?: Strip;
  next?: Strip;
} {
  const index = strips.findIndex((strip) => strip.slug === slug);
  if (index === -1) return {};
  return {
    previous: index > 0 ? strips[index - 1] : undefined,
    next: index < strips.length - 1 ? strips[index + 1] : undefined,
  };
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function formatStripDate(iso: string): string {
  const [year, month, day] = iso.split("-");
  return `${months[Number(month) - 1]} ${Number(day)}, ${year}`;
}

export function stripSrc(slug: string): string {
  return `/comics/${slug}.jpg`;
}
