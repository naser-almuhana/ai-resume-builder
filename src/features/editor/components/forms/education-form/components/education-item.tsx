"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripHorizontalIcon } from "lucide-react"
import { UseFormReturn } from "react-hook-form"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { type EducationValues } from "@/features/editor/schemas/education.schema"

interface EducationItemProps {
  id: string
  form: UseFormReturn<EducationValues>
  index: number
  remove: (index: number) => void
}

export function EducationItem({ id, form, index, remove }: EducationItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  return (
    <div
      className={cn(
        "bg-background space-y-3 rounded-md border p-3",
        isDragging && "relative z-50 cursor-grabbing shadow-xl",
      )}
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        touchAction: "none",
      }}
    >
      <div className="flex justify-between gap-2">
        <span className="font-semibold">Education {index + 1}</span>
        <GripHorizontalIcon
          className={cn(
            "text-muted-foreground size-5 cursor-grab focus:outline-none",
            isDragging && "cursor-grabbing",
          )}
          {...attributes}
          {...listeners}
        />
      </div>

      <FormField
        control={form.control}
        name={`educations.${index}.degree`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Degree</FormLabel>
            <FormControl>
              <Input {...field} autoFocus />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`educations.${index}.school`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>School</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name={`educations.${index}.startDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start date</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  value={field.value?.slice(0, 10)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`educations.${index}.endDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>End date</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  value={field.value?.slice(0, 10)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <Button variant="destructive" type="button" onClick={() => remove(index)}>
        Remove
      </Button>
    </div>
  )
}
