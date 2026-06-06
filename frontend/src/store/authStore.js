import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      usuario: null,
      token: null,
      isAuthenticated: false,

      login: (usuario, token) =>
        set({
          usuario,
          token,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          usuario: null,
          token: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage",
    }
  )
);