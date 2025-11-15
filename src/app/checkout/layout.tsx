import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Checkout - PUPITO | Secure Payment & Shipping',
  description: 'Complete your PUPITO anime streetwear purchase. Secure checkout with multiple payment options and fast shipping worldwide.',
  openGraph: {
    title: 'Checkout - PUPITO',
    description: 'Secure checkout for your anime streetwear',
    type: 'website',
  },
}

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}