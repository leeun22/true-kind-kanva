'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import CartIcon from '@/assets/cart-icon'
import { useExploreStyles } from '@/components/explore/ExploreStyleContext'
import { Product } from '@/types/product'

interface ProductCardProps {
  product: Product
  backgroundColor: string
}

const ProductCard = ({ product, backgroundColor }: ProductCardProps) => {
  const styles = useExploreStyles()

  const defaultPrice = product.capacities[0].price

  const formattedPrice = defaultPrice.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  })

  return (
    <Link
      href={`/products/${product.handleURL}`}
      className={`${styles.productCard} group flex flex-col justify-between relative h-auto p-[18px_12px] rounded-[14px] user-select-none overflow-hidden`}
      aria-label={product.name}
      style={{
        backgroundColor: backgroundColor
      }}
    >
      <div className="product__card-head relative flex justify-between items-center z-[3]">
        <p className="product__card-category inline-block px-[24px] pt-[10px] pb-[7px] bg-white text-[#3b3b3b] text-[1rem] leading-[1] uppercase font-figtree font-[400] rounded-[64px]">
          {product.category}
        </p>

        <div className="product__card-quickcart flex items-center justify-center bg-white rounded-full w-[26px] h-[26px]">
          <CartIcon className="icon-cart w-[10px] h-[13px] text-[#3b3b3b]" />
        </div>
      </div>

      <div className="product__content relative">
        <div
          className={`${styles.ProductMedia} relative block w-full h-[345px] max-h-[45vh] scale-[1.2] mx-auto -mt-[6px] mb-[12px] z-[1] group-hover:invisible`}
          style={{ transition: 'opacity 0.3s ease' }}
        >
          <Image
            className="product__card-img w-full h-full object-contain object-center"
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
          className={`${styles.ProductMedia} absolute top-0 left-0 block w-full h-[345px] max-h-[45vh] scale-[1.2] mx-auto mt-[0] mb-[12px] group-hover:z-[2] group-hover:visible`}
          style={{ transition: 'opacity 0.3s ease' }}
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
          <h3 className="product__card-title max-w-[70%] font-figtree text-[1.28rem] font-[400] tracking-[0] leading-[1.2] text-[#3b3b3b] uppercase">
            {product.name}
          </h3>

          <p className="product-price font-figtree text-[1.28rem] font-[400] tracking-[0] leading-[1.2] text-[#3b3b3b] whitespace-normal text-right">
            {formattedPrice ? formattedPrice : 'Out of Stock'}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default React.memo(ProductCard)
