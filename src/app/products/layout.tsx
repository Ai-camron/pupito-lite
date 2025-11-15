import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Products - PUPITO | Anime Streetwear Collection',
  description: 'Discover PUPITO\'s premium anime-inspired streetwear. Shop hoodies, t-shirts, caps, and joggers with unique designs, neon aesthetics, and high-quality materials.',
  keywords: 'anime streetwear, PUPITO, hoodies, t-shirts, caps, joggers, neon, anime fashion, streetwear brand',
  openGraph: {
    title: 'Products - PUPITO Anime Streetwear',
    description: 'Premium anime-inspired streetwear collection with neon aesthetics',
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