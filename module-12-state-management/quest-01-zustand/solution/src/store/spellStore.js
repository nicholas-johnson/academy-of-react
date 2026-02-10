import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSpellStore = create(
  persist(
    (set, get) => ({
      spells: [],

      addSpell: (spell) =>
        set((state) => ({
          spells: [...state.spells, { ...spell, id: Date.now() }],
        })),

      removeSpell: (id) =>
        set((state) => ({
          spells: state.spells.filter((s) => s.id !== id),
        })),

      clearAll: () => set({ spells: [] }),

      // Computed value using get()
      getTotalPower: () => get().spells.reduce((sum, s) => sum + s.power, 0),
    }),
    {
      name: "spell-inventory", // localStorage key
    },
  ),
);
