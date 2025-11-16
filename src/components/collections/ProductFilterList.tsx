import ProductCard from '../products/ProductCard'
import { Product } from '@/types/product'
import { categoryStyles } from '@/constants/categoryStyles'

interface ProductFilterListProps {
  productParamsPromise: Promise<Product[]>
}

export default async function ProductFilterList({ productParamsPromise }: ProductFilterListProps) {
  const products: Product[] = await productParamsPromise

  if (products.length === 0) {
    return (
      <div className="block w-full p-[50px_25px] m-auto text-center">
        <p className="inline-block font-figtree text-[1.5rem] text-[#787878]">
          No products match your selected filters. Try adjusting your filter criteria.
        </p>
      </div>
    )
  }

  return (
    <div className="grid__list w-full grid gap-[12px] min-[426px]:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          backgroundColor={categoryStyles[product.category] || 'rgb(241, 204, 207)'}
        />
      ))}
    </div>
  )
}
