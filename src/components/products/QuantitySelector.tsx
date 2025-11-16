'use client'

import MinusIcon from '@/assets/minus-icon'
import PlusIcon from '@/assets/plus-icon'
import React, { useCallback } from 'react'
import styles from './product.module.css'
import clsx from 'clsx'

interface QuantitySelectorProps {
  isVariantSelected: boolean
  currentQuantity: number
  onQuantityChange: (quantity: number) => void
  min?: number
  max?: number
}

const QuantitySelector = ({
  isVariantSelected,
  currentQuantity,
  onQuantityChange,
  min = 1,
  max = 999
}: QuantitySelectorProps) => {
  // Quantity increment/decrement handler
  const handleQuantityChange = useCallback(
    (delta: number) => {
      const newQuantity = currentQuantity + delta

      if (newQuantity >= min && newQuantity <= max) {
        // Call callback to parent component to update state
        onQuantityChange(newQuantity)
      }
    },
    [currentQuantity, min, max, onQuantityChange]
  )

  // Handler when entering directly
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value)
      if (!isNaN(value) && value >= min && value <= max) {
        onQuantityChange(value)
      } else if (e.target.value === '') {
        // Handle the case where the user deletes the number
        onQuantityChange(min)
      }
    },
    [min, max, onQuantityChange]
  )

  // Disable all inputs/buttons if no variant is selected
  const isDisabled = !isVariantSelected

  // Execute when variant is selected and quantity matches condition
  const isMinusButtonActive = !isDisabled && currentQuantity > min
  const isPlusButtonActive = !isDisabled && currentQuantity < max

  return (
    <div className="p-detail__detail-input flex gap-[12px] items-center justify-start my-[38px]">
      <label htmlFor="Quantity" className="font-figtree text-[1.3rem] font-[400] text-[#3b3b3b] leading-[1.2]">
        QTY
      </label>

      <div className="quantity-input flex flex-row items-center justify-center">
        <button
          className={clsx(
            'quantity-input-btn-minus flex items-center justify-center w-[23px] h-[23px] p-[6px] rounded-[62px] bg-[#dfdfdf] shadow-xs transition-all duration-150',
            {
              'cursor-not-allowed opacity-90': !isMinusButtonActive,
              'cursor-pointer hover:bg-[#d8d8d8]': isMinusButtonActive
            }
          )}
          type="button"
          aria-label="Decrease quantity"
          onClick={() => handleQuantityChange(-1)}
          disabled={isDisabled || currentQuantity <= min}
        >
          <MinusIcon
            className={clsx('quantity-input-btn-minus-icon', {
              'text-[#A0A0A0]': !isMinusButtonActive,
              'text-[#3C3C3C]': isMinusButtonActive
            })}
          />
        </button>

        <input
          id="Quantity"
          className={`${styles.quantityInputField} inline-block font-figtree text-[1.4rem] text-[#3b3b3b] cursor-text border-none m-0 p-0 text-center w-[38px] h-auto appearance-none`}
          style={{ appearance: 'textfield' }}
          type="number"
          name="quantity"
          min={min}
          max={max}
          value={currentQuantity}
          onChange={handleInputChange}
          disabled={isDisabled}
        />

        <button
          className={clsx(
            'quantity-input-btn-plus flex items-center justify-center w-[23px] h-[23px] p-[6px] rounded-[62px] bg-[#dfdfdf] shadow-xs transition-all duration-150',
            {
              'cursor-not-allowed opacity-90': !isPlusButtonActive,
              'cursor-pointer hover:bg-[#d8d8d8]': isPlusButtonActive
            }
          )}
          type="button"
          aria-label="Increase quantity"
          onClick={() => handleQuantityChange(1)}
          disabled={isDisabled || currentQuantity >= max}
        >
          <PlusIcon
            className={clsx('quantity-input-btn-plus-icon', {
              'text-[#A0A0A0]': !isPlusButtonActive,
              'text-[#3C3C3C]': isPlusButtonActive
            })}
          />
        </button>
      </div>
    </div>
  )
}

export default React.memo(QuantitySelector)
