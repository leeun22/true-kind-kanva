/**
 * Component that displays Variant buttons
 * Calls callback to update Query URL with encoded Hash ID.
 */

import React, { useCallback } from 'react'
import { encodeId } from '../../utils/hash-utils'
import { ProductVariant } from '@/types/product'

interface ProductVariantPickerProps {
  variants: ProductVariant[]
  selectedVariant: string
  // Callback for parent component (using nuqs) to update URL
  onVariantChange: (hashId: string) => void
}

const ProductVariantPicker = ({ variants, selectedVariant, onVariantChange }: ProductVariantPickerProps) => {
  const handleVariantClick = useCallback(
    (internalId: number) => {
      // Encode Internal ID into Hash ID
      const newHashId = encodeId(internalId)

      // Call callback to parent component (nuqs) to update URL
      onVariantChange(newHashId)
    },
    [onVariantChange]
  )

  return (
    <div className="p-detail__detail-variants my-[38px]">
      <p className="p-detail__detail-variant-label font-figtree text-[1.27rem] font-[400] text-[#3b3b3b] leading-[1.2] mb-[10px]">
        Capacity:
      </p>

      <div className="p-detail__detail-variant-container flex items-start flex-wrap gap-x-[6px] gap-y-[8px]">
        {variants.map((variant) => {
          // Calculate Hash ID of current variant
          const variantHash = encodeId(variant.id)

          // Check Active status: Does the current Hash ID match the Hash ID from the URL
          const isActive = variantHash === selectedVariant

          return (
            <button
              key={variant.id}
              data-active={isActive}
              aria-label={`Capacity ${variant.capacity}`}
              onClick={() => handleVariantClick(variant.id)} // When clicked, pass Internal ID (variant.id) to encode and update URL
              className="p-detail__detail-variant-button px-[12px] py-[8px] font-figtree text-[1.27rem] w-auto cursor-pointer rounded-[4px] transition-all duration-150 select-none  data-[active=true]:bg-[#3b3b3b] data-[active=true]:text-white data-[active=false]:bg-[#e1e1e1] data-[active=false]:hover:bg-[#d8d8d8] data-[active=false]:text-[#3b3b3b] shadow-xs"
            >
              {variant.capacity}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default React.memo(ProductVariantPicker)
