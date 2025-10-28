export interface Product {
  id: string
  name: string
  category: CategoryType
  type: ProductType
  ingredients: string[]
  capacities: ProductCapacity[]
  description: string
  images: ProductImage
  handleURL: string
}

export type CategoryType = 'Pure Brilliance' | 'Varnaya Blends' | 'Daily Dew' | 'Clear Difference' | 'C Luminance'

export type ProductType =
  | 'Serums'
  | 'Toners'
  | 'Cleansers'
  | 'Tonics'
  | 'Sleeping Mask'
  | 'Moisturisers'
  | 'Facial Oils'

export interface ProductCapacity {
  capacity: string
  price: number
}

export interface ProductImage {
  featureImage: string
  secondaryImage: string
}
