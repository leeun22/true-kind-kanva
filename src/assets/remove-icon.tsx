import React from 'react'

const RemoveIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.33301 7.33301V10.6663M2.66634 3.99967H13.333L12.2797 13.4797C12.2436 13.8059 12.0884 14.1074 11.8438 14.3263C11.5993 14.5453 11.2826 14.6664 10.9543 14.6663H5.04501C4.71676 14.6664 4.40005 14.5453 4.15551 14.3263C3.91096 14.1074 3.75578 13.8059 3.71967 13.4797L2.66634 3.99967ZM4.89634 2.09767C5.00418 1.86899 5.17481 1.67567 5.38834 1.54028C5.60188 1.40489 5.8495 1.333 6.10234 1.33301H9.89701C10.15 1.33288 10.3977 1.40471 10.6114 1.5401C10.8251 1.6755 10.9958 1.86888 11.1037 2.09767L11.9997 3.99967H3.99967L4.89634 2.09767V2.09767ZM1.33301 3.99967H14.6663H1.33301ZM6.66634 7.33301V10.6663V7.33301Z"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default React.memo(RemoveIcon)
