import { unstable_cache } from 'next/cache'
import { fetchAllProducts } from './productFetch'
import { Product, ProductCoreData } from '@/types/product'

/**
 * Internal function: Perform product search from data source (fetchAllProducts)
 * and handle caching according to handleURL.
 * Get detailed information of a product based on handleURL.
 * Each handleURL will have its own cache key.
 * If the user visits the same product again, Next.js will return the result immediately without having to re-execute the search logic.
 */
const findProductByHandle = unstable_cache(
  async (handleURL: string): Promise<Product> => {
    try {
      // Get all original data from Layer 1 cache (no API call again)
      const allProducts = await fetchAllProducts()

      if (allProducts.length === 0) {
        throw new Error('No product data found.')
      }

      // Find the first product
      const foundProduct = allProducts.find((prod) => prod.handleURL === handleURL)

      // Product not found, return null for parent component to handle 404
      if (!foundProduct) {
        throw new Error(`Product not found for handleURL: ${handleURL}.`)
      }

      // Duplicate Warning Logic
      const foundConflict = allProducts.filter((prod) => prod.handleURL === handleURL)
      if (foundConflict.length > 1) {
        console.group('[HANDLE CONFLICT WARNING]')
        console.warn(`Found ${foundConflict.length} products with the same handle: ${handleURL}.`)
        console.warn('-> Defaulting to the first product found.')
        console.groupEnd()
      }

      // DEBUG LOG GROUP
      // console.group('[PRODUCT DETAIL FETCH]')
      // console.log(`Handle is passed in (slug): ${foundProducts.handleURL}`)
      // console.log(`Handle comparison (route): ${handleURL}`)

      // if (foundConflict.length > 0) {
      //   console.log(`Number of products with duplicate handles: ${foundProducts.length}`)
      //   console.log('First product found:', foundProducts)
      // } else {
      //   console.warn(`No matching products found.`)
      // }
      // console.groupEnd()

      return foundProduct
    } catch (error) {
      // Error related to fetchAllProducts or unexpected logic error
      console.error('Logic Error in findProductByHandle:', error)
      throw error
    }
  },
  // Dynamic cache key
  ['product-details-by-handle'],
  {
    tags: ['product-details'] // Common tag for easy invalidation if needed
  }
)

/**
 * Public function 1: Export all product details.
 */
export const getProductByHandleURL = (handleURL: string): Promise<Product> => {
  // Return the entire Product object from the internal function
  return findProductByHandle(handleURL)
}

/**
 * Public function 2: Export ID and HandleURL (used to check 404).
 */
export const getProductCoreData = async (handleURL: string): Promise<ProductCoreData | null> => {
  const product = await findProductByHandle(handleURL)

  if (!product) {
    return null
  }

  const coreData: ProductCoreData = {
    id: product.id,
    handleURL: product.handleURL,
    category: product.category
  }

  return coreData
}

/**
 * Public function 3: Get all available product handle URLs.
 * This is primarily used by generateStaticParams in dynamic routes.
 */
export const getAllProductHandles = unstable_cache(
  async (): Promise<string[]> => {
    try {
      const allProducts = await fetchAllProducts()

      if (allProducts.length === 0) {
        console.warn('fetchAllProducts returned an empty array while getting handles.')
        return []
      }

      const handles = allProducts.map((prod) => prod.handleURL)

      return handles
    } catch (error) {
      console.error('Error fetching all product handles:', error)
      return []
    }
  },
  ['all-product-handles'],
  {
    tags: ['product-handles']
  }
)
