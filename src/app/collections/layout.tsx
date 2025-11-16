import type { Metadata } from 'next'
import HeroBanner from '@/components/collections/HeroBanner'

export const metadata: Metadata = {
  title: 'Collections',
  description: 'Explore all our collections and products.'
}

export default function CollectionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <HeroBanner />

      {children}
    </main>
  )
}
