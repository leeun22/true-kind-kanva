'use client'

import { createContext, useContext } from 'react'
import styles from './explore.module.css'

const ExploreStyleContext = createContext(styles)
export const useExploreStyles = () => useContext(ExploreStyleContext)

export function ExploreStyleProvider({ children }: { children: React.ReactNode }) {
  return <ExploreStyleContext.Provider value={styles}>{children}</ExploreStyleContext.Provider>
}
