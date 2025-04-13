import { useEffect, useRef } from "react"

import { FieldValues, UseFormReturn } from "react-hook-form"

import { EditorFormProps } from "../lib/types"

interface useDebouncedFormOptions<T extends FieldValues> {
  form: UseFormReturn<T>
  debounceDelay?: number
  onValueChange: (values: Partial<T>) => void
}

export function useDebouncedForm<T extends FieldValues>({
  form,
  onValueChange,
  debounceDelay = 300,
}: useDebouncedFormOptions<T>) {
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const subscription = form.watch((values) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }

      debounceRef.current = setTimeout(async () => {
        const isValid = await form.trigger()
        if (!isValid) return
        onValueChange(values)
      }, debounceDelay)
    })

    return () => {
      subscription.unsubscribe()
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [form, debounceDelay, onValueChange])
}
