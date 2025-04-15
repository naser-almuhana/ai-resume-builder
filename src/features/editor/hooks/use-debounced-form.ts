import { useEffect, useRef } from "react"

import { FieldValues, UseFormReturn } from "react-hook-form"

/**
 * Options for configuring the debounced form behavior
 * @template T - The shape of your form values (extends FieldValues)
 */
interface useDebouncedFormOptions<T extends FieldValues> {
  /** React Hook Form instance */
  form: UseFormReturn<T>
  /** Delay in milliseconds before triggering the change (default: 250ms) */
  debounceDelay?: number
  /** Callback invoked with the form values after debounce and validation */
  onValueChange: (values: Partial<T>) => void
}

/**
 * Custom hook that debounces form changes and triggers validation before calling the change handler
 * @template T - Type of your form values (must extend FieldValues)
 * @param {useDebouncedFormOptions<T>} options - Configuration options
 *
 * @example
 * useDebouncedForm({
 *   form, // your react-hook-form instance
 *   debounceDelay: 500, // optional
 *   onValueChange: (values) => {
 *     // Handle validated, debounced changes
 *     console.log('Form values changed:', values);
 *   }
 * });
 */
export function useDebouncedForm<T extends FieldValues>({
  form,
  onValueChange,
  debounceDelay = 250,
}: useDebouncedFormOptions<T>) {
  // Ref to store the timeout ID for cleanup
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Subscribe to form value changes
    const subscription = form.watch((values) => {
      // Clear any pending debounce timeout
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }

      // Set new timeout to handle the debounced change
      debounceRef.current = setTimeout(async () => {
        // Validate all fields before proceeding
        const isValid = await form.trigger()

        // Only proceed if validation passes
        if (!isValid) return

        // Invoke the change handler with current values
        onValueChange(values)
      }, debounceDelay)
    })

    // Cleanup function - runs when component unmounts or dependencies change
    return () => {
      // Unsubscribe from form value changes
      subscription.unsubscribe()

      // Clear any pending timeout
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [
    form, // React Hook Form instance
    debounceDelay, // Debounce timing
    onValueChange, // Change handler callback
  ])
}
