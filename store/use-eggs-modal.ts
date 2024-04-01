import { create } from "zustand"

type EggsModalState = {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const useEggsModal = create<EggsModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))