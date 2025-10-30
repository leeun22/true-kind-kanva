'use client'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
// import required modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules'

import { carouselBanners } from '@/constants/carousel'
import { ImageWithText } from './ImageWithText'
import './carousel-swiper.css'

export function Carousel() {
  return (
    <section className="relative flex m-auto w-full h-dvh bg-[#f3e8e7] overflow-hidden">
      <Swiper
        id="carousel-swiper"
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="swiper-carousel-container"
      >
        {carouselBanners.map((banner, index) => (
          <SwiperSlide key={index} className="!flex">
            <ImageWithText
              alt="Slideshow Image"
              src={banner.src}
              label={{
                title: banner.label.title,
                subtitle: banner.label.subtitle,
                description: banner.label.description
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
