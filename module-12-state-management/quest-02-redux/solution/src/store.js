import { configureStore } from '@reduxjs/toolkit'
import battleReducer from './battleSlice'

const store = configureStore({
  reducer: {
    battles: battleReducer
  }
})

export default store
