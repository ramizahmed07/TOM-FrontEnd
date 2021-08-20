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
  businessUnitApi,
  gradeApi,
  sectorsApi,
  jobFunctionApi,
  subJobFunctionApi,
  subAdminApi,
  companiesApi,
} from "@services";
import { authReducer } from "./auth";
import { businessUnitReducer } from "./business-unit";
import { sectorsReducer } from "./sectors";
import { gradeReducer } from "./grade";
import { jobFunctionReducer } from "./job-function";
import { IAuthState } from "./auth/auth.types";
import { IJobFunctionReducer } from "./job-function/job.function.types";
import { ISubJobFunctionReducer } from "./sub-job-function/sub.job.function.types";
import { subJobFunctionReducer } from "./sub-job-function";
import { ISubAdminReducer } from "./sub-admin/sub.admin.types";
import { subAdminReducer } from "./sub-admin";
import { companiesReducer } from "./companies";
import { IBusinessUnitState } from "./business-unit";

export interface ICombineReducerProps {
  auth: IAuthState;
  businessUnit: IBusinessUnitState;
  jobFunction: IJobFunctionReducer;
  subJobFunction: ISubJobFunctionReducer;
  subAdmin: ISubAdminReducer;
}

const appReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [businessUnitApi.reducerPath]: businessUnitApi.reducer,
  [sectorsApi.reducerPath]: sectorsApi.reducer,
  [gradeApi.reducerPath]: gradeApi.reducer,
  [jobFunctionApi.reducerPath]: jobFunctionApi.reducer,
  [subJobFunctionApi.reducerPath]: subJobFunctionApi.reducer,
  [companiesApi.reducerPath]: companiesApi.reducer,
  [subAdminApi.reducerPath]: subAdminApi.reducer,
  auth: authReducer,
  businessUnit: businessUnitReducer,
  sectors: sectorsReducer,
  grade: gradeReducer,
  jobFunction: jobFunctionReducer,
  subJobFunction: subJobFunctionReducer,
  subAdmin: subAdminReducer,
  companies: companiesReducer,
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
    gradeApi.middleware,
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
