import { create } from "zustand";

interface premiumModalState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const usePremiumModal = create<premiumModalState>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
}));

export default usePremiumModal;
