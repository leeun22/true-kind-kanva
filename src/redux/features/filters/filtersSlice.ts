import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FilterState } from '@/types/product'

const initialState: FilterState = {
  categories: [],
  types: [],
  ingredients: [],
  sizes: []
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
      return { ...state, ...action.payload }
    },
    clearFilters: () => initialState,
    toggleFilter: (
      state,
      action: PayloadAction<{
        type: keyof FilterState
        value: string
      }>
    ) => {
      const { type, value } = action.payload
      const index = state[type].indexOf(value)

      if (index === -1) {
        state[type].push(value)
      } else {
        state[type].splice(index, 1)
      }
    },
    setFiltersByType: (
      state,
      action: PayloadAction<{
        type: keyof FilterState
        values: string[]
      }>
    ) => {
      const { type, values } = action.payload
      state[type] = values
    }
  }
})

export const { setFilters, clearFilters, toggleFilter, setFiltersByType } = filtersSlice.actions

export default filtersSlice.reducer
