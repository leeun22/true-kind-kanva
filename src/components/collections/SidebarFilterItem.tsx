import React, { Fragment, RefObject } from 'react'
import ChevronIcon from '@/assets/chevron-icon'
import Checkbox from '@/components/ui/Checkbox'
import Divider from '@/components/ui/Divider'
import { FilterKey, FilterType } from '@/types/filter'

interface SidebarFilterItemProps {
  filter: FilterType
  index: number
  filtersLength: number
  isCollapse: number
  selectedOptions: string[]
  contentRef: RefObject<Record<number, HTMLDivElement | null>>
  handleFilterChange: (key: FilterKey, value: string, isChecked: boolean) => void
  handleToggleCollapse: (id: number) => void
  getHeight: (id: number, isOpen: boolean) => string
}

const SidebarFilterItem = ({
  filter,
  index,
  filtersLength,
  isCollapse,
  selectedOptions,
  contentRef,
  handleFilterChange,
  handleToggleCollapse,
  getHeight
}: SidebarFilterItemProps) => {
  const isOpen = isCollapse === filter.id

  return (
    <Fragment>
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
              const isChecked = selectedOptions.includes(option)

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

      {index !== filtersLength - 1 && <Divider />}
    </Fragment>
  )
}

export default React.memo(SidebarFilterItem)
