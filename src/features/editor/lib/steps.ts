import { type ResumeFormProps } from "@/lib/types"

import { EducationForm } from "@/features/editor/components/forms/education-form"
import { GeneralInfoForm } from "@/features/editor/components/forms/general-info-form"
import { PersonalInfoForm } from "@/features/editor/components/forms/personal-info-form"
import { SkillsForm } from "@/features/editor/components/forms/skills-form"
import { SummaryForm } from "@/features/editor/components/forms/summary-form"
import { WorkExperienceForm } from "@/features/editor/components/forms/work-experience-form"

export const steps: {
  title: string
  component: React.ComponentType<ResumeFormProps>
  key: string
}[] = [
  { title: "General info", component: GeneralInfoForm, key: "general-info" },
  { title: "Personal info", component: PersonalInfoForm, key: "personal-info" },
  {
    title: "Work experience",
    component: WorkExperienceForm,
    key: "work-experience",
  },
  { title: "Education", component: EducationForm, key: "education" },
  { title: "Skills", component: SkillsForm, key: "skills" },
  {
    title: "Summary",
    component: SummaryForm,
    key: "summary",
  },
]
