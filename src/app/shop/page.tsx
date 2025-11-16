import type { Metadata } from "next";
import ShopShowcase from "@/components/ShopShowcase";
import SeoShortcodeCallout from "@/components/SeoShortcodeCallout";

export const metadata: Metadata = {
  title: "Shop Pupito | Midnight Market",
  description:
    "Explore the Pupito Midnight Market to discover anime-inspired streetwear capsules, limited drops, and community favorites with WooCommerce [products] style cataloging and Printful fulfillment.",
};

export default function ShopPage() {
  return (
    <>
      <ShopShowcase />
      <SeoShortcodeCallout context="catalog browsing and new drop discovery" />
    </>
  );
}
