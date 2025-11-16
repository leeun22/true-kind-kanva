import { FilterType } from '@/types/filter'
import type { CategoryType, IngredientType, ProductType } from '@/types/product'

export const CATEGORIES: CategoryType[] = [
  'Pure Brilliance',
  'Varnaya Blends',
  'Daily Dew',
  'Clear Difference',
  'C Luminance'
]

export const PRODUCT_TYPES: ProductType[] = [
  'Serums',
  'Toners',
  'Cleansers',
  'Tonics',
  'Sleeping Mask',
  'Moisturisers',
  'Facial Oils'
]

export const INGREDIENTS: IngredientType[] = [
  'AHAs',
  'Hyaluronic Acid',
  'Niacinamide',
  'Vitamin C',
  'Azelaic Acid',
  'BHAs',
  'CICA',
  'Pentavitin',
  'Rosehip',
  'Phyto Retinol',
  'Squalane'
]

export const CAPACITIES = ['30ml', '50ml', '100ml', '150ml', '15g', '50g']

export const filters: FilterType[] = [
  {
    id: 1,
    name: 'Category',
    key: 'categories' as const,
    options: CATEGORIES
  },
  {
    id: 2,
    name: 'Type',
    key: 'types' as const,
    options: PRODUCT_TYPES
  },
  {
    id: 3,
    name: 'Ingredients',
    key: 'ingredients' as const,
    options: INGREDIENTS
  },
  {
    id: 4,
    name: 'Capacity',
    key: 'capacities' as const,
    options: CAPACITIES
  }
]
