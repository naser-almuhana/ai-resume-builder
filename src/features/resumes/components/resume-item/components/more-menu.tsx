import { useState, useTransition } from "react"

import { MoreVerticalIcon, PrinterIcon, Trash2Icon } from "lucide-react"
import { toast } from "sonner"

import { AppResponsiveModal } from "@/components/shared/app-responsive-modal"
import { LoadingButton } from "@/components/shared/loading-button"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ResponsiveModalFooter } from "@/components/ui/responsive-modal"

import { deleteResume } from "@/features/resumes/actions/delete-resume.action"
import {
  DELETE_RESUME_MODAL_DESCRIPTION,
  DELETE_RESUME_MODAL_TITLE,
} from "@/features/resumes/constants"

interface MoreMenuProps {
  resumeId: string
  onPrintClick: () => void
}

export function MoreMenu({ resumeId, onPrintClick }: MoreMenuProps) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const closeDeleteConfirmation = () => setShowDeleteConfirmation(false)

  const [isPending, startTransition] = useTransition()

  async function handleDelete() {
    startTransition(async () => {
      try {
        await deleteResume(resumeId)
        toast.success("Resume deleted successfully.")
        closeDeleteConfirmation()
      } catch (error) {
        console.error(error)
        toast.error("Something went wrong. Please try again.")
      }
    })
  }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-0.5 right-0.5 opacity-100 transition-opacity group-hover:opacity-100 md:opacity-0"
          >
            <MoreVerticalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={() => setShowDeleteConfirmation(true)}
          >
            <Trash2Icon className="size-4" />
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={onPrintClick}
          >
            <PrinterIcon className="size-4" />
            Print
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AppResponsiveModal
        open={showDeleteConfirmation}
        onOpenChange={setShowDeleteConfirmation}
        title={DELETE_RESUME_MODAL_TITLE}
        description={DELETE_RESUME_MODAL_DESCRIPTION}
      >
        <ResponsiveModalFooter>
          <LoadingButton
            variant="destructive"
            onClick={handleDelete}
            loading={isPending}
          >
            Delete
          </LoadingButton>
          <Button variant="secondary" onClick={closeDeleteConfirmation}>
            Cancel
          </Button>
        </ResponsiveModalFooter>
      </AppResponsiveModal>
    </>
  )
}
