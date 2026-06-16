import { create } from "zustand";

interface ResetPasswordStore {
  resetToken: string;
  setResetToken: (token: string) => void;
  clearResetToken: () => void;

  email: string;
  setEmail: (email: string) => void;
  clearEmail: () => void;
}

const useResetPasswordStore = create<ResetPasswordStore>()((set) => ({
  resetToken: "",
  setResetToken: (token: string) => set({ resetToken: token }),
  clearResetToken: () => set({ resetToken: "" }),

  email: "",
  setEmail: (email: string) => set({ email }),
  clearEmail: () => set({ email: "" }),
}));

export { useResetPasswordStore };
