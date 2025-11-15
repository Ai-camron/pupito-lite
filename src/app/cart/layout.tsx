import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shopping Cart - PUPITO | Anime Streetwear',
  description: 'Review your PUPITO anime streetwear items before checkout. Secure shopping cart with easy item management and exclusive offers.',
  openGraph: {
    title: 'Shopping Cart - PUPITO',
    description: 'Review your anime streetwear selection',
    type: 'website',
  },
}

export default function CartLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}