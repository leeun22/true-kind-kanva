import React from 'react'

const PlusIcon = ({ className }: { className?: string }) => {
  return (
    <svg className={className} width={9} height={10} viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.69749 4.32789V5.74655H5.31882V9.12522H3.90015V5.74655H0.521484V4.32789H3.90015V0.949219H5.31882V4.32789H8.69749Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default React.memo(PlusIcon)
