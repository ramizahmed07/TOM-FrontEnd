import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authApi, gradeApi, sectorsApi } from "@services";
import { authReducer } from "./auth";
import { sectorsReducer } from "./sectors";
import { gradeReducer } from "./grade";

const appReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [sectorsApi.reducerPath]: sectorsApi.reducer,
  [gradeApi.reducerPath]: gradeApi.reducer,
  auth: authReducer,
  sectors: sectorsReducer,
  grade: gradeReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth"],
};

const rootReducer = (state: any, action: any) => {
  if (
    action?.meta?.arg?.endpointName === "logout" &&
    action?.type === "authApi /executeMutation/fulfilled"
  ) {
    state = {} as RootState;
    localStorage.clear();
  }

  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    authApi.middleware,
    sectorsApi.middleware,
  ],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
