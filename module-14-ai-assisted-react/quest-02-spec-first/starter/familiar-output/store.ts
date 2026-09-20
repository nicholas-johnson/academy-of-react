import { create } from "zustand";

type SpellStore = {
  filter: string;
  selectedId: string | null;
  setFilter: (filter: string) => void;
  select: (id: string) => void;
};

// The familiar reached for a global store because the training data likes stores.
export const useSpellStore = create<SpellStore>((set) => ({
  filter: "all",
  selectedId: null,
  setFilter: (filter) => set({ filter }),
  select: (id) => set({ selectedId: id }),
}));
