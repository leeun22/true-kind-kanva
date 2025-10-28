'use client'

import Link from 'next/link'

export function ShopNowButton() {
  return (
    <Link
      className="group relative flex flex-col justify-start pb-[2px] underline-offset-0 outline-none overflow-hidden"
      href={`/products`}
    >
      <p className="ButtonText font-figtree text-[1.5rem] font-normal leading-[100%] tracking-[-0.5px] text-white">
        Shop Now
      </p>
      <span className="absolute bottom-0 left-0 flex-none w-full h-[1px] bg-white group-hover:w-[20px] duration-500 transition-all"></span>
    </Link>
  )
}
