import { CategoryType, Product } from './product'

export interface ExploreType {
  id: number
  title: string
  subtitle: string
  description: string
  banner: string
  category: CategoryType
  link: string
}

// Define data type for Explore Container after fetch
export type ExploreCategoryType = ExploreType & {
  products: Product[]
}
