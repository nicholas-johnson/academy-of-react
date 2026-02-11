import { create } from "zustand";

export const useSpellStore = create((set, get) => ({
  spells: [
    { id: 1, name: "Fireball", power: 85, element: "fire" },
    { id: 2, name: "Ice Lance", power: 70, element: "ice" },
  ],

  addSpell: (spell) =>
    set((state) => ({
      spells: [...state.spells, { ...spell, id: Date.now() }],
    })),

  removeSpell: (id) =>
    set((state) => ({
      spells: state.spells.filter((s) => s.id !== id),
    })),

  getTotalPower: () => get().spells.reduce((sum, s) => sum + s.power, 0),
}));
