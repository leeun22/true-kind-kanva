/**
 * This hook will track the scroll effect on each individual target element passed via refTarget.
 * When using this hook in multiple components, each component will have its own refTarget
 * and the hook will calculate transformMotion independently for that element.
 */

import { useScroll, useTransform } from 'motion/react'
import { RefObject } from 'react'

interface useTransformMotionProps {
  index?: number
  refTarget: RefObject<HTMLDivElement | null>
  startY: number
  endY: number
  startOffset?: number
}

export const useTransformMotion = ({
  index = 0,
  refTarget,
  startY,
  endY,
  startOffset = 1
}: useTransformMotionProps) => {
  // Function to create transform Y string
  const createTransformY = (y: number) => `translate(0px, ${y}%)`

  /**
   * Track the scrolling progress of the target element with useScroll()
   * Starts when the top edge of the target touches the bottom edge of the viewport ('start 1')
   * and ends when the bottom edge of the target touches the top edge of the viewport ('end 0')
   */
  const { scrollYProgress } = useScroll({
    target: refTarget,
    offset: [`start ${startOffset}`, 'end 0']
  })

  const transformMotion = useTransform(scrollYProgress, [0, 1], [createTransformY(startY), createTransformY(endY)])

  return {
    refTarget,
    transformMotion
  }
}
