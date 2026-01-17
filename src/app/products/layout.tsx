import { Metadata } from 'next'
import { SEO_METADATA, STORE_INFO } from '@/lib/constants'

export const metadata: Metadata = {
  title: SEO_METADATA.products.title,
  description: SEO_METADATA.products.description,
  keywords: SEO_METADATA.products.keywords,
  openGraph: {
    title: SEO_METADATA.products.title,
    description: SEO_METADATA.products.description,
    type: 'website',
    siteName: STORE_INFO.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO_METADATA.products.title,
    description: SEO_METADATA.products.description,
  }
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
            "url": `${STORE_INFO.url}/products`,
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": STORE_INFO.url
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Products",
                  "item": `${STORE_INFO.url}/products`
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