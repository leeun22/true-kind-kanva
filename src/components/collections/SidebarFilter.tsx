'use client'

import { useProductFilters } from '@/hooks/useProductFilters'
import { useCallback, useRef, useState } from 'react'
import SidebarFilterItem from './SidebarFilterItem'
import { filters } from '@/constants/filters'

interface SidebarFilterProps {
  refetchProducts: () => Promise<void>
}

export default function SidebarFilter({ refetchProducts }: SidebarFilterProps) {
  // Management Logic (nuqs URL state, handleFilterChange function, clearAllFilters, call refetchProducts)
  const { currentValues, handleFilterChange, clearAllFilters, hasActiveFilters } = useProductFilters(refetchProducts)

  const [isCollapse, setIsCollapse] = useState<number>(filters[0].id)
  const contentRef = useRef<Record<number, HTMLDivElement | null>>({})

  const handleToggleCollapse = useCallback((id: number) => {
    setIsCollapse((prev) => (prev === id ? -1 : id))
  }, [])

  const getHeight = (id: number, isOpen: boolean) => {
    const first = contentRef.current[filters[0].id] === null
    if (first) return '150px'

    const ref = contentRef.current[id]
    if (id === isCollapse) return `${contentRef.current[id]?.scrollHeight}px`
    return ref && isOpen ? `${ref.scrollHeight}px` : '0px'
  }

  return (
    <div className="product__filters-sticky block sm:sticky top-[90px] w-full h-fit pt-[12px]">
      <div className="filters-clear relative flex items-center justify-between mb-[12px] cursor-auto font-figtree text-[#a0a0a0] text-[1.25rem] font-[500] leading-[1.2] uppercase">
        <span className="accordion__title">Filters</span>

        {hasActiveFilters && (
          <button type="button" className="filters-clear__all underline cursor-pointer" onClick={clearAllFilters}>
            Clear All
          </button>
        )}
      </div>

      <div className="product__filters-wrapper flex flex-col">
        {filters.map((filter, index) => {
          return (
            <SidebarFilterItem
              key={filter.id}
              filter={filter}
              index={index}
              filtersLength={filters.length}
              isCollapse={isCollapse}
              selectedOptions={currentValues[filter.key as keyof typeof currentValues] || []}
              handleFilterChange={handleFilterChange}
              handleToggleCollapse={handleToggleCollapse}
              contentRef={contentRef}
              getHeight={getHeight}
            />
          )
        })}
      </div>
    </div>
  )
}
