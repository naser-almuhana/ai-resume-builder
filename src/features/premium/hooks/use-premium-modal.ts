import { create } from "zustand"

interface PremiumModalState {
  open: boolean
  setOpen: (open: boolean) => void
}

export const usePremiumModal = create<PremiumModalState>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
}))
