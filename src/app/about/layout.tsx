import type { Metadata } from "next";
import { STORE_OVERVIEW, SUPPORT_EMAIL, WOOCOMMERCE_SHORTCODES } from "@/lib/site-info";

export const metadata: Metadata = {
  title: "About PUPITO | Online Anime Streetwear Brand",
  description:
    "Learn about PUPITO, the online-only anime streetwear label fulfilled by Printful. Discover our mission, our no-storefront approach, and how to reach us at " +
    SUPPORT_EMAIL +
    " while we keep WooCommerce shortcodes like " +
    WOOCOMMERCE_SHORTCODES.shop +
    " and " +
    WOOCOMMERCE_SHORTCODES.account +
    " search-friendly.",
  keywords: [
    "PUPITO",
    "anime streetwear brand",
    "Printful fulfillment",
    "online only store",
    "Mailchimp newsletter",
    "WooCommerce shortcodes",
    "" + SUPPORT_EMAIL,
  ],
  openGraph: {
    title: "About PUPITO | Online Anime Streetwear Brand",
    description: STORE_OVERVIEW,
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
