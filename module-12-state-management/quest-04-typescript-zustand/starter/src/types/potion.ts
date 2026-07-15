// TODO: Define a PotionCategory union type
// It should include at least: "healing", "buff", "damage", "utility"
//
// export type PotionCategory = ...

// TODO: Define a Potion interface with these fields:
// - id: number
// - name: string
// - value: number (gold value)
// - category: PotionCategory
//
// export interface Potion { ... }

// TODO: Define a PotionState interface that describes the full store shape.
// It should include:
//   State:
//   - potions: Potion[]
//   - categoryFilter: PotionCategory | "all"
//
//   Actions:
//   - addPotion: (potion: Omit<Potion, "id">) => void
//   - removePotion: (id: number) => void
//   - setCategoryFilter: (category: PotionCategory | "all") => void
//   - getTotalValue: () => number
//
// export interface PotionState { ... }
