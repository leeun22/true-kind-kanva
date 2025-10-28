'use client'

import { Fragment, useCallback, useRef, useState } from 'react'
import { useProductFilters } from '@/hooks/useProductFilters'
import ChevronIcon from '@/assets/chevron-icon'
import Checkbox from '@/components/ui/Checkbox'
import Divider from '@/components/ui/Divider'
import { filters } from '@/constants/filters'

interface ProductFilterProps {
  refetchProducts: () => Promise<void>
  filters: typeof filters
}

export default function ProductFilter({ refetchProducts, filters }: ProductFilterProps) {
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
    <div className="col relative max-w-full w-[16%] basis-auto px-[calc(18px*.5)]">
      <div className="product__filters-sticky block sticky top-[90px] w-full max-w-[213px] h-fit pt-[12px]">
        <div className="filters-clear relative flex items-center justify-between mb-[12px] cursor-auto font-figtree text-[#a0a0a0] text-[1.25rem] font-[500] leading-[1.2] uppercase">
          <span className="accordion__title">Filters</span>

          {hasActiveFilters && (
            <button type="button" className="filters-clear__all underline" onClick={clearAllFilters}>
              Clear All
            </button>
          )}
        </div>

        <div className="product__filters-wrapper flex flex-col">
          {filters.map((filter, index) => {
            const isOpen = isCollapse === filter.id

            return (
              <Fragment key={filter.id}>
                <div className="accordion-toggle relative uppercase">
                  <div
                    className="accordion-toggle__title flex items-baseline justify-between py-[10px] select-none cursor-pointer"
                    onClick={() => handleToggleCollapse(filter.id)}
                  >
                    <p className="font-figtree text-[10px] leading-[1] text-[#a0a0a0]">{filter.name}</p>

                    <ChevronIcon
                      className="min-w-[10px] min-h-[10px]"
                      style={{
                        transform: isCollapse === filter.id ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'transform .5s cubic-bezier(.18, .71, .11, 1)'
                      }}
                    />
                  </div>

                  <div
                    ref={(el) => {
                      contentRef.current[filter.id] = el
                    }}
                    className="accordion-toggle__content text-[#000] overflow-hidden"
                    style={{
                      maxHeight: getHeight(filter.id, isOpen),
                      opacity: isCollapse === filter.id ? '1' : '0',
                      visibility: isCollapse === filter.id ? 'visible' : 'hidden',
                      marginBottom: isCollapse === filter.id ? '10px' : '0px',
                      transition: 'max-height .5s cubic-bezier(.18, .71, .11, 1)',
                      willChange: 'max-height'
                    }}
                  >
                    <ul className="list-none">
                      {filter.options.map((option, index) => {
                        const isChecked = currentValues[filter.key as keyof typeof currentValues]?.includes(option)

                        return (
                          <li
                            key={index}
                            className="leading-[1] py-[6px] cursor-pointer flex items-center justify-start gap-[10px]"
                          >
                            <Checkbox
                              id={`${filter.key}-${option}`}
                              checked={isChecked}
                              onChange={(e) => handleFilterChange(filter.key, option, e.target.checked)}
                            >
                              <span className="font-figtree text-[12px]">{option}</span>
                            </Checkbox>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>

                {index !== filters.length - 1 && <Divider />}
              </Fragment>
            )
          })}
        </div>
      </div>
    </div>
  )
}
