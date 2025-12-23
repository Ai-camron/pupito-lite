import type { Metadata } from 'next'
import { STORE_INFO } from '@/lib/constants'

export const metadata: Metadata = {
  title: `Client Dashboard | ${STORE_INFO.name}`,
  description: 'Private client dashboard with secured insights, orders, and security status.',
  robots: {
    index: false,
    follow: false,
  }
}

export default function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
