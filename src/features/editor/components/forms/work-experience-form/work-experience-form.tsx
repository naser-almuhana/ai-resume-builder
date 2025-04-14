import {
  DndContext,
  type DragEndEvent,
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
  WORK_EXPERIENCE_FORM_DESCRIPTION,
  WORK_EXPERIENCE_FORM_TITLE,
} from "@/features/editor/constants"
import { useDebouncedForm } from "@/features/editor/hooks/use-debounced-form"
import {
  WorkExperienceValues,
  workExperienceSchema,
} from "@/features/editor/schemas/work-experience.schema"

import { WorkExperienceItem } from "./components/work-experience-item"

export function WorkExperienceForm({
  resumeData,
  setResumeData,
}: ResumeFormProps) {
  const form = useForm<WorkExperienceValues>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      workExperiences: resumeData.workExperiences || [],
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
    name: "workExperiences",
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
      title={WORK_EXPERIENCE_FORM_TITLE}
      description={WORK_EXPERIENCE_FORM_DESCRIPTION}
    >
      <Form {...form}>
        <form className="space-y-3">
          <DndContext
            sensors={sensors}
            onDragEnd={handleDragEnd}
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext
              items={fields}
              strategy={verticalListSortingStrategy}
            >
              {fields.map((field, index) => (
                <WorkExperienceItem
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
                  position: "",
                  company: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                })
              }
            >
              Add work experience
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  )
}
