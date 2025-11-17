'use client'

import { useTransformMotion } from '@/hooks/useTransformMotion'
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import type { Variants } from 'motion/react'
import { motionTextVariants } from '@/utils/animations'

const cardVariants: Variants = {
  hidden: {
    y: '120%'
  },
  visible: {
    y: 0
  }
}

const HeroBanner = () => {
  const refContainer = useRef<HTMLDivElement | null>(null)

  const { transformMotion } = useTransformMotion({
    refTarget: refContainer,
    startY: 0,
    endY: 20,
    startOffset: 0
  })

  const isInViewSection = useInView(refContainer, {
    once: true,
    margin: '-50px 0px -50px 0px'
  })

  return (
    <motion.section
      ref={refContainer}
      id="collection__hero-banner"
      className="block sm:mb-[100px] mb-[50px] overflow-hidden"
      variants={motionTextVariants.staggerContainer}
      initial="hidden"
      animate={isInViewSection ? 'visible' : 'hidden'}
      transition={{ ease: 'linear' }}
    >
      <div className="collection__intro relative pt-[100px] h-[100dvh] bg-[#edeff0]">
        <div className="collection__intro-top relative max-w-container">
          <div className="row relative z-[2]">
            <div className="col flex flex-col gap-0 justify-center items-start w-fit h-min">
              <motion.h2
                className="collection__title font-figtree font-[600] text-fluid6xl xl:text-fluid7xl -tracking-[2px] uppercase"
                variants={motionTextVariants.fadeInUp}
                transition={{ duration: 0.3 }}
              >
                Meet Our
              </motion.h2>

              <h2 className="collection__subtitle-mobile block md:hidden font-sentient text-fluid6xl xl:text-fluid7xl leading-[1] italic">
                <motion.span variants={motionTextVariants.fadeInUp} transition={{ duration: 0.3 }}>
                  complete
                </motion.span>
                <br />
                <motion.span
                  className="inline-block ml-[48%]"
                  variants={motionTextVariants.fadeInUp}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  lineup
                </motion.span>
              </h2>
            </div>
          </div>
        </div>

        <div className="collection__intro-bottom flex items-end absolute bottom-[7%] left-0 w-full z-[2] px-[calc(4%+9px)]">
          <div className="col basis-auto w-full md:w-[67%]">
            <motion.div
              className="cta max-w-full md:max-w-[315px] p-[25px] bg-white rounded-[14px]"
              variants={cardVariants}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            >
              <h3 className="font-figtree text-fluid3xl font-[600] tracking-[0] mb-[18px]">Understand Your Routine</h3>

              <div className="block overflow-hidden">
                <motion.p
                  className="font-figtree text-[1.3rem] font-[300] text-[#737373] leading-[1.2] opacity-[.65]"
                  variants={cardVariants}
                  transition={{ duration: 0.95, ease: 'easeInOut' }}
                >
                  Skincare is not just about the products you use, but it&apos;s also about how you use those products
                  effectively. Head over to clean journal to read more.
                </motion.p>
              </div>

              <Link
                href="/#journal"
                className="btn relative inline-block p-[14px_36px] mt-[75px] text-center w-full bg-[#3b3b3b] text-white cursor-pointer uppercase rounded-[62px] hover:-translate-y-[10px] transition-transform duration-300 ease-in-out"
              >
                <span className="label font-figtree font-[300] leading-[1.1] text-[1.25rem] text-white uppercase">
                  Read More
                </span>
              </Link>
            </motion.div>
          </div>

          <div className="col basis-auto w-[33%] hidden md:block">
            <motion.h1
              className="collection__subtitle-desktop m-auto text-center font-sentient text-fluid6xl xl:text-fluid7xl font-[500] leading-[.95] italic"
              variants={motionTextVariants.fadeInUp}
              transition={{ duration: 0.3 }}
            >
              Complete lineup
            </motion.h1>
          </div>
        </div>

        <div className="collection__intro-img flex items-end justify-between w-full h-full absolute bottom-0 left-0 z-[1] overflow-hidden">
          <motion.div
            className="media-img-desktop relative hidden md:block w-full h-full select-none pointer-events-none"
            style={{
              transform: transformMotion,
              transition: 'transform 0.5s ease-out'
            }}
          >
            <Image
              className="w-full h-full object-cover object-bottom align-middle"
              src="/collections/shops-banner.jpg"
              alt="Shop Banner"
              decoding="async"
              draggable="false"
              priority
              sizes="(max-width: 640px) 320px, (max-width: 768px) 640px, (max-width: 1024px) 768px, (max-width: 1280px) 1024px, (max-width: 1536px) 1280px, 1536px"
              width={1510}
              height={910}
            />
          </motion.div>

          <div className="media-img-mobile relative block md:hidden w-full h-full select-none pointer-events-none">
            <Image
              src="/collections/shops-banner-m.jpg"
              className="w-full h-full object-cover object-bottom align-middle"
              alt="Shop Banner"
              decoding="async"
              draggable="false"
              priority
              sizes="(max-width: 640px) 320px, (max-width: 768px) 640px, (max-width: 1024px) 768px, (max-width: 1280px) 1024px, (max-width: 1536px) 1280px, 1536px"
              width={375}
              height={645}
            />
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default React.memo(HeroBanner)
