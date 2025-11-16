import React from 'react'

const CloseIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" style={style}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

export default React.memo(CloseIcon)
