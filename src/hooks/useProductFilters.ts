'use client'

/**
 * Use nuqs library (to interact with URLSearchParams and Browser API)
 * Custom hook to manage state filter in URL (nuqs) and side effects.
 * @param refetchProducts Server Action function to recall product data.
 * @returns Current values, filter change function, clear all function, and filter state.
 */

import { useQueryState, parseAsArrayOf, parseAsString } from 'nuqs'
import { useCallback, useMemo } from 'react'
import { FilterKey } from '@/types/filter'

interface UseProductFiltersResult {
  currentValues: Record<FilterKey, string[]>
  handleFilterChange: (key: FilterKey, value: string, isChecked: boolean) => void
  clearAllFilters: () => void
  hasActiveFilters: boolean
}

export function useProductFilters(refetchProducts: () => Promise<void>): UseProductFiltersResult {
  // Declare all Query States (nuqs)
  const [categories, setCategories] = useQueryState('categories', parseAsArrayOf(parseAsString).withDefault([]))
  const [types, setTypes] = useQueryState('types', parseAsArrayOf(parseAsString).withDefault([]))
  const [ingredients, setIngredients] = useQueryState('ingredients', parseAsArrayOf(parseAsString).withDefault([]))
  const [capacities, setCapacities] = useQueryState('capacities', parseAsArrayOf(parseAsString).withDefault([]))

  // Map setters and currentValues
  const setters = useMemo(
    () => ({
      categories: setCategories,
      types: setTypes,
      ingredients: setIngredients,
      capacities: setCapacities
    }),
    [setCategories, setTypes, setIngredients, setCapacities]
  )

  const currentValues = useMemo(
    () => ({
      categories,
      types,
      ingredients,
      capacities
    }),
    [categories, types, ingredients, capacities]
  )

  // Filter change handling function
  const handleFilterChange = useCallback(
    (key: FilterKey, value: string, isChecked: boolean) => {
      const setter = setters[key]
      const currentArray = currentValues[key]

      let newArray
      if (isChecked) {
        newArray = [...currentArray, value]
      } else {
        newArray = currentArray.filter((v) => v !== value)
      }

      // Update URL State
      setter(newArray)

      // Wait for the URL state to update before calling refetch
      setTimeout(() => {
        refetchProducts()
      }, 100)
    },
    [setters, currentValues, refetchProducts]
  )

  // Function to delete all filters
  const clearAllFilters = useCallback(async () => {
    // Reset all states nuqs to empty array
    const promises = Object.values(setters).map((setter) => setter([]))

    // Wait for all state URLs to be updated
    await Promise.all(promises)

    // Enable revalidation
    refetchProducts()
  }, [setters, refetchProducts])

  // Filter test status
  const hasActiveFilters = useMemo(() => {
    return categories.length > 0 || types.length > 0 || ingredients.length > 0 || capacities.length > 0
  }, [categories, types, ingredients, capacities])

  return {
    currentValues,
    handleFilterChange,
    clearAllFilters,
    hasActiveFilters
  }
}
