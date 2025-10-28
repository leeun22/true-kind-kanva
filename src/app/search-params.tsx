/**
 * Define URL parameters
 * Use parseAsString for array/string list
 */

import { createLoader, parseAsArrayOf, parseAsInteger, parseAsString } from 'nuqs/server'

export const coordinatesSearchParams = {
  categories: parseAsArrayOf(parseAsString).withDefault([]),
  ingredients: parseAsArrayOf(parseAsString).withDefault([]),
  types: parseAsArrayOf(parseAsString).withDefault([]),
  capacities: parseAsArrayOf(parseAsString).withDefault([]),
  limit: parseAsInteger.withDefault(100)
  //   search: parseAsString.withDefault(""),
  //   select: parseAsInteger.withDefault(1),
}

export const loadSearchParams = createLoader(coordinatesSearchParams)
