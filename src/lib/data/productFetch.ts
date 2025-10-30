import { unstable_cache } from 'next/cache'
import { Product } from '@/types/product'

const BASE_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/products`

/** Layer 1 cache function: This function ensures that the API is only called once to get the entire original data. Dữ liệu gốc chỉ được fetch từ API một lần, sau đó được lưu trong cache. */
export const fetchAllProducts = unstable_cache(
  async (): Promise<Product[]> => {
    try {
      const res = await fetch(BASE_API_URL, {
        cache: 'force-cache'
      })

      if (!res.ok) {
        // throw new Error("Failed to fetch base products data");
        console.error(`API Error: Failed to fetch base products data. Status: ${res.status}`)
        return []
      }

      const products = await res.json()

      return products as Product[]
    } catch (error) {
      console.error('Network Error when fetching base products:', error)
      return []
    }
  },
  // Fixed key for original data
  ['all-products-base'],
  // Options
  { tags: ['base-products'] }
)
