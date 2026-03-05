import { login } from "@/api/user.api";
import type { IUser } from "@/typeDef/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  user: IUser | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const { token, user } = await login({ email, password });
          set({ user, token });
        } finally {
          set({ isLoading: false });
        }
      },

      logout: () => {
        set({ user: null, token: null });
      },
    }),
    {
      name: "user-storage",
      partialize: (state) => ({ user: state.user, token: state.token }),
    },
  ),
);
