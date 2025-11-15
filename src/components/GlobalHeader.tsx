'use client'

import { usePathname } from 'next/navigation'
import Navigation from './Navigation'

export default function GlobalHeader() {
  const pathname = usePathname() || '/'

  return <Navigation currentPath={pathname} cartCount={0} />
}

