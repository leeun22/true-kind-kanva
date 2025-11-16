import React from 'react'
import Image from 'next/image'
import { motion, MotionValue } from 'motion/react'
import { ExploreCategoryType } from '@/types/explore'

interface ExploreParallaxImageProps {
  exploreItem: ExploreCategoryType
  exploreBannerTransform: MotionValue<string>
}

const ExploreParallaxImage = ({ exploreItem, exploreBannerTransform }: ExploreParallaxImageProps) => {
  return (
    <div className="half__grid-img parallax w-1/2 h-full overflow-hidden max-[768px]:hidden">
      <motion.div
        className="parallax-image relative w-full h-[110%] object-cover user-select-none"
        style={{
          transform: exploreBannerTransform,
          transition: 'transform 0.5s ease-out'
        }}
      >
        <Image
          className="block w-full h-full object-cover object-center"
          src={exploreItem.banner}
          alt="Explore Parallax Image"
          decoding="async"
          draggable="false"
          sizes="(max-width: 640px) 320px, (max-width: 768px) 640px, (max-width: 1024px) 768px, (max-width: 1280px) 1024px, (max-width: 1536px) 1280px, 1536px"
          width={768}
          height={841}
        />
      </motion.div>
    </div>
  )
}

// Memoize with custom comparison to only re-render when MotionValue actually changes
export default React.memo(ExploreParallaxImage)
