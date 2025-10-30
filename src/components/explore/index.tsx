/**
 * This is an async component, which will suspend rendering
 */

import ExploreContainer from './ExploreContainer'
import { initialExplore } from '@/constants/initialExplore'
import { getProductsByCategory } from '@/lib/data/productFilter'
import { ExploreCategoryType, ExploreType } from '@/types/explore'

async function Explore() {
  // Create an array of Promises to fetch data in parallel
  const productByCategoryPromises = initialExplore.map(async (exploreItem: ExploreType) => {
    // Call the async function to get the product corresponding to the Category
    const products = await getProductsByCategory(exploreItem.category, 4)

    // Combine ExploreType information and product list
    return {
      ...exploreItem,
      products
    } as ExploreCategoryType
  })

  // Only this component has to wait for data (wait for all Promises to complete)
  const exploreData: ExploreCategoryType[] = await Promise.all(productByCategoryPromises)

  // Pass resolved data down to Client Component
  return <ExploreContainer exploreData={exploreData} />
}

export default Explore
