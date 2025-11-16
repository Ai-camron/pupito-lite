import { Metadata } from 'next'
import { STORE_OVERVIEW, SUPPORT_EMAIL, WOOCOMMERCE_SHORTCODES } from '@/lib/site-info'

export const metadata: Metadata = {
  title: 'Products - PUPITO | Anime Streetwear Collection',
  description:
    "Discover PUPITO's premium anime-inspired streetwear in an online-only catalog powered by Printful. Shop with the WooCommerce short code " +
    WOOCOMMERCE_SHORTCODES.shop +
    ' equivalent and reach us at ' +
    SUPPORT_EMAIL +
    ' for support—no physical store or phone required.',
  keywords: 'anime streetwear, PUPITO, hoodies, t-shirts, caps, joggers, neon, anime fashion, streetwear brand, Printful, online only, ' +
    SUPPORT_EMAIL,
  openGraph: {
    title: 'Products - PUPITO Anime Streetwear',
    description: STORE_OVERVIEW,
    type: 'website',
  },
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "PUPITO Anime Streetwear Collection",
            "description": "Premium anime-inspired streetwear including hoodies, t-shirts, caps, and joggers",
            "url": "https://pupito.com/products",
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://pupito.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Products",
                  "item": "https://pupito.com/products"
                }
              ]
            },
            "mainEntity": {
              "@type": "ItemList",
              "numberOfItems": 12,
              "itemListElement": []
            }
          })
        }}
      />
      {children}
    </>
  )
}