/**
 * This component does not use Redux hooks directly but is a place to manage local state (quantity, isPopupOpen) and pass necessary data down to AddToCartButton.
 * Responsibility: Provide complete Payload (product, selectedVariant, quantity) to AddToCartButton for dispatch.
 */

import { Suspense } from 'react'
import ProductDetailBenefits from './ProductBenefit'
import ProductInfoAccordion from './ProductInfoAccordion'
import { Product } from '@/types/product'
import ProductInfoStaticRSC from './ProductInfoStaticRSC'
import ProductInteractionRCC from './ProductInteractionRCC'
import { ProductInfoInteractiveSkeleton } from '../ui/ProductInfoSkeleton'

interface ProductInformationProps {
  productPromise: Promise<Product>
}

export default function ProductInformation({ productPromise }: ProductInformationProps) {
  return (
    <div
      className="product-detail__information block w-[46%] min-h-[100dvh] max-[900px]:w-1/2 max-[768px]:w-full max-[767px]:!bg-transparent"
      style={{ background: 'transparent' }}
    >
      <div
        className="product-detail__information-content block min-h-[100dvh] md:mt-[100px] p-[50px_75px] max-[1025px]:p-[42px_36px] max-[840px]:p-[36px_24px]"
        style={{ background: '#f2f2f2' }}
      >
        {/* Load Priority 1: Static Content (RSC) */}
        <ProductInfoStaticRSC productPromise={productPromise} />

        {/* Load Priority 2: Reactive Logic (RCC) */}
        <Suspense fallback={<ProductInfoInteractiveSkeleton />}>
          <ProductInteractionRCC productPromise={productPromise} />
        </Suspense>

        {/* Static component (Fixed, no data needed, renders immediately) */}
        <ProductDetailBenefits />

        <ProductInfoAccordion />
      </div>
    </div>
  )
}
