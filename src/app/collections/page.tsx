import type { SearchParams } from 'nuqs/server'
import { revalidateTag } from 'next/cache'
import { Suspense } from 'react'
import { loadSearchParams } from '../search-params'
import SidebarFilter from '@/components/collections/SidebarFilter'
import { getProductsByParams } from '@/lib/data/productFilter'
import SkeletonProductCard from '@/components/ui/SkeletonProductCard'
import ProductFilterList from '@/components/collections/ProductFilterList'

type ProductPageProps = {
  searchParams: Promise<SearchParams>
}

export default async function FilterProductPage({ searchParams }: ProductPageProps) {
  const { categories, types, ingredients, capacities, limit } = await loadSearchParams(searchParams)

  // Use all params to create Key cache and Fetch
  const productParamsPromise = getProductsByParams({
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
    <section id="collections__filters" className="block sm:my-[100px] my-[50px]">
      <div className="collection__filters-container relative max-w-container">
        {/* <ToggleFilterMobile /> */}

        <div className="collection__filters-row relative max-w-[1400px] flex sm:flex-row flex-col gap-x-[calc(18%*.5)] gap-y-[20px]">
          <div className="collection__filters-col sm:relative max-w-full shrink-0 basis-[140px] lg:basis-[16%]">
            <SidebarFilter refetchProducts={refetchProducts} />
          </div>

          <div
            id="product-list"
            className="collection__filters-col block w-auto max-w-full flex-1 basis-auto"
            style={{ opacity: 1, display: 'block' }}
          >
            {/* <SearchInput refetchProducts={refetchProducts} /> */}

            <h2 className="grid__title font-sentient text-fluid5xl leading-[1.1] mb-[20px]">Collections</h2>

            <Suspense fallback={<SkeletonProductCard count={3} />}>
              <ProductFilterList productParamsPromise={productParamsPromise} />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  )
}
