'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'motion/react'
import { motionTextVariants } from '@/utils/animations'
import LeafIcon from '@/assets/leaf-icon'
import CancerIcon from '@/assets/cancer-icon'
import HormoneIcon from '@/assets/hormone-icon'
import AllergyIcon from '@/assets/allergy-icon'

interface ZeroToxics {
  icon: React.ReactNode
  title: string
  description: string
}

const ProductZeroToxicsTitle = ({ refSection }: { refSection: React.RefObject<HTMLElement | null> }) => {
  const isInViewSection = useInView(refSection, {
    once: true,
    margin: '-50px 0px -50px 0px'
  })

  return (
    <motion.h2
      className="p-zero-toxic__title font-figtree text-fluid5xl leading-[1.1] -tracking-[1px]"
      variants={motionTextVariants.staggerContainer}
      initial="hidden"
      animate={isInViewSection ? 'visible' : 'hidden'}
      transition={{ duration: 1.2, ease: 'linear' }}
    >
      <div className="masking-text block overflow-hidden">
        <motion.div className="line inline-block will-change-transform" variants={motionTextVariants.fadeInUp}>
          Zero <span className="font-sentient font-[400] italic -tracking-[4px]">toxics</span> Given, 1800+
        </motion.div>
      </div>
      <div className="masking-text block overflow-hidden">
        <motion.div className="line inline-block will-change-transform" variants={motionTextVariants.fadeInUp}>
          Restricted Ingredients.
        </motion.div>
      </div>
    </motion.h2>
  )
}

export default function ProductZeroToxics() {
  const zeroToxics: ZeroToxics[] = [
    {
      icon: <LeafIcon />,
      title: 'No Ecology Disruptors',
      description: "No Animal derived ingredients, microplastics, silver & it's salts."
    },
    {
      icon: <CancerIcon />,
      title: 'No Cancer Causers',
      description: 'No Parabens, Formaldehyde-releasing agents, and Carcinogenic dyes.'
    },
    {
      icon: <HormoneIcon />,
      title: 'No Hormone Disruptors',
      description: 'No Phthalates, Synthetic fragrances, and Ethanolamines.'
    },
    {
      icon: <AllergyIcon />,
      title: 'No Allergy Causers',
      description: 'No Artificial fragrances, Dyes, and Irritating alcohols.'
    }
  ]

  const refSection = useRef(null)

  return (
    <section
      ref={refSection}
      id="product-zero-toxics"
      className="product-zero-toxics__section block lg:my-[102px] md:my-[80px] my-[62px_120px]"
    >
      <div className="product-zero-toxics__container block max-w-container">
        <div className="product-zero-toxics__row flex flex-wrap">
          <div className="product-zero-toxics__title-wrapper w-full flex-[0] basis-auto md:ml-[41%] mb-[38px] order-1">
            <ProductZeroToxicsTitle refSection={refSection} />
          </div>

          <div className="product-zero-toxics__list-wrapper flex md:flex-row flex-col items-center gap-[8%] w-full md:order-2 order-3">
            <div className="w-[33%] max-[900px]:w-1/2 max-md:w-full max-w-full max-[768px]:order-2">
              <ul className="p-zero-toxic__list flex flex-wrap md:flex-col sm:flex-row flex-col justify-between gap-y-[24px] h-full list-none">
                {zeroToxics.map((zeroToxic, index) => (
                  <li
                    key={index}
                    className={`p-zero-toxic__list-icon grid gap-x-[24px] items-center grid-cols-[63px_auto] grid-rows-1 md:w-full sm:w-1/2 w-full`}
                  >
                    <div className="icon-round flex items-center justify-center w-[63px] h-[63px] border border-solid border-[#c8c8c8] p-[15px] rounded-full">
                      {zeroToxic.icon}
                    </div>

                    <div className="p-zero-toxic__list-text flex flex-col gap-[10px]">
                      <h4 className="p-zero-toxic__list-title font-figtree text-[1.3rem] leading-[1.2] text-[#3b3b3b] uppercase">
                        {zeroToxic.title}
                      </h4>
                      <p className="font-figtree text-[1.3rem] leading-[1.2] text-[#a0a0a0] w-full max-w-[290px]">
                        {zeroToxic.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-[58%] max-[900px]:w-1/2 max-md:w-full max-w-full max-[768px]:order-1">
              <div className="media-img w-full select-none">
                <Image
                  className="w-full h-full object-cover"
                  src="/notoxics/zero-toxics-banner.jpg"
                  alt="Zero Toxics"
                  width={802}
                  height={513}
                  sizes="(max-width: 640px) 320px, (max-width: 768px) 640px, (max-width: 1024px) 768px, (max-width: 1280px) 1024px, (max-width: 1536px) 1280px, 1536px"
                />
              </div>
            </div>
          </div>

          <div className="product-zero-toxics__description-wrapper md:w-[58%] w-full flex-0 basis-auto md:ml-[41%] md:mt-[38px] mb-[38px] md:order-3 order-2">
            <div className="row flex sm:flex-row flex-col gap-[16px]">
              <div className="sm:w-[50%] w-full max-w-full">
                <p className="font-figtree text-[1.3rem] leading-[1.2] text-[#3b3b3b]">
                  We take our formulation philosophy and ingredient safety very seriously, because what you put on your
                  skin could impact your overall health and well-being.
                </p>
              </div>

              <div className="sm:w-[50%] w-full max-w-full">
                <p className="font-figtree text-[1.3rem] leading-[1.2] text-[#3b3b3b]">
                  That’s why our products are formulated to meet some of the highest safety standards in the world
                  (including US FDA, European Union - COSING Database, etc), prohibiting almost over 1800 Ingredients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
