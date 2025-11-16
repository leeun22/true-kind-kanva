export const ProductInfoStaticSkeleton = () => (
  <div className="static-skeleton-only">
    {/* Đảm bảo chiều cao CỐ ĐỊNH để tránh Layout Shift */}
    <div className="h-[250px] w-full animate-pulse duration-75 flex flex-col justify-between">
      <div className="static-skeleton">
        <div className="h-4 w-1/4 bg-gray-300 rounded mb-4"></div> {/* Category */}
        <div className="h-8 w-3/4 bg-gray-300 rounded mb-6"></div> {/* Product Title */}
        <div className="h-6 w-full bg-gray-200 rounded mb-3"></div> {/* Description Line 1 */}
        <div className="h-6 w-11/12 bg-gray-200 rounded mb-8"></div> {/* Description Line 2 */}
      </div>
    </div>
  </div>
)

export const ProductInfoInteractiveSkeleton = () => (
  <div className="interactive-skeleton-only">
    {/* Đảm bảo chiều cao CỐ ĐỊNH (ví dụ: tổng chiều cao của Price + Picker + Button) */}
    <div className="h-[283,28px] w-full animate-pulse duration-75">
      <div className="h-[24px] w-1/3 bg-gray-300 rounded-[4px] mt-[38px]"></div> {/* Price */}
      <div className="h-[60.28px] w-1/2 bg-gray-300 rounded-[4px] my-[38px]"></div> {/* Variant Picker */}
      <div className="h-[23px] w-1/4 bg-gray-300 rounded-[4px] my-[38px]"></div> {/* Quantity Selector */}
      <div className="h-[62px] w-full bg-gray-400 rounded-[4px]"></div> {/* Add To Cart Button */}
    </div>
  </div>
)

export const ProductInfoImageSkeleton = () => (
  <div className="image-skeleton-only">
    {/* Đảm bảo chiều cao CỐ ĐỊNH để tránh Layout Shift */}
    <div className="h-[250px] w-full animate-pulse duration-75 flex flex-col justify-between"></div>
  </div>
)
