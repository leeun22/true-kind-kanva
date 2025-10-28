export default function ChevronIcon({ className, style }: { className: string; style: React.CSSProperties }) {
  return (
    <svg
      className={`icon-chevron ${className}`}
      style={style}
      width={7}
      height={13}
      viewBox="0 0 7 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.00006 11.8677L6.24512 6.62262L1.00006 1.37756"
        stroke="#414141"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
