import React from 'react'

const MinusIcon = ({ className }: { className?: string }) => {
  return (
    <svg className={className} width={9} height={2} viewBox="0 0 9 2" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.69749 0.327877V1.74654H5.31882H3.90015H0.521484V0.327877H3.90015L5.31882 0.327637L8.69749 0.327877Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default React.memo(MinusIcon)
