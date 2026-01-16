import type { Metadata } from 'next'
import { STORE_INFO } from '@/lib/constants'

export const metadata: Metadata = {
  title: `Owner Dashboard | ${STORE_INFO.name}`,
  description: 'Owner dashboard with Printful-connected e-commerce insights and catalog management.',
  robots: {
    index: false,
    follow: false
  }
}

export default function OwnerDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
