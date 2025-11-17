'use client'

import React, { useCallback, useRef, Fragment } from 'react'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { selectCartState, setCartOpen } from '@/redux/features/products/cartSlice'
import { useScrollLock } from '@/hooks/useScrollLock'
import { useDialogController } from '@/hooks/useDialogController'
import CartItem from './CartItem'
import Divider from '../ui/Divider'
import CartEmptyState from './CartEmptyState'
import styles from './cart.module.css'
import CloseButton from '../ui/CloseButton'
import CheckoutButton from './CheckoutButton'
import { useCurrencyFormat } from '@/hooks/useCurrencyFormat'

export default function CartPopup() {
  const dispatch = useAppDispatch()
  const { items, subtotal, itemCount, isCartOpen } = useAppSelector(selectCartState)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const closeCart = useCallback(() => {
    dispatch(setCartOpen(false))
  }, [dispatch])

  // Custom hook handles scroll locking and keeps current scroll position
  useScrollLock({
    isLocked: isCartOpen
  })

  // Handle opening/closing dialog with transition, click outside, esc key
  useDialogController({
    dialogRef: dialogRef,
    isOpenDialog: isCartOpen,
    closeDialog: closeCart
  })

  const formattedSubtotal = useCurrencyFormat(subtotal)

  return (
    <dialog
      ref={dialogRef}
      className={`${styles.cartDialog} fixed inset-0 w-screen h-[100dvh] bg-transparent p-0 m-0 max-w-none max-h-none overflow-visible`}
      data-state="closed"
    >
      <div
        className={`${styles.cartSidebar} absolute top-0 right-0 w-full max-w-[510px] h-full p-[24px_28px] max-[490px]:p-[24px_16px] bg-white shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center mb-[32px]">
            <h2 className="font-figtree text-[3rem] text-[#3b3b3b] leading-[1] flex items-start">
              Cart
              <span className="font-figtree text-[18px] text-[#3b3b3b]">({itemCount})</span>
            </h2>

            <CloseButton iconWidth={22} iconHeight={22} onClose={closeCart} />
          </div>

          {items.length === 0 ? (
            <CartEmptyState />
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 flex flex-col justify-start gap-[20px] p-[8px] overflow-x-hidden overflow-y-auto">
                {items.map((item, index) => (
                  <Fragment key={item.cartItemId}>
                    <CartItem key={item.cartItemId} item={item} />

                    {index !== items.length - 1 && <Divider className="!m-0" />}
                  </Fragment>
                ))}
              </div>

              {/* Footer / CheckoutBtn */}
              <div className="cart-drawer__footer flex flex-col gap-[12px] pt-[12px] w-full">
                <div className="cart-drawer__footer-subtotal flex justify-between items-center gap-[16px]">
                  <span className="cart-drawer__footer-subtotal-label font-figtree text-[1.8rem] text-[#3b3b3b] select-none">
                    Subtotal
                  </span>
                  <span className="cart-drawer__footer-subtotal-price font-figtree text-[1.8rem] text-[#3b3b3b] select-none">
                    {formattedSubtotal}
                  </span>
                </div>

                <CheckoutButton label="CONTINUE TO CHECKOUT" items={items} />

                <p className="font-figtree text-[1.3rem] text-[#787878]">
                  Shipping, taxes, and discount codes are calculated at checkout
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </dialog>
  )
}
