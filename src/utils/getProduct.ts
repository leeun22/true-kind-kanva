import { Product } from '@/types/product'
import { unstable_cache } from 'next/cache'

interface ProductQueryParams {
  search?: string
  select?: number
}

const BASE_URL = process.env.API_URL

export async function getProduct(): Promise<Product[]> {
  const res = await fetch(`${process.env.API_URL}/products/`)
  const products = await res.json()

  return products
}

export async function fetchProductParams({ search, select }: ProductQueryParams): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products/?id=${search}&offset=0&limit=${select}`)
  const products = await res.json()

  return products
}

export const getProductParams = unstable_cache(
  async (params: ProductQueryParams): Promise<Product[]> => {
    const res = await fetch(
      `https://api.escuelajs.co/api/v1/products/?title=${params.search}&offset=0&limit=${params.select}`
    )
    const data = await res.json()

    return data
  },
  ['products'],
  { tags: ['products'] }
)

export async function getProductByHandle(handle: string) {
  const res = await fetch(`${process.env.API_URL}?handle=${handle}`)
  const products = await res.json()
  return products[0]
}

export async function getProductByCategory(category: string) {
  const res = await fetch(`${process.env.API_URL}?category=${encodeURIComponent(category)}`)
  const products = await res.json()
  return products
}

export async function getAllCategories() {
  const res = await fetch(`${process.env.API_URL}/products/categories`)
  const categories = await res.json()
  return categories
}
