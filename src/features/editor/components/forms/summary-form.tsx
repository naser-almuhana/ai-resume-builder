import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { ResumeFormProps } from "@/lib/types"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"

import { FormWrapper } from "@/features/editor/components/forms/form-wrapper"
import {
  SUMMARY_FORM_DESCRIPTION,
  SUMMARY_FORM_TITLE,
} from "@/features/editor/constants"
import { useDebouncedForm } from "@/features/editor/hooks/use-debounced-form"
import {
  SummaryValues,
  summarySchema,
} from "@/features/editor/schemas/summary.schema"

export function SummaryForm({ resumeData, setResumeData }: ResumeFormProps) {
  const form = useForm<SummaryValues>({
    resolver: zodResolver(summarySchema),
    defaultValues: {
      summary: resumeData.summary || "",
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
      title={SUMMARY_FORM_TITLE}
      description={SUMMARY_FORM_DESCRIPTION}
    >
      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Professional summary</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="A brief, engaging text about yourself"
                  />
                </FormControl>
                <FormMessage />
                {/* <GenerateSummaryButton
                  resumeData={resumeData}
                  onSummaryGenerated={(summary) =>
                    form.setValue("summary", summary)
                  }
                /> */}
              </FormItem>
            )}
          />
        </form>
      </Form>
    </FormWrapper>
  )
}
