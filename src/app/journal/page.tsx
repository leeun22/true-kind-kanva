import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Journal'
}

export async function generateStaticParams() {
  const handles = ['collections', 'product-name', 'product-handle']

  return handles.map((handle) => ({
    handle: handle
  }))
}

export default function JournalPage() {
  return <h1>Hello, Journal Page!</h1>
}
