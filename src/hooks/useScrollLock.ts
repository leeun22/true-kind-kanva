/**
 * This hook takes a boolean (isOpen) to enable/disable scroll lock.
 * Since the component is high level,
 * this hook can be called before the browser resumes scroll
 * It is recommended to add wasLocked.current, When isLocked is false (on mount or reload), the else if (wasLocked.current) block will be false. No scroll restore logic runs,
 * Avoid interfering with the browser's scroll restore process.
 */

import { useEffect, useRef } from 'react'

export const useScrollLock = ({ isLocked }: { isLocked: boolean }) => {
  // Use useRef to save the scroll position before locking
  const scrollPosition = useRef(0)

  // Use useRef to save the original style of the body
  const originalBodyStyle = useRef({
    overflow: '',
    position: '',
    top: '',
    width: ''
  })

  // Use useRef to keep track of the previous lock state
  const wasLocked = useRef(false)

  useEffect(() => {
    const bodyStyle = document.body.style

    if (isLocked) {
      // Storage the original style only once
      originalBodyStyle.current = {
        overflow: bodyStyle.overflow,
        position: bodyStyle.position,
        top: bodyStyle.top,
        width: bodyStyle.width
      }

      // Save scroll position and lock
      scrollPosition.current = window.scrollY
      bodyStyle.overflow = 'hidden'
      bodyStyle.position = 'fixed'
      bodyStyle.top = `-${scrollPosition.current}px`
      bodyStyle.width = '100%'

      // Mark as locked
      wasLocked.current = true
    } else if (wasLocked.current) {
      // RECOVERY: Only run when isLocked changes from true to false
      bodyStyle.overflow = originalBodyStyle.current.overflow
      bodyStyle.position = originalBodyStyle.current.position
      bodyStyle.top = originalBodyStyle.current.top
      bodyStyle.width = originalBodyStyle.current.width

      // Restore scroll position
      window.scrollTo(0, scrollPosition.current)

      // Mark unlocked
      wasLocked.current = false
    }

    /** CLEANUP FUNCTION: Ensures style is restored if component is destroyed
     * Only restore if component is locked during cleanup
     * */
    return () => {
      if (isLocked) {
        bodyStyle.overflow = originalBodyStyle.current.overflow
        bodyStyle.position = originalBodyStyle.current.position
        bodyStyle.top = originalBodyStyle.current.top
        bodyStyle.width = originalBodyStyle.current.width
        window.scrollTo(0, scrollPosition.current)
      }
    }
  }, [isLocked]) // Dependency: Triggered when the lock state changes
}
