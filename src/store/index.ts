import { Action, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";

import { sectorsReducer } from "@store/slices";

const rootReducer = combineReducers({
  sectors: sectorsReducer
})

export const store = configureStore({
  reducer: rootReducer
  // middleware: [],
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
