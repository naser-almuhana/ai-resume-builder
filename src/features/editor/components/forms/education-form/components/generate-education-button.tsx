"use client"

import { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { WandSparklesIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { AppResponsiveModal } from "@/components/shared/app-responsive-modal"
import { LoadingButton } from "@/components/shared/loading-button"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"

import { generateEducation } from "@/features/editor/actions/generate-education.action"
import {
  GENERATE_EDUCATION_FORM_DESCRIPTION,
  GENERATE_EDUCATION_FORM_TITLE,
} from "@/features/editor/constants"
import { Education } from "@/features/editor/schemas/education.schema"
import {
  type GenerateEducationInput,
  generateEducationSchema,
} from "@/features/editor/schemas/generate-education.schema"

interface GenerateEducationButtonProps {
  onEducationGenerated: (education: Education) => void
}

export function GenerateEducationButton({
  onEducationGenerated,
}: GenerateEducationButtonProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<GenerateEducationInput>({
    resolver: zodResolver(generateEducationSchema),
    defaultValues: {
      description: "",
    },
  })

  async function onSubmit(input: GenerateEducationInput) {
    try {
      const response = await generateEducation(input)
      onEducationGenerated(response)
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setOpen(false)
    }
  }

  const Trigger = (
    <Button
      variant="outline"
      type="button"
      onClick={() => {
        // if (!canUseAITools(subscriptionLevel)) {
        //   premiumModal.setOpen(true)
        //   return
        // }
      }}
    >
      <WandSparklesIcon className="size-4" />
      Smart fill (AI)
    </Button>
  )
  return (
    <AppResponsiveModal
      open={open}
      onOpenChange={setOpen}
      title={GENERATE_EDUCATION_FORM_TITLE}
      description={GENERATE_EDUCATION_FORM_DESCRIPTION}
      trigger={Trigger}
      contentClassName="space-y-6"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder={`E.g., "Bachelor's in Computer Science from 2017 to 2021 at MIT. I specialized in ..."`}
                    className="placeholder:text-sm"
                    autoFocus
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton type="submit" loading={form.formState.isSubmitting}>
            Generate
          </LoadingButton>
        </form>
      </Form>
    </AppResponsiveModal>
  )
}
