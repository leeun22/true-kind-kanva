import React, { Suspense } from 'react'
import { getFeaturedProducts } from '@/lib/data/productFeatured'
import FeaturedProductSwiper from './FeaturedProductSwiper'
import SkeletonProductCard from '../ui/SkeletonProductCard'

export default async function FeaturedProduct() {
  const featuredProductsPromise = getFeaturedProducts()

  return (
    <section
      id="product-featured"
      className="product-featured__section block lg:my-[102px] md:my-[80px] my-[62px] overflow-hidden"
    >
      <div className="product-featured__container max-w-container overflow-hidden">
        <h3 className="product-featured__title block text-center m-auto font-sentient text-fluid8xl italic leading-[1.1] -tracking-[3px]">
          featured
        </h3>

        <Suspense fallback={<SkeletonProductCard count={4} />}>
          <FeaturedProductSwiper featuredProductsPromise={featuredProductsPromise} />
        </Suspense>
      </div>
    </section>
  )
}
