import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Spell } from "../types/spell";

interface SpellSliceState {
  list: Spell[];
}

const initialState: SpellSliceState = {
  list: [
    { id: 1, name: "Fireball", power: 85, element: "fire" },
    { id: 2, name: "Ice Lance", power: 70, element: "ice" },
  ],
};

const spellSlice = createSlice({
  name: "spells",
  initialState,
  reducers: {
    addSpell: (state, action: PayloadAction<Omit<Spell, "id">>) => {
      state.list.push({ ...action.payload, id: Date.now() });
    },
    removeSpell: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((s) => s.id !== action.payload);
    },
  },
});

export const { addSpell, removeSpell } = spellSlice.actions;
export const spellReducer = spellSlice.reducer;

export const selectSpells = (state: { spells: SpellSliceState }) =>
  state.spells.list;
export const selectTotalPower = (state: { spells: SpellSliceState }) =>
  state.spells.list.reduce((sum, s) => sum + s.power, 0);
