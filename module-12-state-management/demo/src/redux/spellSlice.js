import { createSlice } from "@reduxjs/toolkit";

const spellSlice = createSlice({
  name: "spells",
  initialState: {
    list: [
      { id: 1, name: "Fireball", power: 85, element: "fire" },
      { id: 2, name: "Ice Lance", power: 70, element: "ice" },
    ],
  },
  reducers: {
    addSpell: (state, action) => {
      state.list.push({ ...action.payload, id: Date.now() });
    },
    removeSpell: (state, action) => {
      state.list = state.list.filter((s) => s.id !== action.payload);
    },
  },
});

export const { addSpell, removeSpell } = spellSlice.actions;
export const spellReducer = spellSlice.reducer;

export const selectSpells = (state) => state.spells.list;
export const selectTotalPower = (state) =>
  state.spells.list.reduce((sum, s) => sum + s.power, 0);
