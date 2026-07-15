import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PotionState } from "../types/potion.ts";

export const usePotionStore = create<PotionState>()(
  persist(
    (set, get) => ({
      potions: [],
      categoryFilter: "all",

      addPotion: (potion) =>
        set((state) => ({
          potions: [...state.potions, { ...potion, id: Date.now() }],
        })),

      removePotion: (id) =>
        set((state) => ({
          potions: state.potions.filter((p) => p.id !== id),
        })),

      setCategoryFilter: (category) => set({ categoryFilter: category }),

      getTotalValue: () =>
        get().potions.reduce((sum, p) => sum + p.value, 0),
    }),
    { name: "potion-ledger" },
  ),
);
