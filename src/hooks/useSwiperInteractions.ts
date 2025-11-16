import { useState, useCallback } from 'react'
import type { SwiperInteractionState, SlideTransformConfig } from '../components/explore/types'

export const useSwiperInteractions = (
  isSliderTransform: boolean
): SwiperInteractionState & {
  getSlideTransformConfig: () => SlideTransformConfig
} => {
  const [isGrabbing, setIsGrabbing] = useState(false)

  const handleTouchStart = useCallback(() => {
    setIsGrabbing(true)
  }, [])

  const handleTouchEnd = useCallback(() => {
    setIsGrabbing(false)
  }, [])

  const getSlideTransformConfig = useCallback((): SlideTransformConfig => {
    let transform: string
    let transition: string

    if (isGrabbing) {
      transform = 'rotate(3deg) scale(0.9, 0.9)'
      transition = 'transform 0.2s ease-in-out'
    } else if (isSliderTransform) {
      transform = 'rotate(-3deg) scale(1.05, 1.05) translate(120px, -20px)'
      transition = 'transform 0.2s ease-in-out'
    } else {
      transform = 'rotate(0deg) scale(1) translate(0px, 0px)'
      transition = 'transform 1s ease-in-out'
    }

    return { transform, transition }
  }, [isGrabbing, isSliderTransform])

  return {
    isGrabbing,
    handleTouchStart,
    handleTouchEnd,
    getSlideTransformConfig
  }
}
