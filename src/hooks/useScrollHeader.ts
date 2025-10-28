'use client'

import { useState, useEffect, useCallback } from 'react'

interface ScrollHeaderState {
  isScrolled: boolean
  isHidden: boolean
  scrollY: number
  scrollDirection: 'up' | 'down' | 'none'
}

export const useScrollHeader = () => {
  const [state, setState] = useState<ScrollHeaderState>({
    isScrolled: false,
    isHidden: false,
    scrollY: 0,
    scrollDirection: 'none'
  })

  const handleScroll = useCallback(() => {
    // Current scroll position
    const currentScrollY = window.scrollY

    setState((prevState) => {
      //Calculate scroll direction with prevState will save the scroll position of the previous time
      const scrollDiff = currentScrollY - prevState.scrollY
      let scrollDirection: 'up' | 'down' | 'none' = 'none'

      // Always use absolute value to compare with 5 and only consider it as "real scroll" when moving > 5px to avoid the jumping effect when scrolling lightly
      if (Math.abs(scrollDiff) > 5) {
        scrollDirection = scrollDiff > 0 ? 'down' : 'up'
      }

      // Logic for the states
      const newIsScrolled = currentScrollY >= 400

      // Logic to hide/show menu improved
      let newIsHidden = false
      if (currentScrollY >= 500 && scrollDirection === 'down') {
        newIsHidden = true
      } else if (scrollDirection === 'up' || currentScrollY < 500) {
        newIsHidden = false
      } else {
        newIsHidden = prevState.isHidden
      }

      // Only update state when there is a real change. Do not re-render if there is no significant change.
      if (
        prevState.isScrolled === newIsScrolled &&
        prevState.isHidden === newIsHidden &&
        prevState.scrollDirection === scrollDirection &&
        Math.abs(prevState.scrollY - currentScrollY) < 5
      ) {
        return prevState
      }

      return {
        isScrolled: newIsScrolled,
        isHidden: newIsHidden,
        scrollY: currentScrollY,
        scrollDirection
      }
    })
  }, [])

  // Throttle scroll event to optimize performance
  const throttledHandleScroll = useCallback(() => {
    let ticking = false

    return () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }
  }, [handleScroll])

  useEffect(() => {
    const throttledScroll = throttledHandleScroll()

    // Passive listener to optimize performance
    window.addEventListener('scroll', throttledScroll, { passive: true })

    // Cleanup
    return () => {
      window.removeEventListener('scroll', throttledScroll)
    }
  }, [throttledHandleScroll])

  return state
}
