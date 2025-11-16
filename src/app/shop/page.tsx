import type { Metadata } from "next";
import ShopShowcase from "@/components/ShopShowcase";

export const metadata: Metadata = {
  title: "Shop Pupito | Midnight Market",
  description:
    "Explore the Pupito Midnight Market to discover anime-inspired streetwear capsules, limited drops, and community favorites.",
};

export default function ShopPage() {
  return <ShopShowcase />;
}
