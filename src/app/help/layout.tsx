import type { Metadata } from 'next'
import { SEO_METADATA, STORE_INFO } from '@/lib/constants'

export const metadata: Metadata = {
  title: SEO_METADATA.help.title,
  description: SEO_METADATA.help.description,
  keywords: SEO_METADATA.help.keywords,
  openGraph: {
    title: SEO_METADATA.help.title,
    description: SEO_METADATA.help.description,
    type: 'website',
    siteName: STORE_INFO.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO_METADATA.help.title,
    description: SEO_METADATA.help.description,
  }
}

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
