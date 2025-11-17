'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { useTransformMotion } from '@/hooks/useTransformMotion'

const BannerParallaxFooter = () => {
  const refBanner = useRef<HTMLDivElement | null>(null)
  const { transformMotion } = useTransformMotion({
    refTarget: refBanner,
    startY: -20,
    endY: 20
  })

  return (
    <motion.div ref={refBanner} className="footer__parallax min-[769px]:h-[90dvh] h-[70dvh] overflow-hidden">
      <motion.div
        className="footer__parallax-wrapper"
        style={{
          transform: transformMotion,
          transition: 'transform 0.5s ease-out'
        }}
      >
        <div className="footer__parallax-image-desktop hidden min-[769px]:block w-full h-[100dvh] object-cover brightness-[1.08] select-none pointer-events-none">
          <Image
            className="media-img w-full max-w-full h-full object-cover"
            src="/footers/footer-banner.jpg"
            alt="Footer banner"
            decoding="async"
            draggable="false"
            width={1536}
            height={910}
            sizes="(max-width: 640px) 320px, (max-width: 768px) 640px, (max-width: 1024px) 768px, (max-width: 1280px) 1024px, (max-width: 1536px) 1280px, 1536px"
          />
        </div>

        <div className="footer__parallax-image-mobile block min-[769px]:hidden w-full h-[100dvh] object-cover brightness-[1.08] select-none pointer-events-none">
          <Image
            className="media-img w-full max-w-full h-full object-cover"
            src="/footers/footer-banner-m.jpg"
            alt="Footer banner mobile"
            decoding="async"
            draggable="false"
            width={320}
            height={540}
            sizes="(max-width: 640px) 320px, (max-width: 768px) 640px, (max-width: 1024px) 768px, (max-width: 1280px) 1024px, (max-width: 1536px) 1280px, 1536px"
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default BannerParallaxFooter
