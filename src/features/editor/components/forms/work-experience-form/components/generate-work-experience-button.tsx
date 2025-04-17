"use client"

import { useState, useTransition } from "react"

import { useSubscriptionLevel } from "@/providers/subscription-level-provider"
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
import { usePremiumModal } from "@/features/premium/hooks/use-premium-modal"
import { canUseAITools } from "@/features/premium/lib/permissions"

interface GenerateWorkExperienceButtonProps {
  onWorkExperienceGenerated: (workExperience: WorkExperience) => void
}

export function GenerateWorkExperienceButton({
  onWorkExperienceGenerated,
}: GenerateWorkExperienceButtonProps) {
  const [OpenGenerateModal, setOpenGenerateModal] = useState(false)
  const [isPending, startTransition] = useTransition()

  const subscriptionLevel = useSubscriptionLevel()
  const premiumModal = usePremiumModal()

  const form = useForm<GenerateWorkExperienceInput>({
    resolver: zodResolver(generateWorkExperienceSchema),
    defaultValues: {
      description: "",
    },
  })

  function onSubmit(input: GenerateWorkExperienceInput) {
    startTransition(async () => {
      try {
        const response = await generateWorkExperience(input)
        onWorkExperienceGenerated(response)
      } catch (error) {
        console.error("GenerateWorkExperienceButton", error)
        toast.error("Something went wrong. Please try again.")
      } finally {
        setOpenGenerateModal(false)
      }
    })
  }

  // Handle open logic outside of the trigger
  const handleClick = () => {
    if (!canUseAITools(subscriptionLevel)) {
      premiumModal.setOpen(true)
    } else {
      setOpenGenerateModal(true)
    }
  }

  return (
    <>
      <Button variant="outline" type="button" onClick={handleClick}>
        <WandSparklesIcon className="size-4" />
        Smart fill (AI)
      </Button>
      <AppResponsiveModal
        open={OpenGenerateModal}
        onOpenChange={setOpenGenerateModal}
        title={GENERATE_WORK_EXPERIENCE_FORM_TITLE}
        description={GENERATE_WORK_EXPERIENCE_FORM_DESCRIPTION}
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
            <LoadingButton type="submit" loading={isPending}>
              {isPending ? "Generating..." : "Generate (AI)"}
            </LoadingButton>
          </form>
        </Form>
      </AppResponsiveModal>
    </>
  )
}
