/**
 * Randomly get featured products from different random Categories.
 * Results will be cached, only invalidate when there is an event that changes the original data.
 */

import { unstable_cache } from 'next/cache'
import { fetchAllProducts } from './productFetch'
import { Product, CategoryType } from '@/types/product'

const getFeaturedProductsFromCache = unstable_cache(
  async (): Promise<Product[]> => {
    try {
      // Get all original data from Layer 1 cache
      const allProducts = await fetchAllProducts()

      if (allProducts.length === 0) {
        return []
      }

      // Filter all featured products from productType props of products
      const featuredProducts = allProducts.filter((prod) => prod.productType === 'featured')

      if (featuredProducts.length === 0) {
        console.warn(`No featured products found.`)
        return []
      }

      // Group featured products by Category
      const productsByCategory = featuredProducts.reduce(
        (acc, product) => {
          const categoryKey = product.category
          if (!acc[categoryKey]) {
            acc[categoryKey] = []
          }
          acc[categoryKey].push(product)
          return acc
        },
        {} as Record<CategoryType, Product[]>
      )

      // Randomly select 4 Category keys
      const availableCategories = Object.keys(productsByCategory) as CategoryType[]

      // Limit the number of categories
      const randomCategories = availableCategories
        .sort(() => 0.5 - Math.random()) // Random mix
        .slice(0, 4) // Get the first 4 categories

      // Get 1 random product from each selected Category
      const finalFeaturedProducts: Product[] = []

      for (const category of randomCategories) {
        const productsInThisCategory = productsByCategory[category]
        if (productsInThisCategory && productsInThisCategory.length > 0) {
          // Randomly select 1 product from the featured list of that Category
          const randomIndex = Math.floor(Math.random() * productsInThisCategory.length)
          finalFeaturedProducts.push(productsInThisCategory[randomIndex])
        }
      }

      // Ensure the result is always 4 (if possible) or less
      return finalFeaturedProducts
    } catch (error) {
      console.error('Logic Error in getFeaturedProductsByRandomCategory:', error)
      return []
    }
  },
  // Static cache key: only invalidate when 'featured-products' tag is called revalidateTag
  ['featured-products-random'],
  {
    tags: ['featured-products'] // Separate tags for Featured Products
  }
)

/**
 * Wrapper function: Public exported function.
 */
export const getFeaturedProducts = () => {
  return getFeaturedProductsFromCache()
}
