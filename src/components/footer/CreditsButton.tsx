'use client'

import Link from 'next/link'
import { useDialogControlState } from '@/hooks/useDialogControlState'
import ModalDialog from '../dialog/ModalDialog'

const description = (
  <>
    <p>
      Design by:{' '}
      <Link
        href="https://abhishekjha.me/"
        rel="noopener noreferrer"
        target="_blank"
        className="link !underline text-[#3b3b3b]"
      >
        Abhishek Jha
      </Link>
    </p>
    <p>
      Developed by:{' '}
      <Link
        href="https://github.com/leeun22"
        rel="noopener noreferrer"
        target="_blank"
        className="link !underline text-[#3b3b3b]"
      >
        leeun
      </Link>
    </p>
  </>
)

const footer = (
  <p>
    All images belongs to{' '}
    <Link
      className="link !underline text-[#3b3b3b]"
      href="https://betruekind.com/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Truekind
    </Link>
    , and are used for showcasing purposes only.
  </p>
)

export const CreditsButton = ({ label }: { label: string }) => {
  const {
    isOpen: isCreditsOpen,
    openDialog: handleCreditsOpen,
    closeDialog: handleCreditsClose
  } = useDialogControlState()

  return (
    <>
      <button
        type="button"
        className="underline cursor-pointer"
        aria-label="Credits button"
        onClick={handleCreditsOpen}
      >
        {label}
      </button>

      <ModalDialog
        title="Disclaimer"
        isOpen={isCreditsOpen}
        onClose={handleCreditsClose}
        desChildren={description}
        footerChildren={footer}
      />
    </>
  )
}
