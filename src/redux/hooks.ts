import { useDispatch, useSelector, useStore } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch, AppStore } from './store'

// Use TypedUseSelectorHook to let TypeScript know the RootState type
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// Cast useDispatch to ensure it always returns the typed AppDispatch
export const useAppDispatch: () => AppDispatch = useDispatch

// If you need to access the store instance
export const useAppStore: () => AppStore = useStore
