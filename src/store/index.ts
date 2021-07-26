import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import { sectorsReducer } from "@store/slices";

export const store = configureStore({
  reducer: {
    sectors: sectorsReducer,
  },
  // middleware: [],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
