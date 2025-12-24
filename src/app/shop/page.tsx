import type { Metadata } from "next";
import ShopShowcase from "@/components/ShopShowcase";
import { SEO_METADATA, STORE_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: SEO_METADATA.shop.title,
  description: SEO_METADATA.shop.description,
  keywords: SEO_METADATA.shop.keywords,
  openGraph: {
    title: SEO_METADATA.shop.title,
    description: SEO_METADATA.shop.description,
    type: 'website',
    siteName: STORE_INFO.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO_METADATA.shop.title,
    description: SEO_METADATA.shop.description,
  }
};

export default function ShopPage() {
  return <ShopShowcase />;
}
