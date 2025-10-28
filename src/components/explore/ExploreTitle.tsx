import React from 'react'
import { motion } from 'motion/react'
import { motionTextVariants } from '@/utils/animations'

interface ExploreTitleProps {
  isInViewSection: boolean
}

const ExploreTitle = ({ isInViewSection }: ExploreTitleProps) => {
  return (
    <motion.div
      className="explore__title block m-auto mb-[88px]"
      variants={motionTextVariants.staggerContainer}
      initial="hidden"
      animate={isInViewSection ? 'visible' : 'hidden'}
      transition={{ duration: 1.2, ease: 'linear' }}
    >
      <h2 className="masking-text block font-figtree text-center text-[5.8rem] font-[500] leading-[52px] -tracking-[1px] h-[58px] overflow-hidden">
        <motion.span className="word inline-block will-change-transform" variants={motionTextVariants.fadeInUp}>
          EXPLORE
        </motion.span>
      </h2>

      <h2 className="masking-text block font-sentient text-center text-[7.6rem] italic font-[400] leading-[50px] -tracking-[5px] h-[76px] overflow-hidden">
        <motion.span className="word inline-block will-change-transform" variants={motionTextVariants.fadeInUp}>
          pure potency
        </motion.span>
      </h2>
    </motion.div>
  )
}

export default React.memo(ExploreTitle)
