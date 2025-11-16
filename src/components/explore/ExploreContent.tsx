import { motion } from 'motion/react'
import React from 'react'
import { useExploreAnimations } from './hooks/useExploreAnimations'
import { useSwiperInteractions } from '@/hooks/useSwiperInteractions'
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

  const { refTarget, isViewTarget, isSliderTransform, exploreBannerTransform } = useExploreAnimations(index)

  const swiperInteractions = useSwiperInteractions(isSliderTransform)
  const { getSlideTransformConfig } = swiperInteractions
  const slideConfig = React.useMemo(() => getSlideTransformConfig(), [getSlideTransformConfig])

  return (
    <motion.div
      ref={refTarget}
      className={`${styles.halfGrid} flex flex-row items-center justify-between w-full md:min-h-[832px] md:h-[120vh] max-[768px]:mb-[50px] overflow-hidden`}
    >
      <ExploreParallaxImage exploreItem={exploreItem} exploreBannerTransform={exploreBannerTransform} />

      <ExploreProductSlider
        exploreItem={exploreItem}
        isViewTarget={isViewTarget}
        swiperInteractions={swiperInteractions}
        slideConfig={slideConfig}
      />
    </motion.div>
  )
}

export default React.memo(ExploreContent)
