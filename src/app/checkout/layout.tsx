import { Metadata } from 'next'
import { SUPPORT_EMAIL, WOOCOMMERCE_SHORTCODES } from '@/lib/site-info'

export const metadata: Metadata = {
  title: 'Checkout - PUPITO | Secure Payment & Shipping',
  description:
    'Complete your PUPITO anime streetwear purchase through a WooCommerce short code ' +
    WOOCOMMERCE_SHORTCODES.checkout +
    ' equivalent checkout, fulfilled by Printful with online-only assistance at ' +
    SUPPORT_EMAIL +
    '.',
  openGraph: {
    title: 'Checkout - PUPITO',
    description: 'Secure checkout for your anime streetwear powered by a WooCommerce-style flow.',
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