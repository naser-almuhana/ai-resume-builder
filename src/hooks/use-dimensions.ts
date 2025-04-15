"use client"

import { RefObject, useEffect, useState } from "react"

type ReturnType = {
  width: number
  height: number
}

/**
 * Custom hook that tracks and returns the dimensions (width and height) of a DOM element
 * using a ResizeObserver. Updates automatically when the element's size changes.
 *
 * @param {RefObject<HTMLElement | null>} containerRef - React ref object pointing to the element to measure
 * @returns {ReturnType} An object containing the current width and height of the element
 * @property {number} width - The element's current width in pixels
 * @property {number} height - The element's current height in pixels
 *
 * @example
 * const containerRef = useRef(null);
 * const { width, height } = useDimensions(containerRef);
 *
 * return <div ref={containerRef}>...</div>;
 */
export function useDimensions(
  containerRef: RefObject<HTMLElement | null>,
): ReturnType {
  // State to store the current dimensions
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    // Store the current ref value to avoid issues in cleanup
    const currentRef = containerRef.current

    /**
     * Gets the current dimensions of the referenced element
     * @returns {ReturnType} Object with width and height properties
     */
    const getDimensions = (): ReturnType => {
      return {
        width: currentRef?.offsetWidth || 0, // Fallback to 0 if element doesn't exist
        height: currentRef?.offsetHeight || 0, // Fallback to 0 if element doesn't exist
      }
    }

    // Create a ResizeObserver to detect changes in element size
    const resizeObserver = new ResizeObserver((entries) => {
      // Only care about the first entry (our observed element)
      const entry = entries[0]
      if (entry) {
        setDimensions(getDimensions())
      }
    })

    // If the ref is pointing to an actual element
    if (currentRef) {
      // Start observing the element for size changes
      resizeObserver.observe(currentRef)
      // Set initial dimensions
      setDimensions(getDimensions())
    }

    // Cleanup function - runs when component unmounts or ref changes
    return () => {
      if (currentRef) {
        // Stop observing this specific element
        resizeObserver.unobserve(currentRef)
      }
      // Disconnect the observer completely
      resizeObserver.disconnect()
    }
  }, [containerRef]) // Only re-run effect if the ref changes

  return dimensions
}
