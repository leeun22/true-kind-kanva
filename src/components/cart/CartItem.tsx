'use client'

import React, { useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAppDispatch } from '@/redux/hooks' // Hook tùy chỉnh cho Redux Dispatch
import { CartItem, removeItem, setCartOpen, updateQuantity } from '@/redux/features/products/cartSlice'
import RemoveIcon from '@/assets/remove-icon'
import MinusIcon from '@/assets/minus-icon'
import PlusIcon from '@/assets/plus-icon'
import styles from './cart.module.css'
import { useCurrencyFormat } from '@/hooks/useCurrencyFormat'

interface CartItemProps {
  item: CartItem
}

const CartItemComponent = ({ item }: CartItemProps) => {
  const dispatch = useAppDispatch()

  const handleCloseCart = useCallback(() => {
    dispatch(setCartOpen(false))
  }, [dispatch])

  // The function handles updating the quantity for the input.
  const handleQuantityInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuantity = parseInt(e.target.value)

      // If quantity is invalid or < 1, delete item (quantity = 0)
      if (isNaN(newQuantity) || newQuantity < 1) {
        dispatch(updateQuantity({ cartItemId: item.cartItemId, quantity: 0 }))
      } else {
        dispatch(updateQuantity({ cartItemId: item.cartItemId, quantity: newQuantity }))
      }
    },
    [dispatch, item.cartItemId]
  )

  // Function to Increase/Decrease the Number of buttons +/-
  const handleQuantityButtonClick = useCallback(
    (delta: number) => {
      const newQuantity = item.quantity + delta

      // If newQuantity <= 0, we change it to 0 to trigger the delete logic in cartSlice
      const finalQuantity = newQuantity > 0 ? newQuantity : 0

      dispatch(updateQuantity({ cartItemId: item.cartItemId, quantity: finalQuantity }))
    },
    [dispatch, item.cartItemId, item.quantity]
  )

  // Handle item deletion when pressing delete icon button
  const handleRemove = useCallback(() => {
    dispatch(removeItem({ cartItemId: item.cartItemId }))
  }, [dispatch, item.cartItemId])

  const formattedPrice = useCurrencyFormat(item.price)

  return (
    <div className="cart-drawer__item grid gap-x-[16px] grid-cols-[80px_1fr] grid-rows-1">
      <div className="cart-drawer__item-image w-[80px] h-[80px] rounded-[7px] overflow-hidden">
        <Image
          className="media-img select-none w-full h-full object-cover"
          src={`/products/${item.productImage}`}
          alt={item.productName}
          width={80}
          height={80}
        />
      </div>

      <div className="cart-drawer__item-wrapper flex flex-col gap-[8px] flex-1">
        <div className="cart-drawer__item-header flex justify-between items-start w-full gap-[16px]">
          <div className="cart-drawer__item-content flex flex-col justify-start gap-[8px] flex-1">
            <Link
              href={`/products/${item.productHandleURL}`}
              className="cart-drawer__item-title font-figtree text-[1.53rem] font-[400] text-[#3b3b3b] leading-[1.1] hover:!underline"
              onClick={handleCloseCart}
            >
              {item.productName}
            </Link>
            <p className="font-figtree text-[1.3rem] font-[400] text-[#787878] leading-[1.1]">{item.variantName}</p>
          </div>

          <button
            className="cart-drawer__item-remove text-[#3b3b3b] hover:scale-[1.1] transition cursor-pointer"
            onClick={handleRemove}
          >
            <RemoveIcon className="cart-drawer__item-remove-icon min-w-[12px] min-h-[12px]" />
          </button>
        </div>

        <div className="cart-drawer__item-footer flex items-center justify-between gap-[16px] mt-auto">
          <p className="cart-drawer__item-price font-figtree text-[1.3rem] text-[#3b3b3b]">
            <span>{formattedPrice}</span>
          </p>

          <div className="cart-drawer__item-quantity flex flex-row items-center justify-center rounded-[62px] bg-white text-[#3b3b3b] border-[1px] border-solid border-[#d8d8d8] px-[5px] py-[3px]">
            <button
              className="cart-drawer-qty-btn-minus p-[5px] cursor-pointer"
              onClick={() => handleQuantityButtonClick(-1)}
            >
              <MinusIcon className="w-[8px] h-[8px]" />
            </button>

            <input
              className={`${styles.cartDrawerQtyInput} font-figtree text-[1.3rem] text-[#3b3b3b] w-[38px] h-full text-center cursor-text`}
              type="number"
              min="1"
              value={item.quantity}
              onChange={handleQuantityInputChange}
            />

            <button
              className="cart-drawer-qty-btn-plus p-[5px] cursor-pointer"
              onClick={() => handleQuantityButtonClick(1)}
            >
              <PlusIcon className="w-[8px] h-[8px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(CartItemComponent)
