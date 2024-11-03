import { configureStore } from '@reduxjs/toolkit'
import dukemaxReducer from './dukemaxSlice';
export const store = configureStore({
  reducer: {
    dukemaxData: dukemaxReducer
        },
})