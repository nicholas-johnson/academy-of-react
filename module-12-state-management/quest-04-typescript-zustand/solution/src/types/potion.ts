export type PotionCategory = "healing" | "buff" | "damage" | "utility";

export interface Potion {
  id: number;
  name: string;
  value: number;
  category: PotionCategory;
}

export interface PotionState {
  potions: Potion[];
  categoryFilter: PotionCategory | "all";

  addPotion: (potion: Omit<Potion, "id">) => void;
  removePotion: (id: number) => void;
  setCategoryFilter: (category: PotionCategory | "all") => void;
  getTotalValue: () => number;
}
