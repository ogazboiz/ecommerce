import { configureStore } from '@reduxjs/toolkit'
// import  from '../features/counter/counterSlice'
import userReducer from "./userSlice"
export const store = configureStore({
  reducer: {
    user : userReducer,
  },
})