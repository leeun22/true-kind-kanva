'use client'

import React, { use, useState } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperClass } from 'swiper'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { Product } from '@/types/product'
import './product-swiper.css'

interface ProductImageGalleryProps {
  productPromise: Promise<Product>
}

export default function ProductImageGallery({ productPromise }: ProductImageGalleryProps) {
  const product: Product = use(productPromise)

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null)

  // handler function: It receives the Swiper object and calls your set state function
  const handleSwiperThumb = (swiper: SwiperClass) => {
    setThumbsSwiper(swiper)
  }

  return (
    <div
      className="product-detail__image md:sticky relative top-0 left-0 md:w-[54%] max-[900px]:w-1/2 max-[769px]:w-full md:h-[100dvh] max-[769px]:h-[60dvh] md:pt-[100px] pt-[62px] overflow-hidden"
      style={{ background: 'transparent' }}
    >
      <div className="product-detail__image-swiper relative md:top-[5%] top-0 md:w-[65%] w-full m-auto md:h-auto h-[calc(60dvh-12%)] select-none">
        <Swiper
          id="product-images-swiper"
          style={
            {
              '--swiper-navigation-color': '#fff',
              '--swiper-pagination-color': '#fff'
            } as React.CSSProperties
          }
          loop={true}
          spaceBetween={0}
          navigation={false}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="product__images-swiper md:h-auto h-full"
        >
          {/* Object.entries returns an array [key, value] */}
          {Object.entries(product.images).map(([imageName, imageUrl]) => (
            <SwiperSlide key={imageName}>
              <Image
                className="product__card-img w-full h-full object-contain object-center"
                alt={`${imageName} của sản phẩm ${product.name}`}
                src={`/products/${imageUrl}`}
                decoding="async"
                draggable="false"
                priority
                sizes="(max-width: 640px) 320px, (max-width: 768px) 640px, (max-width: 1024px) 768px, (max-width: 1280px) 1024px, (max-width: 1536px) 1280px, 1536px"
                width={612}
                height={682}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <Swiper
          id="product-thumb-swiper"
          onSwiper={handleSwiperThumb}
          spaceBetween={0}
          slidesPerView={2}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="product__images-swiper shadow-xs"
        >
          {Object.entries(product.images).map(([imageName, imageUrl]) => (
            <SwiperSlide key={imageName}>
              <Image
                className="product__card-img w-full h-full object-contain object-center"
                alt={`${imageName} của sản phẩm ${product.name}`}
                src={`/products/${imageUrl}`}
                decoding="async"
                draggable="false"
                sizes="(max-width: 640px) 320px, (max-width: 768px) 640px, (max-width: 1024px) 768px, (max-width: 1280px) 1024px, (max-width: 1536px) 1280px, 1536px"
                width={60}
                height={60}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
