import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import { FormWrapper } from "@/features/editor/components/forms/form-wrapper"
import {
  EDUCATION_FORM_DESCRIPTION,
  EDUCATION_FORM_TITLE,
} from "@/features/editor/constants"
import { useDebouncedForm } from "@/features/editor/hooks/use-debounced-form"
import { EditorFormProps } from "@/features/editor/lib/types"
import {
  EducationValues,
  educationSchema,
} from "@/features/editor/schemas/education.schema"

import { EducationItem } from "./components/education-item"

export function EducationForm({ resumeData, setResumeData }: EditorFormProps) {
  const form = useForm<EducationValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      educations: resumeData.educations || [],
    },
  })

  useDebouncedForm({
    form,
    onValueChange(values) {
      setResumeData({ ...resumeData, ...values })
    },
  })

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "educations",
  })

  return (
    <FormWrapper
      title={EDUCATION_FORM_TITLE}
      description={EDUCATION_FORM_DESCRIPTION}
    >
      <Form {...form}>
        <form className="space-y-3">
          {fields.map((field, index) => (
            <EducationItem
              id={field.id}
              key={field.id}
              index={index}
              form={form}
              remove={remove}
            />
          ))}

          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() =>
                append({
                  degree: "",
                  school: "",
                  startDate: "",
                  endDate: "",
                })
              }
            >
              Add education
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  )
}
