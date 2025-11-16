'use client'

import { useDialogControlState } from '@/hooks/useDialogControlState'
import { description, footer } from '@/constants/disclaimer'
import ModalDialog from '../dialog/ModalDialog'

export const DisclaimerButton = ({ label }: { label: string }) => {
  const {
    isOpen: isDisclaimerOpen,
    openDialog: handleDisclaimerOpen,
    closeDialog: handleDisclaimerClose
  } = useDialogControlState()

  return (
    <>
      <button
        type="button"
        className="underline cursor-pointer"
        aria-label="Disclaimer button"
        onClick={handleDisclaimerOpen}
      >
        {label}
      </button>

      <ModalDialog
        title="Disclaimer"
        isOpen={isDisclaimerOpen}
        onClose={handleDisclaimerClose}
        isShowButton
        desChildren={description}
        footerChildren={footer}
      />
    </>
  )
}
