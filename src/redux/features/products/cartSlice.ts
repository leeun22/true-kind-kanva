import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product, ProductVariant } from '@/types/product'
import { encodeId } from '@/utils/hash-utils'
import type { RootState } from '@/redux/store'

export interface CartItem {
  cartId: string // ID of the Cart
  productId: string // Product ID
  productName: string
  productImage: string
  productHandleURL: string
  variantId: number // Internal ID of Variant
  variantHashId: string // Variant ID Hash
  variantName: string
  price: number
  quantity: number
  cartItemId: string // Unique ID: productId-variantHashId
}

export interface CartState {
  items: CartItem[]
  subtotal: number
  itemCount: number
  isCartOpen: boolean
  isHydrated: boolean
}

// Function to recalculate total cart
const calculateTotals = (items: CartItem[]) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  return { subtotal, itemCount }
}

// Default initial state, always empty (for SSR)
const initialState: CartState = {
  items: [],
  subtotal: 0,
  itemCount: 0,
  isCartOpen: false,
  isHydrated: false
}

// Cart Slice
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Reducer hydrate state from localStorage
    hydrateCart: (state, action: PayloadAction<CartState | undefined>) => {
      if (action.payload) {
        state.items = action.payload.items
        state.subtotal = action.payload.subtotal
        state.itemCount = action.payload.itemCount
        state.isCartOpen = false // Always close when hydrate
      }
      state.isHydrated = true
    },

    // Add product to cart
    addItem: (state, action: PayloadAction<{ product: Product; variant: ProductVariant; quantity: number }>) => {
      const { product, variant, quantity } = action.payload
      const variantHashId = encodeId(variant.id)
      const cartItemId = `${product.id}-${variantHashId}`

      // Use Immer (Redux Toolkit) to modify state.items directly by finding itemIndex.
      const existingItemIndex = state.items.findIndex((item) => item.cartItemId === cartItemId)

      if (existingItemIndex !== -1) {
        // Update the number of existing items
        state.items[existingItemIndex].quantity += quantity
      } else {
        // Add new item
        const newItem: CartItem = {
          cartId: `local-cart`,
          productId: product.id,
          productName: product.name,
          productImage: product.images.featureImage,
          productHandleURL: product.handleURL,
          variantId: variant.id,
          variantHashId: variantHashId,
          variantName: variant.capacity,
          price: variant.price,
          quantity: quantity,
          cartItemId: cartItemId
        }
        state.items.push(newItem)
      }

      // Apply calculations to state
      Object.assign(state, calculateTotals(state.items))
    },

    // Update quantity
    updateQuantity: (state, action: PayloadAction<{ cartItemId: string; quantity: number }>) => {
      const { cartItemId, quantity } = action.payload
      const itemIndex = state.items.findIndex((item) => item.cartItemId === cartItemId)

      if (quantity < 1) {
        // Remove from cart
        state.items = state.items.filter((item) => item.cartItemId !== cartItemId)
      } else if (itemIndex !== -1) {
        // Update quantity
        state.items[itemIndex].quantity = quantity
      }

      Object.assign(state, calculateTotals(state.items))
    },

    // Delete item from cart
    removeItem: (state, action: PayloadAction<{ cartItemId: string }>) => {
      state.items = state.items.filter((item) => item.cartItemId !== action.payload.cartItemId)
      Object.assign(state, calculateTotals(state.items))
    },

    // Open/Close cart popup
    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isCartOpen = action.payload
    }
  }
})

// Selector to get cart status
export const selectCartState = (state: RootState) => state.cart

// Export Actions and Reducer
export const { addItem, updateQuantity, removeItem, setCartOpen, hydrateCart } = cartSlice.actions
export default cartSlice.reducer
