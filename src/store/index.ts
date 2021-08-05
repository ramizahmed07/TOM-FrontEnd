import { authApi } from "@/services/auth";
import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
// import { sectorsReducer } from "@store/slices";

const appReducer = combineReducers({
  // sectors: sectorsReducer
  [authApi.reducerPath]: authApi.reducer,
  auth: authReducer,
});

const rootReducer = (state: any, action: any) => {
  if (
    action?.meta?.arg?.endpointName === "logout" &&
    action?.type === "authApi /executeMutation/fulfilled"
  ) {
    console.log("found it");
    state = {} as RootState;
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware),
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
