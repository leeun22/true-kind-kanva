'use client'

import React from 'react'
import DaysReturn from '@/assets/days-return'
import FreeShipping from '@/assets/free-shipping'
import VeganCrueltyFree from '@/assets/vegan-cruelty-free'
import KindToPlanetPackaging from '@/assets/kind-planet'

interface ProductDetailBenefitsProps {
  icon: React.ReactNode
  text: string
}

export default function ProductDetailBenefits() {
  const benefits: ProductDetailBenefitsProps[] = [
    {
      icon: <DaysReturn className="max-w-[26px] w-auto h-[26px] min-w-[12px] min-h-[12px]" />,
      text: '30 Days Return'
    },
    {
      icon: <FreeShipping className="max-w-[26px] w-auto h-[26px] min-w-[12px] min-h-[12px]" />,
      text: 'Free Shipping'
    },
    {
      icon: <VeganCrueltyFree className="max-w-[26px] w-auto h-[26px] min-w-[12px] min-h-[12px]" />,
      text: 'Vegan & Cruelty Free'
    },
    {
      icon: <KindToPlanetPackaging className="max-w-[26px] w-auto h-[26px] min-w-[12px] min-h-[12px]" />,
      text: 'Kind to planet Packaging'
    }
  ]

  return (
    <div className="p-detail__benefits grid grid-cols-4 max-[385px]:grid-cols-2 justify-between gap-y-[24px] gap-x-[2px] mt-[38px]">
      {benefits.map((benefit, index) => (
        <div key={index} className="icon-wrapper flex flex-col gap-[16px]">
          <div className="benefit-icon-icon flex flex-row items-center justify-center rounded-full w-[45px] h-[45px] m-auto bg-[#fff] shadow-xs">
            {benefit.icon}
          </div>

          <p
            className={`benefit-icon-text block font-figtree text-[1.3rem] font-[400] text-[#3b3b3b] leading-[1.2] text-center m-auto w-full ${index === 1 ? 'max-w-[80px]' : 'max-w-[82px]'}`}
          >
            {benefit.text}
          </p>
        </div>
      ))}
    </div>
  )
}
