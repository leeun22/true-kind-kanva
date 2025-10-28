import type { CategoryType, ProductType } from '@/types/product'

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

export const INGREDIENTS = ['AHA/BHA', 'Hyaluronic Acid', 'Niacinamide', 'Vitamin C', 'Pentavitin', 'Azelaic Acid']

export const CAPACITIES = ['50ml', '100ml', '150ml', '250ml']

export const filters = [
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
    name: 'Capacities',
    key: 'capacities' as const,
    options: CAPACITIES
  }
]
