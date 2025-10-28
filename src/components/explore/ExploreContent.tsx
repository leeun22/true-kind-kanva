import { motion } from 'motion/react'
import React from 'react'
import { useExploreAnimations } from './hooks/useExploreAnimations'
import { useSwiperInteractions } from './hooks/useSwiperInteractions'
import ExploreParallaxImage from './ExploreParallaxImage'
import ExploreProductSlider from './ExploreProductSlider'
import { useExploreStyles } from './ExploreStyleContext'
import { ExploreCategoryType } from '@/types/explore'

interface ExploreContentProps {
  index: number
  exploreItem: ExploreCategoryType
}

const ExploreContent = ({ index, exploreItem }: ExploreContentProps) => {
  const styles = useExploreStyles()

  const { refContent, isInViewContent, isViewSliderTransform, exploreBannerTransform } = useExploreAnimations(index)

  const swiperInteractions = useSwiperInteractions(isViewSliderTransform)
  const { getSlideTransformConfig } = swiperInteractions
  const slideConfig = React.useMemo(() => getSlideTransformConfig(), [getSlideTransformConfig])

  return (
    <motion.div
      ref={refContent}
      className={`${styles.halfGrid} flex flex-row items-center justify-between w-full min-h-[832px] h-[120vh] overflow-hidden`}
    >
      <ExploreParallaxImage exploreItem={exploreItem} exploreBannerTransform={exploreBannerTransform} />

      <ExploreProductSlider
        exploreItem={exploreItem}
        isInViewContent={isInViewContent}
        swiperInteractions={swiperInteractions}
        slideConfig={slideConfig}
      />
    </motion.div>
  )
}

export default React.memo(ExploreContent)
