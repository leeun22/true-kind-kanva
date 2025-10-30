'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'

export default function HeaderWrapper() {
  const pathname = usePathname()

  // Check if pathname is exactly "/" (Home)
  const isHome = pathname === '/'

  return <Header isStylesHome={isHome} />
}
