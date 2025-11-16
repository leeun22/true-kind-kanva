import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/products/cartSlice'

// Save state to localStorage
const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state.cart)
    localStorage.setItem('cartState', serializedState)
  } catch (err) {
    console.error('Could not save state to localStorage', err)
  }
}

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      cart: cartReducer
    }
  })

  // Subscribe to automatically save when state changes
  let currentCartState = store.getState().cart

  store.subscribe(() => {
    const newCartState = store.getState().cart

    // Save only when hydrated and state changed
    if (newCartState.isHydrated && currentCartState !== newCartState) {
      saveState(store.getState())
      currentCartState = newCartState
    }
  })

  return store
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
