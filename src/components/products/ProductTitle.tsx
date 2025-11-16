'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { motionTextVariants } from '@/utils/animations'
import { useSplitText } from '@/hooks/useSplitText'

interface ProductTitleProps {
  productTitle: string
}

const ProductTitle = ({ productTitle }: ProductTitleProps) => {
  const parts = useSplitText(productTitle)

  const refContent = useRef(null)
  const isInViewSection = useInView(refContent, {
    once: true,
    margin: '-50px 0px -50px 0px'
  })

  return (
    <motion.h1
      ref={refContent}
      className="p-detail__detail-title block font-figtree text-fluid5xl font-[500] text-[#3b3b3b] leading-[1.1] tracking-[0] my-[12px]"
      variants={motionTextVariants.staggerContainer}
      initial="hidden"
      animate={isInViewSection ? 'visible' : 'hidden'}
      transition={{ ease: 'linear' }}
    >
      <div className="masking-text block overflow-hidden">
        {parts.map((part, index) => (
          <motion.span
            key={index}
            className="text inline-block whitespace-pre-wrap will-change-transform"
            variants={motionTextVariants.fadeInUp}
          >
            {part}{' '}
          </motion.span>
        ))}
      </div>
    </motion.h1>
  )
}

export default React.memo(ProductTitle)
