/**
 * The initial state of the application on the server is empty or default.
 * This hook ensures that after the client code is loaded and run (hydration),
 * the cart state saved from the user's previous session will be reloaded from localStorage and updated in the Redux store.
 */

'use client'

import { CartState, hydrateCart } from '@/redux/features/products/cartSlice'
import { useAppDispatch } from '@/redux/hooks'
import { useEffect } from 'react'

export const useCartHydration = () => {
  const dispatch = useAppDispatch()

  // useEffect only runs after the component has been mounted on the client.
  useEffect(() => {
    try {
      // Retrieves the JSON string in localStorage stored under the key 'cartState'.
      const serializedState = localStorage.getItem('cartState')

      // Check if there is cached data
      if (serializedState) {
        const savedState: CartState = JSON.parse(serializedState)

        // Dispatch the hydrateCart action to the Redux store, updating the cart state with the restored data.
        dispatch(hydrateCart(savedState))
      } else {
        // No data in localStorage -> undefined
        dispatch(hydrateCart(undefined))
      }
    } catch (err) {
      console.error('Could not load cart from localStorage', err)
      dispatch(hydrateCart(undefined))
    }
  }, [dispatch])
}
