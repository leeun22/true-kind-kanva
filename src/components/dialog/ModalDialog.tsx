'use client'

import React, { memo, useRef } from 'react'
import CloseButton from '../ui/CloseButton'
import { useDialogController } from '@/hooks/useDialogController'
import styles from './dialog.module.css'

interface ModalDialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  desChildren: React.ReactNode
  footerChildren: React.ReactNode
  isShowButton?: boolean
}

const ModalDialog = ({ isOpen, onClose, title, desChildren, footerChildren, isShowButton }: ModalDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useDialogController({
    dialogRef: dialogRef,
    isOpenDialog: isOpen,
    closeDialog: onClose
  })

  return (
    <dialog
      ref={dialogRef}
      className={`${styles.dialogContainer} fixed inset-0 w-screen h-screen bg-transparent p-0 m-0 max-w-none max-h-none overflow-visible`}
      data-state="closed"
    >
      <div
        className={`${styles.dialogContent} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl flex flex-col items-center gap-[24px] sm:gap-[35px] w-full max-w-[95vw] sm:max-w-[548px] max-h-[90dvh] z-[2] bg-white rounded-[7px] p-[20px_16px] md:p-[35px_44px] overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="dialog__head w-full">
          <div className="dialog__head-wrapper flex justify-between items-center">
            <h2 className="font-figtree text-[2rem] sm:text-[2.5rem] text-[#3b3b3b] font-[600] leading-[1.1]">
              {title}
            </h2>

            <CloseButton iconWidth={22} iconHeight={22} onClose={onClose} />
          </div>
        </div>

        <div className="dialog__body-wrapper flex flex-col gap-[24px] sm:gap-[35px] w-full overflow-x-hidden overflow-y-auto">
          <p className="font-figtree text-[1.6rem] sm:text-[1.9rem] leading-[1.2] text-[#3b3b3b] pr-[50px]">
            This website is a design concept and is not a functional e-commerce store.
          </p>

          <div className="dialog__description flex flex-col gap-[25px] w-full font-figtree text-[1.28rem] sm:text-[1.4rem] leading-[1.2] text-[#686868] pr-[50px]">
            {desChildren}
          </div>

          <div className="dialog__footer flex flex-col gap-[25px] w-full font-figtree text-[1.6rem] sm:text-[1.9rem] leading-[1.2] text-[#3b3b3b] pr-[50px]">
            {footerChildren}
          </div>

          {isShowButton && (
            <button
              type="button"
              className="dialog__button inline-block w-full mt-[12px] bg-transparent font-figtree text-[1.6rem] sm:text-[1.9rem] leading-[1.2] text-[#3b3b3b] !border border-solid border-[#3b3b3b] uppercase p-[16px_24px] sm:p-[19px_38px] rounded-[62px] cursor-pointer hover:bg-[#3b3b3b] hover:text-white"
              aria-label="Got It!"
              style={{
                transition: 'background .3s cubic-bezier(.18, .71, .11, 1), color .3s cubic-bezier(.18, .71, .11, 1)'
              }}
              onClick={onClose}
            >
              Got It!
            </button>
          )}
        </div>
      </div>
    </dialog>
  )
}

export default memo(ModalDialog)
