import type { Metadata } from "next";
import { ComicsArchive } from "@/components/ComicsArchive";
import { getStrips } from "@/lib/strips";

export const metadata: Metadata = {
  title: "Comics",
  description:
    "The Sunday strips, 2025. D, E, Moo, and Haku, in the order they went up.",
};

export default function ComicsPage() {
  return <ComicsArchive strips={getStrips()} />;
}
