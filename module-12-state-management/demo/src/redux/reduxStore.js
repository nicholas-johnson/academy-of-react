import { configureStore } from "@reduxjs/toolkit";
import { spellReducer } from "./spellSlice";

export const store = configureStore({
  reducer: {
    spells: spellReducer,
  },
});
