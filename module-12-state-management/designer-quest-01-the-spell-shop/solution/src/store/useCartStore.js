/* ⚙️ ENGINE CODE — you don't need to read this file (but Task 4 is in here!) */

import { create } from "zustand";

// 🎨 TASK 4 ✅ — Changed from 2000 to 1500 for a balanced feel
const FEEDBACK_DURATION_MS = 1500;

const useCartStore = create((set, get) => ({
  items: [],
  justAdded: null,

  addToCart: (spell) => {
    set((state) => {
      const existing = state.items.find((item) => item.id === spell.id);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === spell.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
          justAdded: spell.id,
        };
      }
      return {
        items: [...state.items, { ...spell, quantity: 1 }],
        justAdded: spell.id,
      };
    });

    setTimeout(() => {
      set({ justAdded: null });
    }, FEEDBACK_DURATION_MS);
  },

  removeFromCart: (spellId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== spellId),
    })),

  clearCart: () => set({ items: [], justAdded: null }),

  get totalItems() {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },
}));

export default useCartStore;
