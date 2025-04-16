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

import { generateWorkExperience } from "@/features/editor/actions/generate-work-experience.action"
import {
  GENERATE_WORK_EXPERIENCE_FORM_DESCRIPTION,
  GENERATE_WORK_EXPERIENCE_FORM_TITLE,
} from "@/features/editor/constants"
import {
  type GenerateWorkExperienceInput,
  generateWorkExperienceSchema,
} from "@/features/editor/schemas/generate-work-experience.schema"
import { WorkExperience } from "@/features/editor/schemas/work-experience.schema"

interface GenerateWorkExperienceButtonProps {
  onWorkExperienceGenerated: (workExperience: WorkExperience) => void
}

export function GenerateWorkExperienceButton({
  onWorkExperienceGenerated,
}: GenerateWorkExperienceButtonProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<GenerateWorkExperienceInput>({
    resolver: zodResolver(generateWorkExperienceSchema),
    defaultValues: {
      description: "",
    },
  })

  async function onSubmit(input: GenerateWorkExperienceInput) {
    try {
      const response = await generateWorkExperience(input)
      onWorkExperienceGenerated(response)
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
      title={GENERATE_WORK_EXPERIENCE_FORM_TITLE}
      description={GENERATE_WORK_EXPERIENCE_FORM_DESCRIPTION}
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
                    placeholder={`E.g. "from nov 2019 to dec 2020 I worked at google as a software engineer, my tasks were: ..."`}
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
