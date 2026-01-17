import type { Metadata } from 'next'
import { SEO_METADATA, STORE_INFO } from '@/lib/constants'

export const metadata: Metadata = {
  title: SEO_METADATA.about.title,
  description: SEO_METADATA.about.description,
  keywords: SEO_METADATA.about.keywords,
  openGraph: {
    title: SEO_METADATA.about.title,
    description: SEO_METADATA.about.description,
    type: 'website',
    siteName: STORE_INFO.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO_METADATA.about.title,
    description: SEO_METADATA.about.description,
  }
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
