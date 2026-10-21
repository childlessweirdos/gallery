import { HomePage } from "@/components/home/HomePage";
import { getArtworks } from "@/lib/artworks";

export default function Home() {
  return <HomePage artworks={getArtworks()} />;
}
