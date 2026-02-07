import { createSlice } from "@reduxjs/toolkit";

const battleSlice = createSlice({
  name: "battles",
  initialState: {
    list: [],
    filter: "all",
  },
  reducers: {
    addBattle: (state, action) => {
      state.list.push({
        id: Date.now(),
        name: action.payload.name,
        status: "pending",
        combatants: [],
      });
    },

    updateStatus: (state, action) => {
      const battle = state.list.find((b) => b.id === action.payload.id);
      if (battle) {
        battle.status = action.payload.status;
      }
    },

    addCombatant: (state, action) => {
      const battle = state.list.find((b) => b.id === action.payload.battleId);
      if (battle) {
        battle.combatants.push(action.payload.combatant);
      }
    },

    removeBattle: (state, action) => {
      state.list = state.list.filter((b) => b.id !== action.payload);
    },

    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

// Export actions
export const {
  addBattle,
  updateStatus,
  addCombatant,
  removeBattle,
  setFilter,
} = battleSlice.actions;

// Selectors
export const selectAllBattles = (state) => state.battles.list;
export const selectFilter = (state) => state.battles.filter;

export const selectFilteredBattles = (state) => {
  const filter = state.battles.filter;
  const list = state.battles.list;
  if (filter === "all") return list;
  return list.filter((b) => b.status === filter);
};

export const selectBattleStats = (state) => {
  const list = state.battles.list;
  return {
    total: list.length,
    pending: list.filter((b) => b.status === "pending").length,
    active: list.filter((b) => b.status === "active").length,
    victories: list.filter((b) => b.status === "victory").length,
    defeats: list.filter((b) => b.status === "defeat").length,
  };
};

// Export reducer
export default battleSlice.reducer;
