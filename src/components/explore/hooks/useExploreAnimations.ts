import { useRef, useEffect, useState } from 'react'
import { useInView, useScroll, useTransform } from 'motion/react'

export const useExploreAnimations = (index: number) => {
  const refContent = useRef<HTMLDivElement | null>(null)
  const [isViewSliderTransform, setIsViewSliderTransform] = useState(true)

  const createTransformY = (y: number) => `translate(0px, ${y}%)`

  const isInViewContent = useInView(refContent, {
    once: true,
    margin: '-50px 0px -50px 0px'
  })

  const { scrollYProgress } = useScroll({
    target: refContent,
    offset: ['start 0.2', 'end 0.2']
  })

  const exploreBannerTransform = useTransform(scrollYProgress, [0, 8], [createTransformY(-15), createTransformY(100)])

  // Effect to activate transform when scrolling into viewport
  useEffect(() => {
    if (!isInViewContent) return

    setIsViewSliderTransform(false)

    // const timer = setTimeout(() => {
    //   setIsViewSliderTransform(false);
    // }, 150); // After 0.15s, the new effect appears.

    // return () => clearTimeout(timer);
  }, [isInViewContent])

  return {
    refContent,
    isInViewContent,
    isViewSliderTransform,
    exploreBannerTransform
  }
}
