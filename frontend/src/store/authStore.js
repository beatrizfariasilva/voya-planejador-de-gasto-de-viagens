import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      usuario: null,
      token: null,
      hydrated: false,

      login: (usuario, token) =>
        set({ usuario, token }),

      setUsuario: (usuario) => 
        set({ usuario }),

      logout: () =>
        set({
          usuario: null,
          token: null,
        }),
    }),
    {
      name: "auth-storage",

      onRehydrateStorage: () => (state) => {
        state.hydrated = true;
      },
    }
  )
);