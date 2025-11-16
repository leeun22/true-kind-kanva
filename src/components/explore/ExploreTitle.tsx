import React from 'react'
import { motion } from 'motion/react'
import { motionTextVariants } from '@/utils/animations'

interface ExploreTitleProps {
  isInViewSection: boolean
}

const ExploreTitle = ({ isInViewSection }: ExploreTitleProps) => {
  return (
    <motion.div
      className="explore__title block m-auto md:mb-[88px] min-[490px]:mb-[80px] mb-[62px]"
      variants={motionTextVariants.staggerContainer}
      initial="hidden"
      animate={isInViewSection ? 'visible' : 'hidden'}
      transition={{ duration: 1.2, ease: 'linear' }}
    >
      <h2 className="masking-text block font-figtree text-center text-fluid8xl font-[600] -tracking-[1px] overflow-hidden">
        <motion.span className="word inline-block will-change-transform" variants={motionTextVariants.fadeInUp}>
          EXPLORE
        </motion.span>
      </h2>

      <h2 className="masking-text block font-sentient text-center text-fluid6xl italic -tracking-[5px] overflow-hidden">
        <motion.span className="word inline-block will-change-transform" variants={motionTextVariants.fadeInUp}>
          pure potency
        </motion.span>
      </h2>
    </motion.div>
  )
}

export default React.memo(ExploreTitle)
