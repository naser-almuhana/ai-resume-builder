import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { ResumeFormProps } from "@/lib/types"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"

import { FormWrapper } from "@/features/editor/components/forms/form-wrapper"
import {
  SKILLS_FORM_DESCRIPTION,
  SKILLS_FORM_TITLE,
} from "@/features/editor/constants"
import { useDebouncedForm } from "@/features/editor/hooks/use-debounced-form"
import {
  SkillsValues,
  skillsSchema,
} from "@/features/editor/schemas/skills.schema"

export function SkillsForm({ resumeData, setResumeData }: ResumeFormProps) {
  const form = useForm<SkillsValues>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      skills: resumeData.skills || [],
    },
  })

  useDebouncedForm({
    form,
    onValueChange(values) {
      setResumeData({
        ...resumeData,
        skills: values.skills
          ?.map((skill) => skill.trim())
          .filter((skill) => skill !== ""),
      })
    },
  })

  return (
    <FormWrapper
      title={SKILLS_FORM_TITLE}
      description={SKILLS_FORM_DESCRIPTION}
    >
      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Skills</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="e.g. React.js, Node.js, graphic design, ..."
                    onChange={(e) => {
                      const skills = e.target.value.split(",")
                      field.onChange(skills)
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Separate each skill with a comma.
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
