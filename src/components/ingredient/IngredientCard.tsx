'use client'

import Image from 'next/image'
import styles from './ingredient.module.css'

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
      className={`${styles.ingredientsItem} w-full xl:max-w-[256px] min-[1025px]:max-w-[200px] md:max-w-[175px] max-w-full md:bg-[#f5f5f5] md:rounded-[14px] xl:p-[51px_32px_38px] md:p-[34px_21px_25px] min-[550px]:px-[20px]  text-center ${pos?.mr} ${pos?.mt}`}
    >
      <div className="ingredients__item-icon flex items-center justify-center md:bg-white bg-[#f5f5f5] rounded-full xl:w-[80px] xl:h-[80px] xl:p-[12px] md:w-[58px] md:h-[58px] max-md:w-[78px] max-md:h-[78px] p-[8px] m-auto">
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

      <h3 className="ingredients__item-title font-figtree md:text-fluid4lg text-[1.6rem] font-[600] leading-[1.1] tracking-[0] text-center md:max-w-[60%] max-w-[72%] xl:my-[25px] my-[16px] mx-auto">
        {title}
      </h3>

      <p className="ingredients__item-desc font-figtree md:text-fluid3lg text-[1.4rem] max-[550px]:hidden text-center">
        {description}
      </p>
    </div>
  )
}
