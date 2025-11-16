import { useCurrencyFormat } from '@/hooks/useCurrencyFormat'
import { ProductVariant } from '@/types/product'
import React from 'react'

interface ProductVariantPriceProps {
  selectedVariant: ProductVariant
}

const ProductVariantPrice = ({ selectedVariant }: ProductVariantPriceProps) => {
  const formattedPrice = useCurrencyFormat(selectedVariant.price)

  return (
    <div className="p-detail__detail-price-wrapper inline-block mt-[38px]">
      <span className="p-detail__detail-price font-figtree text-[1.53rem] text-[#3b3b3b] font-[400] leading-[1.1] uppercase">
        {formattedPrice}
      </span>
    </div>
  )
}

export default React.memo(ProductVariantPrice)
