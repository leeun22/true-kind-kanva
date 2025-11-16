import React from 'react'
import Link from 'next/link'
import ArrowRightIcon from '@/assets/arrow-right-icon'
import styles from './cart.module.css'
import { useAppDispatch } from '@/redux/hooks'
import { setCartOpen } from '@/redux/features/products/cartSlice'

const CartEmptyState = () => {
  const dispatch = useAppDispatch()

  const handleCloseCart = () => {
    dispatch(setCartOpen(false))
  }

  return (
    <div className="cart-drawer__empty-state block mt-[27dvh] text-center">
      <span className="font-figtree xs:text-[48px] text-[38px] text-[#3b3b3b] leading-[1.1] -tracking-[1px]">
        Your cart is <br />
        <span className="font-sentient italic -tracking-[3px]">empty</span>
      </span>

      <Link
        href="/collections"
        className={`${styles.cartDrawerBtnEmptyLink} relative flex flex-row justify-center items-center w-full px-[6px] py-[14px] rounded-[62px] border border-solid border-[#c8c8c8] overflow-hidden bg-white min-[375px]:max-w-[75%] max-w-full mx-auto mt-[24px]`}
        aria-label="Browse Products"
        data-clone="true"
        onClick={handleCloseCart}
      >
        <span className="font-figtree text-[#3b3b3b] text-[1.27rem] text-center uppercase underline">
          Browse Products
        </span>

        <div className="cart-drawer__empty-icon-arrow absolute top-1/2 right-0 min-[375px]:w-[38px] min-[375px]:h-[38px] w-[32px] h-[32px] bg-[#3b3b3b] text-white rounded-full flex items-center justify-center -translate-x-[25%] -translate-y-1/2">
          <ArrowRightIcon className={`${styles.iconArrow}`} />
          <ArrowRightIcon className={`${styles.iconArrow} absolute top-1/2 left-1/2`} />
        </div>
      </Link>
    </div>
  )
}

export default React.memo(CartEmptyState)
