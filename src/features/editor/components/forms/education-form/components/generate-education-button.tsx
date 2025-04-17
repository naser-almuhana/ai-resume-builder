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
import { usePremiumModal } from "@/features/premium/hooks/use-premium-modal"
import { canUseAITools } from "@/features/premium/lib/permissions"

interface GenerateEducationButtonProps {
  onEducationGenerated: (education: Education) => void
}

export function GenerateEducationButton({
  onEducationGenerated,
}: GenerateEducationButtonProps) {
  const [openGenerateModal, setOpenGenerateModal] = useState(false)
  const [isPending, startTransition] = useTransition()

  const subscriptionLevel = useSubscriptionLevel()
  const premiumModal = usePremiumModal()

  const form = useForm<GenerateEducationInput>({
    resolver: zodResolver(generateEducationSchema),
    defaultValues: {
      description: "",
    },
  })

  function onSubmit(input: GenerateEducationInput) {
    startTransition(async () => {
      try {
        const response = await generateEducation(input)
        onEducationGenerated(response)
      } catch (error) {
        console.error(error)
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
        open={openGenerateModal}
        onOpenChange={setOpenGenerateModal}
        title={GENERATE_EDUCATION_FORM_TITLE}
        description={GENERATE_EDUCATION_FORM_DESCRIPTION}
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
            <LoadingButton type="submit" loading={isPending}>
              {isPending ? "Generating..." : "Generate (AI)"}
            </LoadingButton>
          </form>
        </Form>
      </AppResponsiveModal>
    </>
  )
}
