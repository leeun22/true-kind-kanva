'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
// import CartIcon from '@/assets/cart-icon'
import { useExploreStyles } from '@/components/explore/ExploreStyleContext'
import { Product } from '@/types/product'
import { useCurrencyFormat } from '@/hooks/useCurrencyFormat'

interface ProductCardProps {
  product: Product
  backgroundColor: string
}

const ProductCard = ({ product, backgroundColor }: ProductCardProps) => {
  const styles = useExploreStyles()

  const defaultPrice = product.variants[0].price

  const formattedPrice = useCurrencyFormat(defaultPrice)

  return (
    <Link
      href={`/products/${product.handleURL}`}
      className={`${styles.productCard} @container/card group flex flex-col justify-between relative h-full p-[18px_12px] rounded-[14px] overflow-hidden`}
      aria-label={product.name}
      style={{
        backgroundColor: backgroundColor
      }}
    >
      <div className="product__card-head relative flex justify-between items-center z-[3]">
        <p className="product__card-category inline-block lg:px-[24px] px-[14px] max-xs:px-[22px] pt-[10px] pb-[7px] bg-white uppercase font-figtree text-[1rem] @max-[250px]/card:text-fluid2lg rounded-[64px]">
          {product.category}
        </p>

        {/* <div className="product__card-quick-cart flex items-center justify-center bg-white rounded-full w-[26px] h-[26px]">
          <CartIcon className="icon-cart w-[10px] h-[13px] text-[#3b3b3b]" />
        </div> */}
      </div>

      <div className="product__content relative">
        <div
          className="product__card-media relative block w-full h-[380px] max-h-[45dvh] @max-[310px]/card:h-[340px] @max-[255px]/card:h-[280px] @max-[230px]/card:h-[250px] @max-[200px]/card:h-[210px] scale-[1.2] mx-auto -mt-[6px] mb-[12px] z-[1] group-hover:invisible group-hover:opacity-0"
          style={{ transition: 'opacity 0.3s ease, height 0.15s ease' }}
        >
          <Image
            className="product__card-img w-full h-full object-contain object-center select-none pointer-events-none"
            alt={product.name}
            src={`/products/${product.images.featureImage}`}
            decoding="async"
            draggable="false"
            sizes="(max-width: 640px) 320px, (max-width: 768px) 640px, (max-width: 1024px) 768px, (max-width: 1280px) 1024px, (max-width: 1536px) 1280px, 1536px"
            width={335}
            height={375}
          />
        </div>

        {/* Product card image 2 */}
        <div
          className={`${styles.ProductMedia} absolute top-0 left-0 block w-full h-[380px] max-h-[45dvh] @max-[300px]/card:h-[340px] @max-[255px]/card:h-[280px] @max-[230px]/card:h-[250px] @max-[200px]/card:h-[210px] scale-[1.2] opacity-0 mx-auto mt-[0] mb-[12px] group-hover:z-[2] group-hover:visible group-hover:opacity-100`}
          style={{ transition: 'opacity 0.3s ease, height 0.15s ease' }}
        >
          <Image
            className="product__card-img w-full h-full object-contain object-center"
            alt={product.name}
            src={`/products/${product.images.secondaryImage}`}
            decoding="async"
            draggable="false"
            sizes="(max-width: 640px) 320px, (max-width: 768px) 640px, (max-width: 1024px) 768px, (max-width: 1280px) 1024px, (max-width: 1536px) 1280px, 1536px"
            width={335}
            height={375}
          />
        </div>

        <div className="product__card-foot relative flex items-end justify-between z-[2]">
          <h3 className="product__card-title max-w-[70%] font-figtree text-[1.3rem] @max-[250px]/card:text-fluid3lg tracking-[0] uppercase">
            {product.name}
          </h3>

          <p className="product-price font-figtree text-[1.3rem] @max-[250px]/card:text-fluid3lg tracking-[0] whitespace-normal text-right">
            {formattedPrice ? formattedPrice : 'Out of Stock'}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default React.memo(ProductCard)
