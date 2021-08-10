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

import {
  authApi,
  baseUrl,
  loadRefreshToken,
  loadToken,
  sectorsApi,
  tomService,
} from "@services";
import { authReducer } from "./auth";
import { sectorsReducer } from "./sectors";

declare global {
  interface Window {
    store: any;
  }
}

const appReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [sectorsApi.reducerPath]: sectorsApi.reducer,
  auth: authReducer,
  sectors: sectorsReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth"],
};

const rootReducer = (state: any, action: any) => {
  // if (
  //   action?.meta?.arg?.endpointName === "logout" &&
  //   action?.type === "authApi /executeMutation/fulfilled"
  // ) {
  //   state = {} as RootState;
  //   localStorage.clear();
  // }

  if (action.type === "auth/refresh_token") {
    const refresh = loadRefreshToken();

    tomService({
      baseUrl: `${baseUrl}/auth`,
    })({
      url: "/refresh-token/",
      method: "POST",
      body: {
        refresh,
      },
    });
  }

  // if (action.type === "auth/logout") {
  //   console.log("hello world");
  //   const refresh = loadRefreshToken();
  //   // state = {} as RootState;
  //   // localStorage.clear();
  //   if (refresh) {
  //     tomService({
  //       baseUrl: `${baseUrl}/logout/`,
  //     })({
  //       url: "/logout/",
  //       method: "POST",
  //       body: {
  //         refresh,
  //       },
  //     });
  //   }
  // }
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

window.store = store;

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
