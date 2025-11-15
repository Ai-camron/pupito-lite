import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Account - PUPITO | Order History & Profile',
  description: 'Manage your PUPITO account. View order history, update profile, track shipments, and manage your anime streetwear collection.',
  openGraph: {
    title: 'My Account - PUPITO',
    description: 'Manage your account and orders',
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