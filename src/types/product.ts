export interface Product {
  id: string
  name: string
  category: CategoryType
  type: ProductType
  ingredients: IngredientType[]
  variants: ProductVariant[]
  description: string
  images: ProductImage
  handleURL: string
  productType?: string
}

export type ProductCoreData = Pick<Product, 'id' | 'handleURL' | 'category'> | null

export type CategoryType = 'Pure Brilliance' | 'Varnaya Blends' | 'Daily Dew' | 'Clear Difference' | 'C Luminance'

export type ProductType =
  | 'Serums'
  | 'Toners'
  | 'Cleansers'
  | 'Tonics'
  | 'Sleeping Mask'
  | 'Moisturisers'
  | 'Facial Oils'

export type IngredientType =
  | 'AHAs'
  | 'Hyaluronic Acid'
  | 'Niacinamide'
  | 'Vitamin C'
  | 'Azelaic Acid'
  | 'BHAs'
  | 'CICA'
  | 'Pentavitin'
  | 'Rosehip'
  | 'Phyto Retinol'
  | 'Squalane'

export interface ProductVariant {
  id: number // Internal ID
  capacity: string
  price: number
}

export interface ProductImage {
  featureImage: string
  secondaryImage: string
}
