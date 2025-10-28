'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView, useScroll, useTransform } from 'motion/react'
import { motionTextVariants } from '@/utils/animations'
import InstagramIcon from '@/assets/instagram-icon'

export default function Connect() {
  const ref = useRef(null)
  const createTransformY = (y: number) => `translate(0px, ${y}%)`

  const isInViewSection = useInView(ref, {
    once: true,
    margin: '-50px 0px -50px 0px'
  })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end']
  })

  const connectImageTransform1 = useTransform(scrollYProgress, [0, 1], [createTransformY(44), createTransformY(-20)])

  const connectImageTransform2 = useTransform(scrollYProgress, [0, 1], [createTransformY(66), createTransformY(40)])

  return (
    <section ref={ref} id="connect" className="block relative my-[102px] mb-0 mt-[15%] pb-[256px]">
      <div className="container relative max-w-[1400px] w-full m-auto px-[calc(8px*.5)]">
        <div className="row flex flex-wrap m-0">
          <div className="col flex flex-col justify-between flex-shrink-0 flex-grow-0 basis-auto w-[16%] max-w-full">
            <motion.div
              className="media-img relative w-full select-none"
              style={{
                transform: connectImageTransform1,
                transition: 'transform 0.5s ease-out'
              }}
            >
              <Image
                className="w-full h-full object-cover"
                alt="Connect 1"
                src="/connects/connect-1.jpg"
                decoding="async"
                draggable="false"
                sizes="(max-width: 640px) 320px, (max-width: 768px) 640px, (max-width: 1024px) 768px, (max-width: 1280px) 1024px, (max-width: 1536px) 1280px, 1536px"
                width={238}
                height={159}
              />
            </motion.div>

            <p className="text-gray3 max-w[217px] text-[1.28rem] font-figtree font-[400] text-[#787878]">
              Get the latest news about skincare tips and new products.
            </p>
          </div>

          <div className="col relative px-[38px] w-[66%] max-w-full">
            <motion.div
              className="connect__title block m-auto absolute top-[-81px] left-1/2 -translate-x-1/2 text-center"
              variants={motionTextVariants.staggerContainer}
              initial="hidden"
              animate={isInViewSection ? 'visible' : 'hidden'}
              transition={{ duration: 1.2, ease: 'linear' }}
            >
              <h2 className="masking-text block font-figtree text-center text-[5.9rem] text-[#3b3b3b] font-[500] leading-[1] -tracking-[1px] uppercase h-[59px] overflow-hidden">
                <motion.span className="word inline-block will-change-transform" variants={motionTextVariants.fadeInUp}>
                  CONNECT
                </motion.span>
              </h2>

              <h2 className="masking-text block font-figtree text-center text-[5.9rem] text-[#3b3b3b] font-[500] leading-[1] -tracking-[1px] uppercase h-[59px] overflow-hidden">
                <motion.span className="word inline-block will-change-transform" variants={motionTextVariants.fadeInUp}>
                  WITH US
                </motion.span>
              </h2>
            </motion.div>

            <div className="connect__image relative w-full h-full object-center object-cover z-[-1]">
              <div className="media-img-desktop block relative w-full user-none">
                <Image
                  className="w-full h-full object-cover"
                  alt="Connect 2"
                  src="/connects/connect.jpg"
                  decoding="async"
                  draggable="false"
                  sizes="(max-width: 640px) 320px, (max-width: 768px) 640px, (max-width: 1024px) 768px, (max-width: 1280px) 1024px, (max-width: 1536px) 1280px, 1536px"
                  width={875}
                  height={600}
                />
              </div>

              <div className="media-img-mobile hidden relative w-full user-select-none">
                <Image
                  className="w-full h-full object-cover"
                  alt="Connect 2"
                  src="/connects/connect-m.jpg"
                  decoding="async"
                  draggable="false"
                  sizes="(max-width: 640px) 320px, (max-width: 768px) 640px, (max-width: 1024px) 768px, (max-width: 1280px) 1024px, (max-width: 1536px) 1280px, 1536px"
                  width={875}
                  height={600}
                />
              </div>
            </div>

            <h2 className="connect__subtitle absolute -bottom-[78px] left-1/2 -translate-x-1/2 text-center font-sentient text-[8.2rem] font-[400] italic leading-[.65] -tracking-[5px]">
              {' '}
              on <br /> instagram{' '}
            </h2>

            <div className="connect__socmed w-full max-w-[262px] absolute -bottom-[223px] left-1/2 -translate-x-1/2 -translate-y-1/2 hover:scale-105 transition-transform duration-200">
              <Link
                className="block--icon-global flex items-center text-center rounded-[65px] w-full px-[6.5px] py-[8.5px] border-[1px] border-solid border-[#c8c8c8] uppercase !underline"
                href="https://www.instagram.com/truekind.skin/"
                rel="noopener noreferrer"
                target="_blank"
                style={{
                  translate: 'none',
                  rotate: 'none',
                  scale: 'none',
                  transform: 'translate(0px, 0px)'
                }}
              >
                <span className="flex-1 text-center ml-[26px] font-figtree text-[1.3rem] text-[#3b3b3b]">
                  Instagram
                </span>

                <div className="icon-global flex items-center justify-center bg-[#3b3b3b] w-[38px] h-[38px] rounded-[100%] aspect-square">
                  <InstagramIcon className="min-w-[13px] min-h-[13px]" />
                </div>
              </Link>
            </div>

            <p className="connect__desc hidden text-[#787878] max-w-[232px] m-auto text-center">
              Get the latest news about skincare tips and new products.
            </p>
          </div>

          <div className="col block w-[16%] max-w-full">
            <motion.div
              className="media-img relative -bottom-[70%] w-full select-none"
              style={{
                transform: connectImageTransform2,
                transition: 'transform 0.5s ease-out'
              }}
            >
              <Image
                className="w-full h-full object-cover"
                alt="Connect 3"
                src="/connects/connect-2.jpg"
                decoding="async"
                draggable="false"
                sizes="(max-width: 640px) 320px, (max-width: 768px) 640px, (max-width: 1024px) 768px, (max-width: 1280px) 1024px, (max-width: 1536px) 1280px, 1536px"
                width={238}
                height={316}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
