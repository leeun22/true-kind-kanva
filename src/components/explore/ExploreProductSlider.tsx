import Link from 'next/link'
import React from 'react'
import { motion } from 'motion/react'
import { FreeMode, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import ArrowIcon from '@/assets/arrow-icon'
import ProductCard from '@/components/products/ProductCard'
import { useExploreStyles } from '@/components/explore/ExploreStyleContext'
import { SlideTransformConfig, SwiperInteractionState } from '@/components/explore/types'
import { categoryStyles } from '@/constants/categoryStyles'
import { ExploreCategoryType } from '@/types/explore'
import { motionTextVariants } from '@/utils/animations'
import './explore-swiper.css'

interface ExploreProductSliderProps {
  exploreItem: ExploreCategoryType
  isViewTarget: boolean
  swiperInteractions: SwiperInteractionState
  slideConfig: SlideTransformConfig
}

const ExploreProductSlider = ({
  exploreItem,
  isViewTarget,
  swiperInteractions,
  slideConfig
}: ExploreProductSliderProps) => {
  const styles = useExploreStyles()
  const { handleTouchStart, handleTouchEnd } = swiperInteractions

  return (
    <div className="half__grid-content flex flex-col justify-between md:w-1/2 h-auto md:px-[calc(4%+9.6px)] overflow-hidden">
      <div className="half__grid-text flex items-end justify-between">
        <motion.div
          className="half__grid-title block w-full max-w-[256px]"
          variants={motionTextVariants.staggerContainer}
          initial="hidden"
          animate={isViewTarget ? 'visible' : 'hidden'}
          transition={{ duration: 1.2, ease: 'linear' }}
        >
          <h3 className="masking-text block font-figtree text-start text-fluid5xl leading-[1] tracking-[0] overflow-hidden">
            <motion.span
              className="word inline-block will-change-transform"
              variants={motionTextVariants.fadeInUp}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              {exploreItem.title}
            </motion.span>
          </h3>

          <h3 className="masking-text block font-sentient text-start text-fluid5xl italic leading-[1] -tracking-[3.5px] overflow-hidden">
            <motion.span
              className="word inline-block will-change-transform"
              variants={motionTextVariants.fadeInUp}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              {exploreItem.subtitle}
            </motion.span>
          </h3>
        </motion.div>

        <Link
          href="/collections"
          className={`${styles.sliderArrow} relative flex flex-row items-center justify-center text-white bg-[#3b3b3b] rounded-full shrink-0 aspect-square w-[51px] h-[51px] max-[769px]:w-[42px] max-[769px]:h-[42px] overflow-hidden`}
          aria-label="Collections"
          data-clone="true"
        >
          <ArrowIcon
            className={`${styles.iconArrow} ${styles.iconArrowFirst} min-w-[12px] min-h-[12px] origin-center`}
          />
          <ArrowIcon
            className={`${styles.iconArrow} ${styles.iconArrowSecond} min-w-[12px] min-h-[12px] origin-center absolute top-1/2 left-1/2`}
          />
        </Link>
      </div>

      <div className="half__grid-product-slider flex items-start w-full h-full">
        <Swiper
          id="explore-swiper"
          className={styles.exploreSwiper}
          slidesPerView={1}
          spaceBetween={20}
          freeMode={true}
          grabCursor={true}
          pagination={{
            clickable: true
          }}
          modules={[FreeMode, Pagination]}
          onTouchEnd={handleTouchEnd}
          onSliderMove={handleTouchStart}
          onTransitionEnd={handleTouchEnd}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 16
            },
            490: {
              slidesPerView: 2,
              spaceBetween: 16
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 16
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 16
            },
            1280: {
              slidesPerView: 2,
              spaceBetween: 20
            }
          }}
        >
          {exploreItem.products.map((product) => (
            <SwiperSlide
              key={product.id}
              className={styles.exploreSwiperSlide}
              style={{
                transform: slideConfig.transform,
                transition: slideConfig.transition
              }}
            >
              <ProductCard
                product={product}
                backgroundColor={categoryStyles[product.category] || 'rgb(241, 204, 207)'}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <p className="text-uppercase max-w-[295px] w-full uppercase font-figtree text-[1.28rem] font-[400] tracking-[0] leading-[1.2] text-[#3b3b3b]">
        {exploreItem.description}
      </p>
    </div>
  )
}

export default React.memo(ExploreProductSlider)
