/**
 * Get all products, apply in-memory filtering logic, and cache the filtering results.
 * Filter parameters are sorted before being passed to the function.
 * @param categoriesSorted - The categories are sorted.
 * @param typesSorted - The types string has been sorted.
 * @param ingredientsSorted - The ingredients string has been sorted.
 * @param capacitiesSorted - The capacities have been arranged.
 * @param limit - Limit the results.
 */

import { unstable_cache } from 'next/cache'
import { Product } from '@/types/product'
import { ProductQueryParams } from '@/types/filter'

const BASE_API_URL = `${process.env.API_URL}/products`

/** Layer 1 cache function: This function ensures that the API is only called once to get the entire original data. */
const fetchAllProducts = unstable_cache(
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

/** Layer 2 cache function: This function handles filtering logic and caches filter results based on input parameters */
const getProductsFiltered = unstable_cache(
  async (
    categoriesSorted: string,
    typesSorted: string,
    ingredientsSorted: string,
    capacitiesSorted: string,
    limit?: number
  ): Promise<Product[]> => {
    try {
      // Get all data from Layer 1 cache (don't call api again)
      const allProducts = await fetchAllProducts()

      if (allProducts.length === 0) {
        return []
      }

      // Convert string (key cache) to array for filtering
      const params = {
        categories: categoriesSorted ? categoriesSorted.split(',') : [],
        types: typesSorted ? typesSorted.split(',') : [],
        ingredients: ingredientsSorted ? ingredientsSorted.split(',') : [],
        capacities: capacitiesSorted ? capacitiesSorted.split(',') : [],
        limit
      }

      /**
       * Use Fail-Fast filter logic as soon as an unsatisfied condition is detected, the code will not waste time checking other filter conditions.
       * Check if any filter type has been selected -> Check if the current product belongs to that filter -> If no condition is satisfied, return false, if yes, return true.
       * */
      const filteredProducts = allProducts.filter((prod) => {
        if (!prod) return false

        // Categories (AND): Must belong to ALL selected categories (logical AND)
        if (params.categories.length > 0 && !params.categories.includes(prod.category)) {
          return false
        }

        // Ingredients (OR): Must contain AT LEAST ONE of the selected elements (logical OR)
        if (params.ingredients.length > 0 && !prod.ingredients.some((ing) => params.ingredients.includes(ing))) {
          return false
        }

        // Types (AND)
        if (params.types.length > 0 && !params.types.includes(prod.type)) {
          return false
        }

        // Capacities (OR)
        if (params.capacities.length > 0 && !prod.capacities.some((s) => params.capacities.includes(s.capacity))) {
          return false
        }

        return true
      })

      // Handle the limit of returned results
      return filteredProducts.slice(0, params.limit)
    } catch (error) {
      // Handle logical errors (e.g. errors in .filter, data in incorrect format)
      console.error('Logic Error during product filtering:', error)
      return []
    }
  },

  // Argument 2: DYNAMIC CACHE KEYS (Based on the function's input parameter). These values ​​are hashed to create a unique cache key.
  ['products-filter-group'],

  // Argument 3: OPTIONS (Contains only tags and revalidate)
  {
    tags: ['filtered-products']
  }
)

/**
 * Wrapper function to call getProductsFiltered directly.
 * Handles sorting and concatenation for cache keys.
 * Get products based on filter parameter object.
 * Sort parameter arrays to ensure consistent cache keys.
 * Normalize/Order input data to ensure consistent cache keys (e.g. "a,b" instead of "b,a")
 * */
export const getProductsByParams = (params: ProductQueryParams) => {
  const categoriesSorted = params.categories.sort().join(',')
  const typesSorted = params.types.sort().join(',')
  const ingredientsSorted = params.ingredients.sort().join(',')
  const capacitiesSorted = params.capacities.sort().join(',')

  // Call the cached function with normalized values
  return getProductsFiltered(categoriesSorted, typesSorted, ingredientsSorted, capacitiesSorted, params.limit)
}

/**
 * Get products by a specific category
 * */
export function getProductsByCategory(categoryName: string, limit?: number): Promise<Product[]> {
  // Prepare parameters with only that category
  const params: ProductQueryParams = {
    categories: [categoryName],
    ingredients: [],
    types: [],
    capacities: [],
    limit: limit
  }

  // Call the cached fetch/filter function
  return getProductsByParams(params)
}
