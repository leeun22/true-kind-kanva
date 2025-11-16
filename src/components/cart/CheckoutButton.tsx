'use client'

import { memo } from 'react'
import { useDialogControlState } from '@/hooks/useDialogControlState'
import { description, footer } from '@/constants/disclaimer'
import styles from './cart.module.css'
import { CartItem } from '@/redux/features/products/cartSlice'
import ArrowRightIcon from '@/assets/arrow-right-icon'
import ModalDialog from '../dialog/ModalDialog'

interface CheckoutButtonProps {
  label: string
  items: CartItem[]
}

const CheckoutButton = ({ label, items }: CheckoutButtonProps) => {
  const {
    isOpen: isCheckoutDialogOpen,
    openDialog: handleCheckoutDialogOpen,
    closeDialog: handleCheckoutDialogClose
  } = useDialogControlState()

  return (
    <>
      <button
        type="submit"
        className={`${styles.cartDrawerBtnCheckout} relative flex flex-row justify-center items-center w-full px-[6px] min-[375px]:py-[18px] py-[16px] rounded-[62px] overflow-hidden bg-[#3b3b3b] ${items.length === 0 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        name="checkout"
        aria-label="Checkout button"
        data-disabled={items.length === 0}
        disabled={items.length === 0}
        onClick={handleCheckoutDialogOpen}
      >
        <span className="font-figtree text-white text-[1.27rem] text-center uppercase underline">{label}</span>

        <div className="btn__icon-arrow absolute top-1/2 right-0 min-[375px]:w-[38px] min-[375px]:h-[38px] w-[32px] h-[32px] bg-white rounded-full flex items-center justify-center -translate-x-[25%] -translate-y-1/2 text-[#3b3b3b]">
          <ArrowRightIcon className={`${styles.iconArrow}`} />
          <ArrowRightIcon className={`${styles.iconArrow} absolute top-1/2 left-1/2`} />
        </div>
      </button>

      <ModalDialog
        title="Disclaimer"
        isOpen={isCheckoutDialogOpen}
        onClose={handleCheckoutDialogClose}
        isShowButton
        desChildren={description}
        footerChildren={footer}
      />
    </>
  )
}

export default memo(CheckoutButton)
