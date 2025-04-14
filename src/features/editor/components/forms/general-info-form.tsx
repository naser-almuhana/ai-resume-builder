import { useEffect, useRef } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { type ResumeFormProps } from "@/lib/types"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { FormWrapper } from "@/features/editor/components/forms/form-wrapper"
import {
  GENERAL_INFO_FORM_DESCRIPTION,
  GENERAL_INFO_FORM_TITLE,
} from "@/features/editor/constants"
import { useDebouncedForm } from "@/features/editor/hooks/use-debounced-form"
import {
  type GeneralInfoValues,
  generalInfoSchema,
} from "@/features/editor/schemas/general-info.schema"

export function GeneralInfoForm({
  resumeData,
  setResumeData,
}: ResumeFormProps) {
  const form = useForm<GeneralInfoValues>({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: {
      title: resumeData.title || "",
      description: resumeData.description || "",
    },
  })

  useDebouncedForm({
    form,
    onValueChange(values) {
      setResumeData({ ...resumeData, ...values })
    },
  })

  return (
    <FormWrapper
      title={GENERAL_INFO_FORM_TITLE}
      description={GENERAL_INFO_FORM_DESCRIPTION}
    >
      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="My cool resume" autoFocus />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="A resume for my next job" />
                </FormControl>
                <FormDescription>
                  Describe what this resume is for.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </FormWrapper>
  )
}
