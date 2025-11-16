'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { carouselBanners } from '@/constants/carousel'
import { ImageWithText } from './ImageWithText'
import './carousel-swiper.css'
import { useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'

export default function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex)
  }

  return (
    <section className="relative flex m-auto w-full h-[500px] lg:h-dvh bg-[#f3e8e7] overflow-hidden">
      <Swiper
        id="carousel-swiper"
        className="swiper-carousel-container"
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onSlideChange={handleSlideChange} // Update activeIndex when user drag/clicks
        // Set initial activeIndex when component mounts
        onSwiper={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {carouselBanners.map((banner, index) => (
          <SwiperSlide key={index} className="!flex max-[1024px]:!block max-[940px]:!flex">
            <ImageWithText
              alt="Slideshow Image"
              src={banner.src}
              label={{
                title: banner.label.title,
                subtitle: banner.label.subtitle,
                description: banner.label.description
              }}
              isActive={activeIndex === index}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
