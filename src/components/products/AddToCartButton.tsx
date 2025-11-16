'use client'

import React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { addItem } from '@/redux/features/products/cartSlice'
import { Product, ProductVariant } from '@/types/product'
import CartIcon from '@/assets/cart-icon'
import styles from './product.module.css'

interface AddToCartButtonProps {
  product: Product
  selectedVariant: ProductVariant
  quantity: number
  isVariantSelected: boolean
  buttonBgColor: string
  onAddedToCart: () => void
}

const AddToCartButton = ({
  product,
  selectedVariant,
  quantity,
  isVariantSelected,
  buttonBgColor,
  onAddedToCart
}: AddToCartButtonProps) => {
  const dispatch = useDispatch<AppDispatch>()

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    // If no variant is selected, do nothing.
    if (!isVariantSelected) {
      return
    }

    // Payload matches exactly with cartSlice.addItem
    dispatch(
      addItem({
        product: product,
        variant: selectedVariant,
        quantity: quantity
      })
    )

    // Open cart
    onAddedToCart()
  }

  return (
    <button
      id="AddToCart"
      className={`${styles.addToCartBtn} relative flex flex-row items-center justify-center text-center w-full lg:h-[62px] xs:h-[58px] h-[52px] p-[12px] rounded-[62px] shadow-xs overflow-hidden`}
      type="submit"
      name="add"
      style={{
        background: buttonBgColor,
        cursor: isVariantSelected ? 'pointer' : 'not-allowed'
      }}
      data-disabled={!isVariantSelected}
      onClick={handleButtonClick}
      disabled={!isVariantSelected}
    >
      <p className="add-to-cart__btn-label font-figtree text-[1.27rem] text-white underline uppercase">
        <span>{isVariantSelected ? 'Add to cart' : 'Select Capacity'}</span>
      </p>

      <div
        className={`${styles.addToCartBtnIconArrow} flex flex-row items-center justify-center bg-white rounded-full w-[38px] h-[38px] absolute right-0 top-1/2`}
        style={{ color: buttonBgColor }}
      >
        <CartIcon
          className={`${styles.addToCartBtnIcon} min-w-[12px] min-h-[12px] absolute top-1/2 left-1/2 origin-center`}
        />
        <CartIcon className={`${styles.addToCartBtnIcon} min-w-[12px] min-h-[12px] origin-center`} />
      </div>
    </button>
  )
}

export default React.memo(AddToCartButton)
