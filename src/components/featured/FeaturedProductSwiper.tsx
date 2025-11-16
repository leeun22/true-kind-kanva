'use client'

import React, { use, useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Pagination } from 'swiper/modules'
import { useInView } from 'motion/react'
import ProductCard from '@/components/products/ProductCard'
import { categoryStyles } from '@/constants/categoryStyles'
import { Product } from '@/types/product'
import { useSwiperInteractions } from '@/hooks/useSwiperInteractions'
import styles from './featured.module.css'
import './featured-swiper.css'

interface FeaturedProductSwiperProps {
  featuredProductsPromise: Promise<Product[]>
}

const FeaturedProductSwiper = ({ featuredProductsPromise }: FeaturedProductSwiperProps) => {
  const featuredProducts: Product[] = use(featuredProductsPromise)

  const refContent = useRef(null)
  const [isViewSliderTransform, setIsViewSliderTransform] = useState(true)

  const isInViewContent = useInView(refContent, {
    once: true,
    margin: '-5px 0px -5px 0px'
  })

  // Call the hook and get the required values ​​from the useSwiperInteractions hook
  const { handleTouchStart, handleTouchEnd, getSlideTransformConfig } = useSwiperInteractions(isViewSliderTransform) // Only pass isViewSliderTransform

  // Effect to activate transform when scrolling into viewport
  useEffect(() => {
    if (!isInViewContent) return

    setIsViewSliderTransform(false)
  }, [isInViewContent])

  // Calculate slideConfig only when getSlideTransformConfig changes, as it depends on isGrabbing and isViewSliderTransform
  const slideConfig = React.useMemo(() => getSlideTransformConfig(), [getSlideTransformConfig])

  return (
    <Swiper
      id="featured-product-swiper"
      ref={refContent}
      className={styles.featuredProductListSwiper}
      slidesPerView={1} // Default number of slides (Mobile First - Under 640px)
      spaceBetween={20}
      freeMode={true}
      grabCursor={true}
      pagination={{
        clickable: true
      }}
      modules={[FreeMode, Pagination]}
      // onTouchStart={handleTouchStart} // When touched/held
      onSliderMove={handleTouchStart} // When dragging
      onTouchEnd={handleTouchEnd} // When lifting finger/releasing hold
      onTransitionEnd={handleTouchEnd} // When the transition animation ends
      breakpoints={{
        0: {
          slidesPerView: 1,
          spaceBetween: 16
        },
        490: {
          slidesPerView: 2,
          spaceBetween: 16
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 20
        }
      }}
    >
      {featuredProducts.map((product) => (
        <SwiperSlide
          key={product.id}
          className={styles.featuredProductSwiperSlide}
          style={{
            transform: slideConfig.transform,
            transition: slideConfig.transition
          }}
        >
          <ProductCard product={product} backgroundColor={categoryStyles[product.category] || 'rgb(241, 204, 207)'} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default FeaturedProductSwiper
