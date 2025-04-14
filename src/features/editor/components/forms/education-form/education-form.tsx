import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"

import { ResumeFormProps } from "@/lib/types"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import { FormWrapper } from "@/features/editor/components/forms/form-wrapper"
import {
  EDUCATION_FORM_DESCRIPTION,
  EDUCATION_FORM_TITLE,
} from "@/features/editor/constants"
import { useDebouncedForm } from "@/features/editor/hooks/use-debounced-form"
import {
  EducationValues,
  educationSchema,
} from "@/features/editor/schemas/education.schema"

import { EducationItem } from "./components/education-item"

export function EducationForm({ resumeData, setResumeData }: ResumeFormProps) {
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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id)
      const newIndex = fields.findIndex((field) => field.id === over.id)
      move(oldIndex, newIndex)
      return arrayMove(fields, oldIndex, newIndex)
    }
  }

  return (
    <FormWrapper
      title={EDUCATION_FORM_TITLE}
      description={EDUCATION_FORM_DESCRIPTION}
    >
      <Form {...form}>
        <form className="space-y-3">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext
              items={fields}
              strategy={verticalListSortingStrategy}
            >
              {fields.map((field, index) => (
                <EducationItem
                  id={field.id}
                  key={field.id}
                  index={index}
                  form={form}
                  remove={remove}
                />
              ))}
            </SortableContext>
          </DndContext>
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
