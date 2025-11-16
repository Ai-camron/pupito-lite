import { Metadata } from 'next'
import { SUPPORT_EMAIL, WOOCOMMERCE_SHORTCODES } from '@/lib/site-info'

export const metadata: Metadata = {
  title: 'My Account - PUPITO | Order History & Profile',
  description:
    'Manage your PUPITO account with a WooCommerce short code ' +
    WOOCOMMERCE_SHORTCODES.account +
    ' style dashboard. Track Printful shipments, update profile details, and reach us at ' +
    SUPPORT_EMAIL +
    ' for online-only support.',
  openGraph: {
    title: 'My Account - PUPITO',
    description: 'Manage your account, orders, and newsletter preferences with WooCommerce-style tools.',
    type: 'website',
  },
}

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}