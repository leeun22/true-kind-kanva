import type { Metadata } from 'next'
import ProductDetails from '@/components/products/ProductDetailt'
import ProductZeroToxics from '@/components/products/ProductZeroToxics'
import FeaturedProduct from '@/components/featured/FeaturedProduct'
import Divider from '@/components/ui/Divider'
import { notFound } from 'next/navigation'
import { getAllProductHandles, getProductByHandleURL, getProductCoreData } from '@/lib/data/productByHandle'

export async function generateMetadata({ params }: { params: Promise<{ productHandle: string }> }): Promise<Metadata> {
  const { productHandle } = await params
  const product = await getProductByHandleURL(productHandle)
  if (!product) {
    return {}
  }

  return {
    title: product.name,
    description: product.description,
    alternates: {
      canonical: `/products/${productHandle}`
    } // Main product url: Avoid duplicate content.
  }
}

export async function generateStaticParams() {
  const productHandles = await getAllProductHandles()

  return productHandles.map((handle) => ({
    productHandle: handle
  }))
}

export default async function Product({ params }: { params: Promise<{ productHandle: string }> }) {
  // Get handle URL from URL parameters
  const { productHandle } = await params

  // Fetch core data like id, name from the real handle that was awaited to check for 404
  const coreData = await getProductCoreData(productHandle)

  //Principle: Checking for data existence must be done at the top parent component where the data is fetched. Stop rendering and display 404
  if (!coreData) {
    notFound()
  }

  return (
    <section id="product-detail" className="block mb-[100px]">
      <ProductDetails productHandle={productHandle} productCategory={coreData.category} />

      <ProductZeroToxics />

      <Divider className="mx-auto" />

      <FeaturedProduct />
    </section>
  )
}
