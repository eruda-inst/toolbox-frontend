import { create } from "zustand";
import { PermOut } from "@/types/perm.type";
import { Perm } from "@/services/Perm";
import { useAuthenticationStore } from "@/stores/authentication.store";

interface PermStore {
  perms: PermOut[];
  isLoading: boolean;
  loaded: boolean;
  loadPromise: Promise<PermOut[]> | null;
  loadPerms: (force?: boolean) => Promise<PermOut[]>;
  clearPerms: () => void;
}

export const usePermStore = create<PermStore>((set, get) => ({
  perms: [],
  isLoading: false,
  loaded: false,
  loadPromise: null,

  loadPerms: async (force = false): Promise<PermOut[]> => {
    if (get().loaded && !force) {
      return get().perms;
    }

    if (get().loadPromise) {
      return get().loadPromise!;
    }

    const promise = (async () => {
      set({ isLoading: true, loaded: false });

      try {
        let userId = useAuthenticationStore.getState().user?.id;
        if (!userId) {
          await useAuthenticationStore.getState().loadUser();
          userId = useAuthenticationStore.getState().user?.id;
        }

        if (!userId) {
          throw new Error("Usuário não autenticado");
        }

        const perms = await Perm.getByUserId(userId);
        set({
          perms: perms,
          loaded: true,
          isLoading: false,
          loadPromise: null,
        });
        return perms;
      } catch (error) {
        set({ isLoading: false, loaded: false, loadPromise: null });
        throw error;
      }
    })();

    set({ loadPromise: promise });
    return promise;
  },

  clearPerms: () => {
    set({
      perms: [],
      loaded: false,
      isLoading: false,
      loadPromise: null,
    });
  },
}));
