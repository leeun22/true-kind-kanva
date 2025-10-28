import { Figtree, Geist, Geist_Mono } from 'next/font/google'
import localFont from 'next/font/local'

export const sentient = localFont({
  variable: '--font-sentient',
  src: './Sentient-Light.woff2',
  display: 'swap'
})

export const figtree = Figtree({
  variable: '--font-figtree',
  subsets: ['latin'],
  display: 'swap'
})

// default next
export const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

export const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})
