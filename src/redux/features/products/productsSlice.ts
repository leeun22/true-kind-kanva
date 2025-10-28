import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { Product } from '@/types/product'
import { api } from '@/services/api'

interface ProductsState {
  items: Product[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  selectedProduct: Product | null
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
  selectedProduct: null
}

// Async thunks
export const fetchProducts = createAsyncThunk<Product[], void>('products/fetchProducts', async () => {
  const response = await api.getProducts()
  return response.data
})

export const fetchProductById = createAsyncThunk<Product, string>('products/fetchProductById', async (id: string) => {
  const response = await api.getProductById(id)
  return response.data
})

export const fetchProductsByFilter = createAsyncThunk<
  Product[],
  {
    categories?: string[]
    types?: string[]
    ingredients?: string[]
    sizes?: string[]
  }
>('products/fetchProductsByFilter', async (filters) => {
  const response = await api.getFilteredProducts(filters)
  return response.data
})

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload
      state.status = 'succeeded'
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || null
      })

      // Fetch product by id
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload
      })

      // Fetch filtered products
      .addCase(fetchProductsByFilter.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProductsByFilter.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchProductsByFilter.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || null
      })
  }
})

export const { setProducts, setSelectedProduct, clearSelectedProduct } = productsSlice.actions
export default productsSlice.reducer
