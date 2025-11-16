import { Metadata } from 'next'
import { SUPPORT_EMAIL, WOOCOMMERCE_SHORTCODES } from '@/lib/site-info'

export const metadata: Metadata = {
  title: 'Shopping Cart - PUPITO | Anime Streetwear',
  description:
    'Review your PUPITO anime streetwear items before checkout. Secure shopping cart powered by the WooCommerce short code ' +
    WOOCOMMERCE_SHORTCODES.cart +
    ' equivalent, backed by Printful fulfillment with online-only support at ' +
    SUPPORT_EMAIL +
    '.',
  openGraph: {
    title: 'Shopping Cart - PUPITO',
    description: 'Review your anime streetwear selection and proceed through the WooCommerce cart flow.',
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