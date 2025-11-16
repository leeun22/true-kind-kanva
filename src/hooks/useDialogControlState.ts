/**
 * This custom hook manages the state and side effect behavior for the dialog.
 * It takes an initialState (false) as an input parameter and returns an object with 3 props
 * Those props are extracted (destructuring) into separate variables when called in the component.
 */

'use client'

import { useState, useCallback } from 'react'
import { useScrollLock } from './useScrollLock'

export interface ModalControlState {
  isOpen: boolean
  openDialog: () => void
  closeDialog: () => void
}

export const useDialogControlState = (initialState: boolean = false): ModalControlState => {
  const [isOpen, setIsOpen] = useState(initialState)

  useScrollLock({
    isLocked: isOpen
  })

  const openDialog = useCallback(() => setIsOpen(true), [])

  const closeDialog = useCallback(() => setIsOpen(false), [])

  return {
    isOpen,
    openDialog,
    closeDialog
  }
}
