/**
 * Mount: Slide 0 has isActive=true → useEffect triggers animation immediately
 * Drag to slide 1: isActive=true → animate for the first time
 * Return to slide 0: Has hasAnimated=true → keep the animated state, do not animate again
 */

import { motion } from 'motion/react'
import Image from 'next/image'
import ShopNowButton from './ShopNowButton'
import { useEffect, useState } from 'react'

export function ImageWithText({
  alt,
  label,
  src,
  isActive
}: {
  alt: string
  label: {
    title: string
    subtitle: string
    description: string
  }
  src: string
  isActive: boolean
} & React.ComponentProps<typeof Image>) {
  const [hasAnimated, setHasAnimated] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(false)

  useEffect(() => {
    if (isActive && !hasAnimated) {
      setShouldAnimate(true)
      setHasAnimated(true)
    }
  }, [isActive, hasAnimated])

  return (
    <div className="relative flex flex-row items-center">
      {src ? (
        <div className="ImageWrapper relative w-[101%] h-[101%] flex grow overflow-hidden">
          <Image
            className="block w-full h-full object-[37%_45.7%] md:object-[left_center] object-cover"
            src={src}
            alt={alt}
            priority
            width={3000}
            height={1600}
            sizes="(max-width: 640px) 320px, (max-width: 768px) 640px, (max-width: 1024px) 768px, (max-width: 1280px) 1024px, (max-width: 1536px) 1280px, 1536px"
            decoding="auto"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/15 to-transparent" />
        </div>
      ) : null}

      {label && (
        <div className="ContentWrapper absolute bottom-0 left-0 right-0 xl:p-[112px_96px] lg:p-[64px] p-[40px_40px_48px] flex flex-row items-end h-min">
          <div className="ContentContainer flex flex-col flex-grow xl:gap-[48px] gap-[32px] items-start h-full relative">
            <div className="ContentItems flex flex-col gap-[8px] items-start w-full h-min">
              <div className="ContentTitleItem flex flex-col gap-[0px] items-start w-fit h-min">
                <motion.h2
                  className="ContentTitle font-sentient text-fluid9xl text-white -tracking-[5px]"
                  // If you need to avoid animation when mounting, only animate by condition then use initial={false}
                  initial={{ y: 0, opacity: 0, filter: 'blur(10px)' }}
                  animate={
                    shouldAnimate || hasAnimated
                      ? { y: 0, opacity: 1, filter: 'blur(0px)' }
                      : { y: 0, opacity: 0, filter: 'blur(10px)' }
                  }
                  transition={{ duration: 0.85, ease: 'linear', delay: 0.2 }}
                >
                  {label.title}
                </motion.h2>
                <motion.h2
                  className="ContentSubTitle font-sentient text-fluid9xl text-white -tracking-[5px] italic opacity-65"
                  initial={{ y: 0, opacity: 0, filter: 'blur(10px)' }}
                  animate={
                    shouldAnimate || hasAnimated
                      ? { y: 0, opacity: 0.65, filter: 'blur(0px)' }
                      : { y: 0, opacity: 0, filter: 'blur(10px)' }
                  }
                  transition={{ duration: 0.85, ease: 'linear', delay: 0.25 }}
                >
                  {label.subtitle}
                </motion.h2>
              </div>

              <div className="ContentDescriptionItem w-full md:max-w-[500px] max-w-[300px] h-auto">
                <motion.p
                  className="ContentDescription font-figtree text-fluid2xl text-[#fff9] text-balance"
                  initial={{ y: 15, opacity: 0 }}
                  animate={shouldAnimate || hasAnimated ? { y: 0, opacity: 1 } : { y: 15, opacity: 0 }}
                  transition={{ duration: 0.45, ease: 'linear', delay: 0.3 }}
                >
                  {label.description}
                </motion.p>
              </div>
            </div>

            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={shouldAnimate || hasAnimated ? { y: 0, opacity: 1 } : { y: 15, opacity: 0 }}
              transition={{ duration: 0.45, ease: 'linear', delay: 0.3 }}
            >
              <ShopNowButton />
            </motion.div>
          </div>
        </div>
      )}
    </div>
  )
}
