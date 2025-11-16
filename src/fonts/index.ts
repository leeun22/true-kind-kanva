import { Figtree, Geist, Geist_Mono } from 'next/font/google'
import localFont from 'next/font/local'

export const sentient = localFont({
  variable: '--font-sentient',
  src: [
    {
      path: './Sentient-Light.woff2',
      weight: '300', // Định nghĩa độ dày để sử dụng trong css
      style: 'normal'
    },
    {
      path: './Sentient-Regular.woff2',
      weight: '400', //Default
      style: 'normal'
    },
    {
      path: './Sentient-Medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: './Sentient-Bold.woff2',
      weight: '700',
      style: 'normal'
    }
  ],
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
