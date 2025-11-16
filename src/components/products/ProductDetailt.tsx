import { getProductByHandleURL } from '@/lib/data/productByHandle'
import ProductInformation from './ProductInformation'
import ProductImageGallery from './ProductImageGallery'
import { categoryStyles } from '@/constants/categoryStyles'
import type { CategoryType, Product } from '@/types/product'

interface ProductDetailProps {
  productHandle: string
  productCategory: CategoryType
}

export default async function ProductDetail({ productHandle, productCategory }: ProductDetailProps) {
  // Get Promise of type (Promise<Product>)
  const productPromise: Promise<Product> = getProductByHandleURL(productHandle)

  return (
    <div
      className="product-detail__container flex md:flex-row flex-col"
      style={{ background: categoryStyles[productCategory] || 'rgb(241, 204, 207)' }}
    >
      {/* <Suspense fallback={<ProductInfoImageSkeleton />}> */}
      <ProductImageGallery productPromise={productPromise} />
      {/* </Suspense> */}

      {/* Coordinates nested Suspense. Component manages its own load boundaries */}
      <ProductInformation productPromise={productPromise} />
    </div>
  )
}
