import { useState, useEffect } from 'react'

const MD_BREAKPOINT = 768

export const useIsTablet = () => {
  const [isTablet, setIsTablet] = useState(false)

  // Only run code that accesses 'window' after the component has mounted (Client Side)
  useEffect(() => {
    const handleResize = () => {
      // Logic to check screen < 768px
      setIsTablet(window.innerWidth <= MD_BREAKPOINT)
    }

    // Set initial value immediately when mount
    handleResize()

    // Listen for the resize event
    window.addEventListener('resize', handleResize)

    // Cleanup function
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Run only once when mounting and when unmounting

  return isTablet
}
