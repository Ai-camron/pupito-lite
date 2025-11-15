import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login - PUPITO | Anime Streetwear',
  description: 'Sign in to your PUPITO account and access exclusive anime streetwear collections, track your orders, and manage your wishlist.',
  openGraph: {
    title: 'Login - PUPITO',
    description: 'Sign in to your PUPITO account for exclusive anime streetwear access.',
    type: 'website',
  },
  robots: {
    index: false, // Don't index login pages
    follow: true,
  },
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}