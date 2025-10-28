export type FilterKey = 'categories' | 'types' | 'ingredients' | 'capacities'

export interface ProductQueryParams {
  categories: string[]
  types: string[]
  ingredients: string[]
  capacities: string[]
  limit?: number
}
