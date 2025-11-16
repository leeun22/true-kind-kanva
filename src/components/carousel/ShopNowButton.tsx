'use client'

import Link from 'next/link'
import { memo } from 'react'

const ShopNowButton = () => {
  return (
    <Link
      className="group relative flex flex-col justify-start pb-[2px] underline-offset-0 outline-none overflow-hidden"
      aria-label="Shop Now"
      href={`/collections`}
    >
      <p className="ButtonText font-figtree text-[1.5rem] font-normal leading-[100%] tracking-[-0.5px] text-white">
        Shop Now
      </p>
      <span className="absolute bottom-0 left-0 flex-none w-full h-[1px] bg-white group-hover:w-[20px] duration-500 transition-all"></span>
    </Link>
  )
}
export default memo(ShopNowButton)
