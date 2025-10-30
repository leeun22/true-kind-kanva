import type { SearchParams } from 'nuqs/server'
import { revalidateTag } from 'next/cache'
import { Suspense } from 'react'
import { loadSearchParams } from '../search-params'
import HeroBanner from '@/components/collections/HeroBanner'
import ProductFilter from '@/components/collections/ProductFilter'
import ToggleFilterMobile from '@/components/collections/ToggleFilterMobile'
import Header from '@/components/header'
import ProductCard from '@/components/ProductCard'
import { Skeleton } from '@/components/ui/Skeleton'
import { categoryStyles } from '@/constants/categoryStyles'
import { filters } from '@/constants/filters'
import { getProductsByParams } from '@/lib/data/productFilter'

type ProductPageProps = {
  searchParams: Promise<SearchParams>
}

export default async function FilterProductPage({ searchParams }: ProductPageProps) {
  const { categories, types, ingredients, capacities, limit } = await loadSearchParams(searchParams)

  // Use all params to create Key cache and Fetch
  const products = await getProductsByParams({
    categories,
    types,
    ingredients,
    capacities,
    limit // Assume limit of 100 products in loadSearchParams
  })

  // Server Action function to revalidate
  async function refetchProducts() {
    'use server'

    revalidateTag('filtered-products')
  }

  return (
    <>
      <Header />

      <main>
        <HeroBanner />

        <section id="collections-products" className="block my-[100px]">
          <div className="container relative m-auto max-w-[1440px] w-full px-[calc(18px*.5)]">
            <ToggleFilterMobile />

            <div className="row relative flex flex-wrap gap-x-[9%] gap-y-[0px]">
              {/* <ProductSearch refetchProducts={refetchProducts} /> */}

              <ProductFilter refetchProducts={refetchProducts} filters={filters} />

              <div
                id="product-list"
                className="col block w-[75%] max-w-full basis-auto px-[calc(18px*.5)]"
                style={{ opacity: 1, display: 'block' }}
              >
                <h2 className="grid__title font-sentient text-[5rem] text-[#3b3b3b] font-[400] leading-[1.1] tracking-[-4px] mb-[20px]">
                  Collections
                </h2>

                <div className="grid__list grid gap-[12px] grid-cols-3">
                  <Suspense fallback={<Skeleton />}>
                    {products.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        backgroundColor={categoryStyles[product.category] || 'rgb(241, 204, 207)'}
                      />
                    ))}
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
