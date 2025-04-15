import { useEffect } from "react"

/**
 * Custom hook to show a browser warning when users try to leave/refresh the page
 * while there are unsaved changes (or other specified condition is true).
 *
 * @param {boolean} [condition=true] - Whether to show the warning (typically based on unsaved changes)
 *
 * @example
 * // Basic usage when form has unsaved changes
 * useUnloadWarning(hasUnsavedChanges);
 *
 * @example
 * // Disable the warning
 * useUnloadWarning(false);
 */
export function useUnloadWarning(condition: boolean = true) {
  useEffect(() => {
    // Early return if warning shouldn't be active
    if (!condition) {
      return
    }

    /**
     * Event handler for beforeunload event
     * @param {BeforeUnloadEvent} event - The beforeunload event object
     */
    const listener = (event: BeforeUnloadEvent) => {
      // Prevent default browser behavior (page unload)
      event.preventDefault()
    }

    // Add the event listener when the component mounts or condition becomes true
    window.addEventListener("beforeunload", listener)

    // Cleanup function - removes the event listener when:
    // 1. Component unmounts
    // 2. Condition becomes false
    return () => {
      window.removeEventListener("beforeunload", listener)
    }
  }, [condition]) // Re-run effect only when condition changes
}
