/**
 * Create sequential appearance effects for child elements with the container as the parent,
 * Control the animation timing and order of child elements via transition.
 */

import type { Variants } from 'motion/react'

export const motionTextVariants: Record<string, Variants> = {
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  },

  fadeInUp: {
    hidden: {
      y: 10,
      opacity: 0,
      filter: 'blur(8px)'
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)'
    }
  },

  scaleInLine: {
    hidden: {
      y: 10,
      opacity: 0,
      filter: 'blur(8px)',
      scaleX: 0,
      transformOrigin: '0% 0%'
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      scaleX: 1,
      transformOrigin: '0% 100%'
    }
  }
}
