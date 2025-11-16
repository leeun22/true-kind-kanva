export type FilterKey = 'categories' | 'types' | 'ingredients' | 'capacities'

export interface FilterType {
  id: number
  name: string
  key: FilterKey
  options: string[]
}

export interface ProductQueryParams {
  categories: string[]
  types: string[]
  ingredients: string[]
  capacities: string[]
  limit?: number
}
