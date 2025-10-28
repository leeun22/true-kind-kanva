'use client'

import Image from 'next/image'

interface IngredientCardProps {
  icon: string
  title: string
  description: string
  pos?: {
    mt: string
    mr: string
  }
  disableTransform?: boolean
}

export default function IngredientCard({ icon, title, description, pos }: IngredientCardProps) {
  return (
    <div
      className={`ingredients__item w-full max-w-[256px] bg-[#f5f5f5] rounded-[14px] pt-[51px] pb-[38px] px-[32px] text-center ${pos?.mr} ${pos?.mt}`}
    >
      <div className="ingredients__item-icon flex items-center justify-center bg-white rounded-full w-[80px] h-[80px] p-[12px] m-auto">
        <div className="media-img relative w-full">
          <Image
            className="w-full h-full min-h-[38px] max-h-[51px] object-cover"
            src={icon}
            alt="Ingredient Icon"
            decoding="async"
            draggable="false"
            width="46"
            height="46"
          />
        </div>
      </div>

      <h3 className="ingredients__item-title font-figtree text-[1.53rem] font-[600] leading-[1.1] tracking-[0] text-center max-w-[60%] my-[25px] mx-auto">
        {title}
      </h3>

      <p className="ingredients__item-desc font-figtree text-[1.28rem] font-[400] text-center">{description}</p>
    </div>
  )
}
