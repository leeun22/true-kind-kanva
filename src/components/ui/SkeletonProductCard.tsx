import React from 'react'

interface SkeletonLoaderProps {
  count?: number
}

const SkeletonProductCard = ({ count }: SkeletonLoaderProps) => {
  const itemCount = count ?? 4

  const items = Array.from({ length: itemCount })

  return (
    <div className="block w-full">
      <div className="flex flex-wrap w-full gap-[20px]">
        {items.map((_, index) => (
          <div
            key={index}
            className="bg-gray-300 flex-1 basis-[320px] w-full max-w-[345px] h-[430px] rounded-[14px] animate-pulse duration-75"
          />
        ))}
      </div>
    </div>
  )
}

export default React.memo(SkeletonProductCard)
