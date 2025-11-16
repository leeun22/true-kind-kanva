'use client'

import MinusIcon from '@/assets/minus-icon'
import PlusIcon from '@/assets/plus-icon'
import { productInfoAccordion } from '@/constants/initialProductInfo'
import React, { useState, useCallback, memo, useRef, useEffect } from 'react'

const AccordionItem = memo(
  ({
    title,
    children,
    isOpen,
    onToggle
  }: {
    title: string
    children: React.ReactNode
    isOpen: boolean
    onToggle: () => void
  }) => {
    const contentRef = useRef<HTMLDivElement>(null)
    const [height, setHeight] = useState<number>(0)

    useEffect(() => {
      // ResizeObserver - Monitors content resizing to update the correct height
      if (contentRef.current) {
        const resizeObserver = new ResizeObserver(() => {
          if (contentRef.current) {
            setHeight(contentRef.current.scrollHeight)
          }
        })

        resizeObserver.observe(contentRef.current)
        setHeight(contentRef.current.scrollHeight)

        // Cleanup ResizeObserver - Ensures disconnect when component unmounts
        return () => resizeObserver.disconnect()
      }
    }, [children, isOpen])

    return (
      <button
        className="product-detail__info-accordion-item group flex flex-col items-start justify-start gap-[0] w-full h-min lg:p-[26px_24px_24px] p-[20px_20px] bg-white hover:bg-gray-50 rounded-[14px] cursor-pointer shadow-xs"
        type="button"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <div className="product-detail__info-accordion-item-button w-full flex flex-row items-center justify-between gap-[16px] cursor-pointer transition-colors duration-200">
          <span className="font-figtree text-[1.3rem] text-[#3b3b3b]">{title}</span>

          <div
            className={`transform transition-transform duration-300 group-hover:rotate-180 ${isOpen ? '!rotate-360' : 'rotate-0'}`}
          >
            {isOpen ? (
              <MinusIcon className="w-[14px] h-[14px] text-[#787878] aspect-square" />
            ) : (
              <PlusIcon className="w-[14px] h-[14px] text-[#787878] aspect-square" />
            )}
          </div>
        </div>

        <div
          className="product-detail__info-accordion-item-content w-full text-start h-min overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            height: isOpen ? `${height}px` : '0px'
          }}
        >
          <div
            ref={contentRef}
            className="pt-[12px] font-figtree text-[1.3rem] text-[#787878]"
            style={{
              opacity: isOpen ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out'
            }}
          >
            {children}
          </div>
        </div>
      </button>
    )
  }
)
AccordionItem.displayName = 'AccordionItem'

export default function ProductInfoAccordion() {
  /**With this Array logic, when clicking on a new item, it will be added to the list,
   * and the old item will remain open. It will only close when clicking on itself again.
   */
  const [openIndex, setOpenIndex] = useState<number[]>([])

  const handleToggle = useCallback((index: number) => {
    setOpenIndex((prevIndex) => {
      // Check if current index is already in array
      const isOpen = prevIndex.includes(index)

      if (isOpen) {
        // If it is open, close it (filter it out of the array)
        return prevIndex.filter((i) => i !== index)
      } else {
        // If not opened, open it (add it to the array)
        return [...prevIndex, index]
      }
    })
  }, [])

  // Create a memoized toggle function for each item
  const getToggleHandler = useCallback(
    (index: number) => () => {
      handleToggle(index)
    },
    [handleToggle]
  )

  return (
    <div className="product-detail__info-accordion w-full mt-[38px]">
      <div className="product-detail__info-accordion-wrapper flex flex-col items-start gap-[12px] w-full h-min">
        {productInfoAccordion.map((infoItem, index) => (
          <AccordionItem
            key={index}
            title={infoItem.title}
            isOpen={openIndex.includes(index)}
            onToggle={getToggleHandler(index)}
          >
            {infoItem.content}
          </AccordionItem>
        ))}
      </div>
    </div>
  )
}

/** If the new index matches the prevIndex (open), close it (null).
 * If the new index does not match the prevIndex,
 * open the new one (index), and close the old one.
 */
// const [openIndex, setOpenIndex] = useState<number | null>(null)
// const handleToggle = useCallback((index: number) => {
//   setOpenIndex((prevIndex) => (prevIndex === index ? null : index))
// }, [])
