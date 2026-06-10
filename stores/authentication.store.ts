import { create } from "zustand";
import { UserOut } from "@/types/user.type";
import { Authentication } from "@/services/Authentication";

interface AuthenticationState {
  user: UserOut | null;
  isLoading: boolean;
  loadUser: () => Promise<void>;
  clearUser: () => void;
}

const useAuthenticationStore = create<AuthenticationState>((set) => ({
  user: null,
  isLoading: false,
  loadUser: async () => {
    set({ isLoading: true });
    try {
      const user = await Authentication.getCurrentUser();
      set({ user, isLoading: false });
    } catch {
      set({ user: null, isLoading: false });
    }
  },
  clearUser: () => set({ user: null }),
}));

export { useAuthenticationStore };
