/**
 * This component contains all hooks (useState, useQueryState, useMemo, useDispatch)
 * And logic for handling variations/quantities, add to cart
 */

'use client'

import React, { use, useCallback, useMemo, useState } from 'react'
import ProductVariantPrice from './ProductVariantPrice'
import ProductVariantPicker from './ProductVariantPicker'
import { parseAsString, useQueryState } from 'nuqs'
import { decodeId } from '@/utils/hash-utils'
import QuantitySelector from './QuantitySelector'
import AddToCartButton from './AddToCartButton'
import { AppDispatch } from '@/redux/store'
import { useDispatch } from 'react-redux'
import { setCartOpen } from '@/redux/features/products/cartSlice'
import { Product, ProductVariant } from '@/types/product'

interface ProductInteractionRCCProps {
  productPromise: Promise<Product>
}

export default function ProductInteractionRCC({ productPromise }: ProductInteractionRCCProps) {
  // Use use() to resolve the Promise and stop hydration for this only component
  const product: Product = use(productPromise)

  const dispatch = useDispatch<AppDispatch>()

  const [quantity, setQuantity] = useState(1)

  // URL State: Manage Hash ID from URL
  const [hashIdFromURL, setVariantHash] = useQueryState('variant', parseAsString.withDefault(''))

  const handleVariantChange = useCallback(
    (newHashId: string) => {
      setVariantHash(newHashId, { shallow: true })

      // Reset quantity to 1 when hashIdFromURL changes
      setQuantity(1)
    },
    [setVariantHash]
  )

  const handleQuantityChange = useCallback((newQuantity: number) => {
    setQuantity(newQuantity)
  }, [])

  // Call redux action to open cart popup
  const handleAddToCart = useCallback(() => {
    dispatch(setCartOpen(true))
  }, [dispatch])

  const { finalSelectedVariant, isVariantSelected } = useMemo(() => {
    const defaultVariant = product.variants[0] || null

    let selectedVariant: ProductVariant | null = null
    let isSelectedValid: boolean = false

    if (hashIdFromURL) {
      const internalId = decodeId(hashIdFromURL)
      // Find Variant
      const foundVariant = product.variants.find((v) => v.id === internalId)

      if (foundVariant) {
        selectedVariant = foundVariant
        isSelectedValid = true
      }
    }

    // If not found, use default variant
    const finalSelectedVariant = selectedVariant || defaultVariant

    return {
      finalSelectedVariant,
      isVariantSelected: isSelectedValid
    }
  }, [hashIdFromURL, product.variants])

  const mainColor = 'rgb(212, 150, 155)'
  const buttonBgColor = isVariantSelected ? mainColor : '#d9d9d9'

  return (
    <>
      <ProductVariantPrice selectedVariant={finalSelectedVariant} />

      <ProductVariantPicker
        variants={product.variants}
        selectedVariant={hashIdFromURL || ''}
        onVariantChange={handleVariantChange}
      />

      <QuantitySelector
        isVariantSelected={isVariantSelected}
        currentQuantity={quantity}
        onQuantityChange={handleQuantityChange}
      />

      {/* Component pass calculated props */}
      {finalSelectedVariant && (
        <AddToCartButton
          product={product}
          selectedVariant={finalSelectedVariant}
          quantity={quantity}
          isVariantSelected={isVariantSelected}
          buttonBgColor={buttonBgColor}
          onAddedToCart={handleAddToCart}
        />
      )}
    </>
  )
}
