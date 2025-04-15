import { useEffect, useState } from "react"

/**
 * A simple debounce hook that delays updating the returned value
 * until after the specified delay has elapsed since the last update.
 *
 * @template T - The type of the value being debounced
 * @param {T} value - The value to debounce
 * @param {number} [delay=250] - The debounce delay in milliseconds
 * @returns {T} The debounced value
 *
 * @example
 * const [input, setInput] = useState('');
 * const debouncedInput = useDebounce(input, 300);
 *
 * useEffect(() => {
 *   // Will only execute 300ms after input stops changing
 *   console.log('Debounced value:', debouncedInput);
 * }, [debouncedInput]);
 */
export function useDebounce<T>(value: T, delay: number = 250): T {
  // State to hold the debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // Set a timeout to update the debounced value after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cleanup function - clears the timeout if the value or delay changes
    // before the timeout completes (or when component unmounts)
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay]) // Only re-run effect if value or delay changes

  return debouncedValue
}
