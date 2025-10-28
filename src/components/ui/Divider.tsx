'use client'

export default function Divider({ className, borderColor }: { className?: string; borderColor?: string }) {
  return (
    <div className={`divider block w-full max-w-[1400px] m-auto ${className}`}>
      <div className="divider__line block w-full border-b border-[#d8d8d8]" style={{ borderColor: borderColor }} />
    </div>
  )
}
