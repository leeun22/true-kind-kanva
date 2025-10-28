'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import { ShopNowButton } from './ShopNowButton'

export function ImageWithText({
  alt,
  label,
  ...props
}: {
  alt: string
  label: {
    title: string
    subtitle: string
    description: string
  }
} & React.ComponentProps<typeof Image>) {
  return (
    <div className="relative flex flex-row items-center">
      {props.src ? (
        <div className="ImageWrapper relative w-[101%] h-[101%] flex grow overflow-hidden">
          <Image
            className="block w-full h-full object-[left_center] object-cover"
            alt={alt}
            width="3000"
            height="1600"
            sizes="1293px"
            decoding="auto"
            {...props}
          />
        </div>
      ) : null}

      {label && (
        <div className="ContentWrapper absolute bottom-0 left-0 right-0 px-[112px] py-[96px] flex flex-row items-end h-min">
          <div className="ContentContainer flex flex-col flex-grow gap-[48px] items-start h-full relative">
            <div className="ContentItems flex flex-col gap-[8px] items-start w-full h-min">
              <div className="ContentTitleItem flex flex-col gap-[0px] items-start w-fit h-min">
                <motion.h2
                  className="ContentTitle font-sentient text-[12.8rem] text-white font-normal leading-[100%] tracking-[-5px]"
                  initial={{ y: 0, opacity: 0, filter: 'blur(10px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: 0, opacity: 0, filter: 'blur(10px)' }}
                  transition={{ duration: 0.85, ease: 'linear', delay: 0.2 }}
                >
                  {label.title}
                </motion.h2>
                <motion.h2
                  className="ContentSubTitle font-sentient text-[12.8rem] text-white font-normal leading-[100%] tracking-[-5px] italic opacity-65"
                  initial={{ y: 0, opacity: 0, filter: 'blur(10px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: 0, opacity: 0, filter: 'blur(10px)' }}
                  transition={{ duration: 0.85, ease: 'linear', delay: 0.25 }}
                >
                  {label.subtitle}
                </motion.h2>
              </div>

              <div className="ContentDescriptionItem w-full max-w-[500px] h-auto">
                <motion.p
                  className="ContentDescription font-figtree text-[2.2rem] text-[#fff9] font-normal leading-[150%] text-balance"
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -15, opacity: 0 }}
                  transition={{ duration: 0.45, ease: 'linear', delay: 0.3 }}
                >
                  {label.description}
                </motion.p>
              </div>
            </div>

            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
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
