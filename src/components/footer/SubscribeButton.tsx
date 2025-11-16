'use client'

import React from 'react'
import { useDialogControlState } from '@/hooks/useDialogControlState'
import { description, footer } from '@/constants/disclaimer'
import ArrowLongIcon from '@/assets/arrow-long-icon'
import styles from './footer.module.css'
import ModalDialog from '../dialog/ModalDialog'

export const SubscribeButton = ({ label }: { label: string }) => {
  // Rename local variables using the syntax: originalName: newName
  const {
    isOpen: isSubscribeOpen,
    openDialog: handleSubscribeOpen,
    closeDialog: handleSubscribeClose
  } = useDialogControlState()

  return (
    <>
      <button
        type="submit"
        className={`${styles.footerBtnSubmit} group flex flex-col justify-center items-center cursor-pointer`}
        aria-label="Subscribe button"
        onClick={handleSubscribeOpen}
      >
        <div
          className="arrowlong relative flex items-center justify-center rounded-full xl:w-[82px] xl:h-[82px] w-[53px] h-[53px] bg-[#787878] overflow-hidden group-hover:bg-white group-hover:text-[#232323] group-hover:transform group-hover:scale-110"
          style={{ transition: 'transform .3s ease' }}
        >
          <ArrowLongIcon className={`${styles.arrowLongIcon} min-w-[12px] min-h-[12px]`} />
          <ArrowLongIcon
            className={`${styles.arrowLongIcon} min-w-[12px] min-h-[12px] opacity-0 absolute top-1/2 left-1/2`}
          />
        </div>

        <span className="font-figtree text-[1.27rem] text-[#a0a0a0] leading-[1.1] underline mt-[12px] uppercase group-hover:text-white">
          {label}
        </span>
      </button>

      <ModalDialog
        title="Disclaimers"
        isOpen={isSubscribeOpen}
        onClose={handleSubscribeClose}
        isShowButton
        desChildren={description}
        footerChildren={footer}
      />
    </>
  )
}
