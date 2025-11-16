/**
 * This component is responsible for displaying static elements
 * It has high priority after data returns
 */

import Link from 'next/link'
import { Product } from '@/types/product'
import ProductTitle from './ProductTitle'

interface ProductInfoStaticRSCProps {
  productPromise: Promise<Product>
}

export default async function ProductInfoStaticRSC({ productPromise }: ProductInfoStaticRSCProps) {
  const product: Product = await productPromise

  return (
    <>
      <Link
        href={`/collections`}
        className="p-detail__detail-category inline-block font-figtree text-[1rem] text-[#3b3b3b] leading-[1] uppercase p-[8px_25px_5px] border-[1px] border-solid border-[#3b3b3b] rounded-[62px]"
      >
        {product.category}
      </Link>

      <ProductTitle productTitle={product.name} />

      <p className="p-detail__detail-desc block font-figtree text-[1.3rem] text-[#787878] leading-[1.2] mt-[26px]">
        {product.description}
      </p>
    </>
  )
}
