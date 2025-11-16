/**
 * SSR: Server render with items: [] (empty cart)
 * Client: Immediately after mount, useCartHydration reads localStorage and dispatch hydrateCart
 * UI update: Component re-render with data from localStorage
 * This way ensures no hydration errors because the initial render is always the same between server and client!
 */

'use client'

import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore } from '@/redux/store'
import { useCartHydration } from '@/hooks/useCartHydration'

function CartHydration() {
  useCartHydration()
  return null
}

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  // Use useRef to ensure the store is only initialized once on the client
  const storeRef = useRef<ReturnType<typeof makeStore> | null>(null)

  if (!storeRef.current) {
    // Create store when component is first rendered (on Client)
    storeRef.current = makeStore()
  }

  return (
    <Provider store={storeRef.current}>
      <CartHydration />
      {children}
    </Provider>
  )
}
