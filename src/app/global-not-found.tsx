/**
 * If the product is not found (when product is undefined), call func notFound().
 * Next.js will automatically stop rendering that page and display the NotFound component,
 * Or display the default 404 with HTTP Status Code 404 (very important for SEO).
 */

import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import './globals.css'

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.'
}

const inter = Inter({ subsets: ['latin'] })

export default function NotFound() {
  return (
    <html lang="en">
      <body className={`${inter.className} m-0 p-0 overflow-hidden`}>
        <div className="relative w-screen h-screen flex items-center justify-start overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              className="object-cover hidden md:block"
              src="/footers/footer-banner.jpg"
              alt="404 Background"
              fill
              priority
              quality={90}
            />
            <Image
              className="object-cover block md:hidden"
              src="/footers/footer-banner-m.jpg"
              alt="404 Background"
              fill
              priority
              quality={90}
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 top-[20%] pl-12 md:pl-20 lg:pl-32">
            <h1 className="text-white text-[40px] md:text-[80px] lg:text-[100px] xl:text-[128px] font-[500] italic leading-[1.1] tracking-tight">
              404
            </h1>

            <p className="text-white/70 text-[14px] md:text-[16px] lg:text-[18px] xl:text-[22px] mb-[15%] font-light max-w-[275px] md:max-w-[325px] lg:max-w-[365px] xl:max-w-[450px]">
              It seems the page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track!
            </p>

            <Link
              href="/"
              className="inline-block text-white text-[12px] md:text-[15px] border-b-1 border-white pb-[2px] hover:border-white/60 hover:text-white/80 transition-all duration-150"
            >
              Back to Homepage
            </Link>
          </div>
        </div>
      </body>
    </html>
  )
}
