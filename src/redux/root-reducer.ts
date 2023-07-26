import { combineReducers } from "@reduxjs/toolkit"

import authSlice from "./features/auth/auth.slice"
import filterSlice from "./features/filter/filter.slice"
// import userSlice from "./features/user/user.slice"
import { apiSlice } from "./service/api.slice"

export const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authSlice,
  filter: filterSlice,
  // user: userSlice,
})
