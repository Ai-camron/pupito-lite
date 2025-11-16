import type { Metadata } from "next";
import { STORE_OVERVIEW, SUPPORT_EMAIL, WOOCOMMERCE_SHORTCODES } from "@/lib/site-info";

export const metadata: Metadata = {
  title: "Help Center | PUPITO Online Streetwear Support",
  description:
    "Get answers on shipping, sizing, and contact options for PUPITO's online-only Printful-powered store. No phone lines or physical locations—email " +
    SUPPORT_EMAIL +
    " and use our forms for support.",
  keywords: [
    "PUPITO help",
    "shipping info",
    "size guide",
    "online only support",
    "Printful dropshipping",
    "Contact Form 7",
    WOOCOMMERCE_SHORTCODES.cart,
    WOOCOMMERCE_SHORTCODES.checkout,
    SUPPORT_EMAIL,
  ],
  openGraph: {
    title: "Help Center | PUPITO",
    description: STORE_OVERVIEW,
    type: "website",
  },
};

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
