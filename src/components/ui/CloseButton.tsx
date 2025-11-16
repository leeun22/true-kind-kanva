import CloseIcon from '@/assets/close-icon'
import React from 'react'

interface CloseButtonProps {
  className?: string
  iconWidth: number
  iconHeight: number
  onClose: () => void
}

const CloseButton = ({ className, iconWidth, iconHeight, onClose }: CloseButtonProps) => {
  return (
    <button
      className={`text-[#3b3b3b] hover:rotate-180 transition-transform duration-500 cursor-pointer ${className}`}
      aria-label="Close button"
      onClick={onClose}
    >
      <CloseIcon style={{ width: iconWidth, height: iconHeight }} />
    </button>
  )
}

export default React.memo(CloseButton)
