import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aspects of Fate",
  description:
    "A dance with destiny. Fifteen hands, two exchanges, closest to zero.",
};

export default function AspectsOfFatePage() {
  return (
    <iframe
      src="/aspects-of-fate/table.html"
      title="Aspects of Fate"
      className="block h-full w-full border-0 bg-[#0b0804]"
      allow="fullscreen"
    />
  );
}
