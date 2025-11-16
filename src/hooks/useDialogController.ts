/**
 * This custom hook will receive dialogRef and closeDialog handler functions as props,
 * Contains all 3 useEffect logic blocks.
 */

import { useEffect } from 'react'

interface UseDialogControllerProps {
  dialogRef: React.RefObject<HTMLDialogElement | null>
  isOpenDialog: boolean
  closeDialog: () => void
  transitionDuration?: number
}

export const useDialogController = ({ dialogRef, isOpenDialog, closeDialog }: UseDialogControllerProps) => {
  /** Handling opening/closing dialog with transition */
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    // If isOpen is true and the modal is not open, then open the modal
    if (isOpenDialog && !dialog.open) {
      // Use showModal() to open dialog in modal mode (including backdrop)
      dialog.showModal()

      // Make sure to focus on the dialog to improve A11y
      dialog.focus()

      // Trigger the open transition (use requestAnimationFrame to ensure it runs after render)
      requestAnimationFrame(() => {
        dialog.setAttribute('data-state', 'open')
      })
    } else {
      dialog.setAttribute('data-state', 'closing')

      const timer = setTimeout(() => {
        // Use close() to close the dialog
        dialog.close()

        dialog.setAttribute('data-state', 'closed')
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [isOpenDialog])

  /** Handle backdrop click (click outside sidebar) */
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const handleClickBackdrop = (e: MouseEvent) => {
      if (e.target === dialog) {
        closeDialog()
      }
    }

    dialog.addEventListener('click', handleClickBackdrop)
    return () => dialog.removeEventListener('click', handleClickBackdrop)
  }, [closeDialog])

  /** ESC key handling */
  useEffect(() => {
    // Only listen when dialog is open
    if (!isOpenDialog) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeDialog()
      }
    }

    // Listen on document instead of dialog
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpenDialog, closeDialog])
}
